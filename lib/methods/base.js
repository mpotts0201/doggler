import Api from 'app/config/api/api';
import actions from 'app/config/store/actions';
import api_lookup from './lookup';
import {fetchDemoData} from './demo';
import {logoutUser} from "./login";

const {
    UXActions,
    CacheActions
} = actions;

export function callApiMethod(values, method, id_values, section, options = {}) {
    // this form is a thunked function
    // console.debug(`callApiMethod FIRED. SECTION is ${section}`);

    const api_config = api_lookup[section];
    const {requires, mapper, apifun, setLoaded} = api_config || {};
    const panelId = id_values ? id_values.panelId : null;

    return function (dispatch, getState) {
        // going to return a promise, so our upstream form handler can determine success or failure..
        const state = getState();
        const token = state.app.auth.token;
        const login = state.app.auth.login;
        const server = state.app.auth.server;
        const secret = state.app.auth.secret;
        const offset = state.app.auth.tsoffset || 0;

        // console.debug(`callApiMethod Preparing Promise`);

        // function uploadStart(url){
        //     console.debug('Upload Start');
        //     dispatch(UXActions.START_UPLOAD(url, panelId));
        // }

        // function uploadProgress(url) {
        //     return (event) => {
        //         console.debug('Upload Progress');
        //         dispatch(UXActions.UPDATE_UPLOAD(url, panelId, event.total, event.loaded));
        //     }
        // }


        return new Promise((resolve, reject) => {
            if (requires && _.includes(requires, 'record') && (!id_values || !id_values.recordId)) {
                reject({message: 'No record assigned.'});
                return;
            }

            function processDataResponse(data) {
                // confirm data situations here...
                let mapped_values = {};

                try {
                    mapped_values = mapper ? mapper(data) : data;
                } catch (err) {
                    console.error(`Failure in mapper: ${err} for ${section}`);
                    reject({message: `Internal api mapping error: ${err}`});
                    return;
                }

                // since this completed, at the very least we can update our state
                try {
                    dispatch(method(mapped_values, id_values));
                    if (section && setLoaded) {
                        dispatch(CacheActions.SET_LOADED(setLoaded));
                    }
                } catch (err) {
                    console.error(`Failure in dispatch: ${err} for ${section}`);
                    reject({message: `Internal api dispatch error: ${err}`});
                    return;
                } finally {
                    if (section) {
                        dispatch(UXActions.SET_SPINNER(section, false));
                    }
                }

                resolve(mapped_values);

            }

            console.debug(`COMING INTO REQUEST: ${section}\nVALUES: ${JSON.stringify(values, null, 4)}\nIDS: ${JSON.stringify(id_values, null, 4)}`);

            if (section && server !== 'demo') {

                dispatch(UXActions.SET_SPINNER(section, true));

                const section_timeouts = {};

                const timeout = server === 'mock' ? 10000 : (section_timeouts[section] || 130000);

                // const callbacks = panelId ? {
                //     start : uploadStart,
                //     progress: uploadProgress
                // } : {};

                //const api = new Api(secret, offset, {timeout, callbacks});
                const api = options.nullToken ? new Api(null, options) : new Api(secret, {
                    ...options,
                    offset,
                    timeout
                });

                const api_method = apifun || section;

                // console.debug(`Preparing to fire .${api_method} against api..timeout: ${timeout}`);

                api[api_method](token, values || {}, id_values || {}).then(data => {

                    processDataResponse(data);

                }).catch((resp) => {
                    if (section) dispatch(UXActions.SET_SPINNER(section, false));
                    console.error(JSON.stringify(resp));
                    let alt_message = resp && resp.data && resp.data.error && resp.data.error.message ? resp.data.error.message : 'Unable to complete request.';
                    let alt_code = resp && resp.data && resp.data.error && resp.data.error.code ? resp.data.error.code : 9999;
                    console.error(JSON.stringify(alt_message));
                    reject({message: alt_message, code: alt_code, resp});
                    if ((alt_code === 401) || (resp && resp.status && resp.status === 401)) {
                        dispatch(logoutUser());
                    }
                });
            } else {
                if (server !== 'demo')
                    console.error(`API not activated for ${method}, faking it for now...`);

                if (section)
                    dispatch(UXActions.SET_SPINNER(section, true));

                setTimeout(() => {
                    let data = fetchDemoData(section, values, id_values);
                    processDataResponse(data);
                }, 1000);
            }
        });
    };
}


