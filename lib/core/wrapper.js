import {createWrapper} from "next-redux-wrapper";
import {configureStore} from "lib/core/store";
import {Base64} from 'js-base64';
import msgpack from 'msgpack-lite'
import Payload from 'lib/api/payload'
import {connect} from "react-redux";
import {getServer, isServer} from "lib/utils/server";
import {getStateCookie, local_cookie_name} from "lib/api/utils";
import Cookies from "universal-cookie";
import Immutable from 'seamless-immutable';
import {reduxPersistConfig} from "app/config/settings/redux";

const secret = reduxPersistConfig.secret

const removeStateCookie = () => {
    const cookie = new Cookies()
    const server = getServer()
    const cookie_name = local_cookie_name(server, "state")
    cookie.remove(cookie_name, {path: '/'});
    // console.log(`COOKIE: ${cookie_name} DELETED`)
}

const setStateCookie = (state) => {
    const cookie = new Cookies()
    const server = getServer()
    const cookie_name = local_cookie_name(server, "state")
    const persist_state = reduxPersistConfig.appKeys.reduce((acc, key) => {
        acc.app[key] = state.app[key]
        return acc;
    }, {app: {}})
    // console.log(`PERSIST STATE: ${JSON.stringify(persist_state)}`)
    const data = Payload.encryptJSON(persist_state, secret)
    cookie.set(cookie_name, data, {path: '/'});
}

const persistState = (store) => {
    if (!isServer()) {
        reduxPersistConfig.persist === true ? setStateCookie(store.getState()) : removeStateCookie()
    }
}

export const persistMiddleware = store => next => action => {
    let result = next(action)
    // console.debug('persisting', action)
    persistState(store)
    return result
}


const makeStore = context => {
    let state = {}
    if (isServer() && context.req) {
        const server = getServer(context.req)
        const data = getStateCookie(server, context.req)
        state = Payload.decryptJSON(data, secret) || {}
        // console.log(`INBOUND STATE: ${JSON.stringify(state)}`)
    }
    return configureStore(Immutable(state))
}

const serialization = {
    serializeState: state => Payload.encryptJSON(state, secret),
    deserializeState: state => Payload.decryptJSON(state, secret)
}

export const appWrapper = createWrapper(makeStore, {debug: false, ...serialization})

const select = (state, props) => {
    return {
        state,
        dispatch: props.dispatch,
        logged_in: state.app.auth.logged_in
    }
}

export const withApp = (app) => appWrapper.withRedux(connect(select)(app))

export const validReduxPayload = (state, path) => {
    return _.get(state, path, undefined)
}

export const dataPack = (data) => {
    return Base64.fromUint8Array(msgpack.encode(data))
}

export const dataUnpack = (blob) => {
    try {
        return msgpack.decode(Base64.toUint8Array(blob))
    } catch {
        return {}
    }
}
