import axios from 'axios';

export function getFullVersion() {
    console.log(APPVERSION);
    return APPVERSION;
}

export function getLiveVersion() {
    const ts = _.now();

    let config = {
        baseURL: '/static/dist/js',
        url: '/version.json?' + ts,
        method: 'get',
        headers: {'Content-type': 'application/json'}
    };

    return new Promise((resolve, reject) => {
        axios(config).then((resp) => {
            if (resp && resp.data && resp.data.version) {
                resolve(resp.data.version);
            } else
                reject();
        }).catch(resp => {
            reject();
        });
    })
}