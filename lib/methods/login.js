import crypto from 'lib/utils/crypto';
import Api from 'lib/api/api';
import actions from 'app/config/store/actions';
import {fetchDemoData} from './demo';
import {resolveDataPayload} from "lib/api/utils";

const DEVELOPMENT = process.env.DEVELOPMENT

const {
    LoginActions,
    GlobalActions,
} = actions;

export function loginSession(server, options) {
    return loginUser({server}, {...options, createSession: true})
}

export function loginUser(values, options) {
    const {login, password, server} = values;
    const createSession = (options && options.createSession);
    const ctx = options && options.ctx || undefined;
    const cookies = ctx && ctx.req ? ctx.req.headers.cookie : null

    // console.log(`LOGINUSER OPTIONS: ${cookies}`)

    return function (dispatch, getState) {

        const token = getState().app.auth.token;
        const secret = getState().app.auth.secret;
        const offset = getState().app.auth.tsoffset || 0;

        return new Promise((resolve, reject) => {

            function loginSequence(data) {
                dispatch(GlobalActions.RESET_DATA());
                dispatch(LoginActions.LOGOUT_USER(server));
                createSession ? dispatch(LoginActions.LOGIN_SESSION(data)) : dispatch(LoginActions.LOGIN_USER(data));
                resolve(data)
            }

            if (server === 'demo') {
                // this is a shortcut to simply write data directly into state
                setTimeout(() => {
                    if (login.toLowerCase() === 'demo' && password === 'demo') {
                        let data = fetchDemoData('login', values, {});
                        const client = crypto.createECDH('secp256k1');
                        client.generateKeys();
                        data.login = login.toLowerCase();
                        data.server = server;
                        data.secret = client.computeSecret(data.response, 'hex', 'hex');
                        loginSequence(data);
                    } else reject({message: 'Invalid credentials'})
                }, 1000);
            } else {
                let api = secret && !createSession ? new Api(secret, {
                    offset,
                    cookies,
                    ctx
                }) : new Api(null, {cookies, ctx});
                api.timeout = 30000;
                const client = crypto.createECDH('secp256k1');
                client.generateKeys();
                const challenge = client.getPublicKey('hex');

                const method = createSession ? api.session(server, challenge) : api.login(token, login.toLowerCase(), password, server, challenge);

                method.then((data) => {

                    if (data.response) {
                        data.secret = client.computeSecret(data.response, 'hex', 'hex');
                        if (DEVELOPMENT) {
                            console.warn(`PRIVATE   : ${client.getPrivateKey('hex')}`);
                            console.warn(`CHALLENGE : ${challenge}`);
                            console.warn(`RESPONSE  : ${data.response}`);
                            console.warn(`SECRET    : ${data.secret}`);
                        }

                        data = resolveDataPayload(data, data.secret)
                    }

                    if (!data.server) {
                        data.server = server;
                    }

                    loginSequence(data);

                }).catch(resp => {
                    console.error(`LOGIN FAILURE: ${JSON.stringify(resp)}`);
                    reject({message: resp.message || 'Invalid credentials', resp})
                });
            }
        });
    }
}

export function logoutUser() {
    return function (dispatch, getState) {
        const token = getState().app.auth.token;
        const secret = getState().app.auth.secret;
        const offset = getState().app.auth.tsoffset || 0;
        const server = getState().app.auth.server;

        function cleanup() {
            dispatch(LoginActions.LOGOUT_USER(server));
            dispatch(GlobalActions.RESET_DATA());
        }

        if (server === 'demo') {
            cleanup();
            return Promise.resolve();
        } else
            return new Promise((resolve, reject) => {
                const api = new Api(secret, {offset, timeout: 30000, secure: false});
                api.logout(token).then(() => {
                    cleanup();
                    dispatch(LoginActions.RESOLVE_LOGIN(true))
                    resolve();
                }).catch(err => {
                    console.error('API Logout Failed ' + err);
                    cleanup();
                    resolve();
                });
            })
    }
}

export function refreshUser() {
    return function (dispatch, getState) {
        const token = getState().app.auth.token;
        const secret = getState().app.auth.secret;
        const offset = getState().app.auth.tsoffset || 0;
        const server = getState().app.auth.server;

        return new Promise((resolve, reject) => {
            if (server === 'demo') {
                // this is a shortcut to simply write data directly into state
                setTimeout(() => {
                    resolve();
                }, 1000);
            } else {
                const api = new Api(secret, {offset, timeout: 30000});
                const client = crypto.createECDH('secp256k1');
                client.generateKeys();
                const challenge = client.getPublicKey('hex');

                api.refresh(token, challenge).then((data) => {
                    // console.log(`GOT REFRESH DATA: ${JSON.stringify(data, null, 4)}`);

                    if (data.response) {
                        data.secret = client.computeSecret(data.response, 'hex', 'hex');
                        if (DEVELOPMENT) {
                            console.warn(`PRIVATE   : ${client.getPrivateKey('hex')}`);
                            console.warn(`CHALLENGE : ${challenge}`);
                            console.warn(`RESPONSE  : ${data.response}`);
                            console.warn(`SECRET    : ${data.secret}`);
                        }

                        data = resolveDataPayload(data, data.secret)

                    }

                    if (!data.server) {
                        data.server = server;
                    }

                    // this is a shortcut to simply write data directly into state
                    dispatch(LoginActions.REFRESH_USER(data));

                    // mark promise as a success, essentially the "login" worked
                    resolve();

                }).catch(resp => {
                    console.error(`REFRESH FAILURE: ${JSON.stringify(resp)}`);
                    if ((resp && resp.data && resp.data.error && resp.data.error.code === 401) || (resp && resp.status && resp.status === 401)) {
                        dispatch(logoutUser());
                    }
                    reject({message: 'Invalid refresh', resp});
                });
            }
        });
    }
}
