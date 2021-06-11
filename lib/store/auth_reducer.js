import actions from 'app/config/store/actions';
import Immutable from 'seamless-immutable';
import {validReduxPayload} from "../core/wrapper";
import {HYDRATE} from "next-redux-wrapper";

const {LoginConstants, UXConstants} = actions;

const resetValues = {
    login: null,        // login value of user record returned, should be what was used to login
    logged_in: false,   // boolean if user authenticated or not
    auth_ts: null,      // timestamp of last login response (vs a session auth)
    timestamp: null,    // timestamp of last token response
    token: null,        // security token for api requests
    server: null,       // server (dev, prod)
    secret: null,       // secret key used to perform request signing and payload encryption
    user: null,         // minimal user record returned from login and session operations (usually id, name, login, etc),
    resolved: false
};

const initialState = Immutable(resetValues);

function authReducer(state = initialState, action) {

    switch (action.type) {
        case HYDRATE:
            if (validReduxPayload(action, 'payload.app.auth')) {
                // console.log(`AUTH HYDRATE CALLED with ${JSON.stringify(action.payload.app.auth)}`)
                return Immutable(action.payload.app.auth)
            }
            break;

        case LoginConstants.LOGIN_DEMO:
            break;

        case LoginConstants.LOGIN_USER:
            state = performLogin(state, action);
            break;

        case LoginConstants.LOGIN_SESSION:
            state = performLogin(state, action);
            break;

        case LoginConstants.REFRESH_USER:
            state = processTokenResponse(state, action);
            break;

        case LoginConstants.LOGOUT_USER:
            state = Immutable(resetValues);
            break;

        case LoginConstants.RESOLVE_LOGIN:
            state = state.set('resolved', action.value);
            break;
    }
    // console.log(`CURRENT AUTH STATE:\n${JSON.stringify(state, null, 4)}`)
    return state
}

function performLogin(state, action) {
    state = Immutable(resetValues);
    state = processTokenResponse(state, action);
    if (_.isObject(action.data.user) && _.has(action.data.user, "login")) {
        state = state.set('user', action.data.user);
        state = state.set('login', action.data.user.login);
        state = state.set('auth_ts', action.data.auth_ts || null);
        state = state.set('logged_in', true);
    }
    state = state.set('resolved', true);
    return state;
}

function processTokenResponse(state, action) {
    state = state.set('token', action.data.token || null);
    state = state.set('server', action.data.server || null);
    state = state.set('secret', action.data.secret || null);
    state = state.set('timestamp', action.data.timestamp || null);

    const client_ts = _.now();
    const server_ts = action.data.timestamp;
    if (server_ts && server_ts.toString().length === client_ts.toString().length) {
        state = state.set('tsoffset', server_ts - client_ts)
    } else
        state = state.set('tsoffset', 0);

    return state;
}

export default authReducer;
