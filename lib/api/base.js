import axios from 'axios';
import {Path} from 'path-parser';
import crypto from 'lib/utils/crypto'
import Payload from "./payload";
import _ from 'lib/utils/lodash'
import {isServer} from "lib/utils/server";

const port = process.env.PORT ? parseInt(process.env.PORT) : "4000";

axios.defaults.withCredentials = true

export default class BaseApi {
    constructor(secret, options = {}) {
        console.log(`BASEAPI`, secret, options)
        const host = !isServer() && window && window.location && window.location.host ? window.location.host : '';
        this.base = options.host || isServer() || (host === 'localhost:3000' ? `http://localhost:${port}/api/v1` : "/api/v1");
        this.secret = secret;
        this.offset = options.offset || 0;
        this.cookies = options.cookies || null;
        this.ctx = options.ctx; // nextjs server side context
        this.secure = options.secure !== false;
        this.timeout = options.timeout || 10000;
        this.callbacks = options.callbacks || {};
        this.last = {};
        this.helper = this.helper.bind(this);
        this.handleError = this.handleError.bind(this);
        this.getHeader = this.getHeader.bind(this);
        this.sign = this.sign.bind(this);
        this.hash = this.hash.bind(this);
        this.request = this.request.bind(this);
        this.requestData = this.requestData.bind(this);
        this.GET = this.GET.bind(this);
        this.POST = this.POST.bind(this);
        this.PUT = this.PUT.bind(this);
        this.DELETE = this.DELETE.bind(this);
        this.DOWNLOAD = this.DOWNLOAD.bind(this);
        this.UPLOAD = this.UPLOAD.bind(this);
        this.logError = options.onError || console.error.bind(console);
    }

    resolvePath(url, ids = {}) {
        const p = new Path(url);
        let path = _.includes(url, ":") ? p.build(ids, {ignoreConstraints: true}) : url;
        if (process.env.DEVELOPMENT) {
            if (_.includes(path, ":")) {
                throw new Error(`Path ${url} could not be resolved: ${path}`);
            }
        }
        // console.debug(path);
        return path;
    }

    hash(string) {
        const hash = crypto.createHash('sha256');
        hash.update(string);
        return hash.digest('hex');
    }

    sign(config) {
        const {method, params, url} = config;
        const nonce = _.random(1, 1000000000);
        const ts = _.now() + this.offset;
        const auth_hash = this.hash(config.headers['Authorization'] || '');
        const signature = `${auth_hash}|${method.toLowerCase()}|${encodeURIComponent(url.toLowerCase())}|${ts.toString()}|${nonce.toString()}`;
        const secret = this.secret || this.hash(signature);
        // console.warn(`SIGNATURE  : ${signature}`);
        // console.warn(`SECRET USED: ${secret}`);
        const hmac = crypto.createHmac('sha256', secret);
        hmac.update(signature);
        const sig = hmac.digest('base64');
        // console.warn(`HMAC SIG   : ${sig}`);
        config.params = {...params, n: nonce, ts: ts, sig: sig};
        config.timeout = this.timeout;

        if (this.cookies) {
            config.headers["Cookie"] = this.cookies
        }

        return config;
    };

    handleError(error) {
        let response = error.response;
        this.last.resp = response || error;

        this.logError(`API REQUEST caught a failure: ` + error);

        if (response) {
            let copyResp = _.cloneDeep(response);
            _.unset(copyResp, 'request');

            if (_.includes([404, 500], response.status)) {
                _.unset(copyResp, 'data');
            }

            if (process.env.DEVELOPMENT) {
                this.logError(`Failed Request, Rejecting on ${JSON.stringify(copyResp)}`);
            }

            return copyResp;
        } else {
            if (error.code === "ECONNABORTED") {
                this.last.resp.timeout = true;
            }
            return error;
        }
    }

    getHeader(header, key) {
        return header[key] || header[_.lowerCase(key)] || header[_.upperCase(key)];
    }

    request(config) {
        const self = this;
        return new Promise((resolve, reject) => {

            try {

                const signed_config = this.sign(config);

                // alter outbound payload...
                if (this.secret && this.secure && config.data && !isServer()) {
                    const content_type = config.headers['Content-type'];
                    config.headers['X-Payload'] = 'secure';
                    config.data = {
                        "_content_type_": content_type,
                        "_payload_": Payload.encryptJSON(config.data, this.secret)
                    }
                }

                if (process.env.DEVELOPMENT) {
                    // console.debug(`${JSON.stringify(signed_config, null, 4)}`);
                }

                self.last.config = signed_config;

                axios(signed_config).then((resp) => {
                    self.last.resp = resp;

                    _.unset(self.last.resp, 'request');

                    let copyResp = _.cloneDeep(resp);
                    _.unset(copyResp, 'data.data');

                    if (process.env.DEBUG) {
                        // console.debug(copyResp.request);
                    }

                    _.unset(copyResp, 'request');

                    // alter inbound payload...
                    if (resp && resp.data && this.secret && this.getHeader(resp.headers, 'x-payload') === 'secure'
                        && this.getHeader(resp.headers, 'content-type') === 'application/json'
                        && resp.data["_payload_"]) {
                        if (resp.data["_content_type_"]) {
                            resp.headers["content-type"] = resp.data["_content_type_"]
                        }
                        resp.data = Payload.decryptJSON(resp.data["_payload_"], this.secret)
                    }

                    // console.log(`RESPONSE HEADERS: ${JSON.stringify(resp.headers)}`)

                    const cookies = this.getHeader(resp.headers, "set-cookie")

                    // console.log(`RESPONSE COOKIES: ${JSON.stringify(cookies)}`)

                    if (cookies && cookies.length && this.ctx && this.ctx.res) {
                        this.ctx.res.setHeader("set-cookie", cookies)
                    }

                    if (resp && resp.data && resp.data.success) {
                        if (process.env.DEVELOPMENT) {
                            console.debug(`API REQUEST returned with a response\n${JSON.stringify(copyResp, null, 4)}`);
                            if (_.isArray(resp.data.data) && resp.data.data.length) {
                                console.debug(`QUERY RESULT: ${resp.data.data.length} COUNT OF \n${JSON.stringify(resp.data.data[0], null, 4)}\n`);
                            } else {
                                console.debug(`QUERY RESULT\n${JSON.stringify(resp.data.data, null, 4)}\n`);
                            }

                            if (resp.data.error && resp.data.error.code === 999) {
                                console.warn(`RESPONSE WARNING: ${resp.data.error.message}`);
                            }
                        }

                        if (signed_config.method === 'put' && !_.size(resp.data.data)) {
                            resolve(signed_config.data)
                        } else {
                            console.debug(`RESOLVING with ${JSON.stringify(resp.data.data)}`);
                            resolve(resp.data.data);
                        }
                        return;
                    }

                    if (process.env.DEVELOPMENT) {
                        self.logError(`Failed Response, Rejecting on ${JSON.stringify(copyResp)}`);
                    }

                    reject(copyResp);

                }).catch((error) => {
                    reject(self.handleError(error));
                })
            } catch (err) {
                self.logError('Exception within request: ' + err);
                throw err;
            }
        })
    }

    requestData(config) {
        const self = this;

        return new Promise((resolve, reject) => {

            const signed_config = this.sign(config);

            self.last.config = signed_config;

            if (process.env.DEVELOPMENT) {
                console.debug(`${JSON.stringify(signed_config, null, 4)}`);
            }

            axios(signed_config).then((resp) => {
                self.last.resp = resp;

                _.unset(self.last.resp, 'request');

                let copyResp = _.cloneDeep(resp);
                _.unset(copyResp, 'data.data');

                if (DEBUG) {
                    console.debug(copyResp.request);
                }

                _.unset(copyResp, 'request');

                if (resp && resp.data) {
                    resolve(resp.data);
                    return;
                }

                if (process.env.DEVELOPMENT) {
                    self.logError(`Failed Response, Rejecting on ${JSON.stringify(copyResp)}`);
                }

                reject(copyResp);

            }).catch((error) => {
                reject(self.handleError(error));
            })
        })
    }

    GET(token, url, params, ids = {}) {
        let config = {
            baseURL: this.base,
            url,
            method: 'get',
            headers: {'Content-type': 'application/json'},
            params
        };

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return this.request(config);
    }

    DOWNLOAD(token, url, values = {}, ids = {}) {
        let filename = values.filename || 'sample.pdf';
        let content = values.contentType || 'application/octet-stream';
        let config = {
            baseURL: this.base,
            url,
            method: 'get',
            headers: {'Content-type': content},
            responseType: 'blob' //'arraybuffer'
        };

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return this.requestData(config);
    }

    UPLOAD(token, url, values = {}, ids = {}) {
        const keys = _.keys(values);
        if (!_.includes(keys, 'files')) {
            console.error('Missing files data on UPLOAD request');
            return Promise.reject({message: 'Missing files data on UPLOAD request'});
        }

        // create custom form..
        var data = new FormData();
        var other_data = {};
        const has_files_attached = _.has(values, "files") && _.isArray(values["files"]);
        keys.forEach(name => {
            if (name === 'files') {
                let files = values[name];
                if (_.isArray(files)) {
                    files.forEach((file, n) => {
                        data.append(`files[]`, file);
                    })
                }
            } else
                other_data[name] = values[name];
        });

        data.append('data', JSON.stringify(other_data));

        let config = {
            baseURL: this.base,
            url,
            method: 'post',
            headers: {'Content-type': 'multipart/form-data'},
            data
        };

        if (this.callbacks.progress && has_files_attached) {
            config.onUploadProgress = this.callbacks.progress(url)
        }

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        if (this.callbacks.start && has_files_attached) {
            this.callbacks.start(url);
        }

        return this.request(config);
    }

    POST(token, url, data, ids = {}) {
        let config = {
            baseURL: this.base,
            url,
            method: 'post',
            headers: {'Content-type': 'application/json'},
            data
        };

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return this.request(config);
    }


    PUT(token, url, data, ids = {}) {
        let config = {
            baseURL: this.base,
            url,
            method: 'put',
            headers: {'Content-type': 'application/json'},
            data
        };

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return this.request(config);
    }

    DELETE(token, url, data, ids = {}) {
        let config = {
            baseURL: this.base,
            url,
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            data
        };

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return this.request(config);
    }

    helper(token, method, url, values, ids, extract) {
        let f = {
            'GET': this.GET,
            'PUT': this.PUT,
            'POST': this.POST,
            'DELETE': this.DELETE,
            'DOWNLOAD': this.DOWNLOAD,
            'UPLOAD': this.UPLOAD
        }[method];

        const resolvePath = this.resolvePath;

        console.debug(`INPUTS ${url}, ${JSON.stringify(values, null, 4)}, ${JSON.stringify(ids, null, 4)}`);

        if (token && !this.secret) console.error(`${method} firing for ${url} without token in header`);

        const self = this;
        return new Promise((success, failure) => {
            const path = resolvePath(url, ids);
            self.last.path = path;
            // console.warn(`INPUT: ${url}, PATH: ${path}`);
            f(token, path, values, ids).then(data => {
                let result = extract ? extract(data) : data;
                success(result);
            }).catch(resp => {
                // console.error(`HELPER FAILURE: ` + resp);
                failure(resp)
            });
        })
    }
}

