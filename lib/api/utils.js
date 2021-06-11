import Cookies from "universal-cookie";
import {getServer} from "lib/utils/server";
import {loginSession, loginUser} from "../methods/login";
import {name} from "package.json"
import _ from "../utils/lodash";
import Payload from "./payload";
import actions from 'app/config/store/actions';
import {useEffect, useState} from "react";

const {LoginActions} = actions;

const DEVELOPMENT = process.env.DEVELOPMENT

// const visitor_secret = "fdabfdb2629e907cac058c6d78a05bfbb2b87a00bf88f2e11c551476e3cb0d25"

const newCookie = (req) => {
    return req ? new Cookies(req.headers.cookie) : new Cookies()
}

// export const syncVisitorCookie = (server, req) => {
//     const visitor_cookie = newCookie(req)
//     const cookie_name = `visitor_${server}`
//     console.log(`VISITOR COOKIE NAME: ${cookie_name}`)
//     let cookie = visitor_cookie.get(cookie_name)
//     if (!cookie) {
//         const value = cuid()
//         const hmac = crypto.createHmac('sha256', visitor_secret);
//         hmac.update(value);
//         const sig = hmac.digest('base64');
//         cookie = `${value}.${sig}.v1`
//     }
//     const expires = dayjs().add(1, 'year').toDate();
//     visitor_cookie.set(cookie_name, cookie, {path: "/", expires: expires})
//     return cookie
// }

export const server_cookie_name = (server, cookie) => {
    const suffix = server === "prod" ? "" : `_${server}`
    return `${name}_nxt_${cookie}${suffix}`
}

export const local_cookie_name = (server, cookie) => {
    const suffix = server === "prod" ? "" : `_${server}`
    return `${name}_${cookie}${suffix}`
}

export const getStateCookie = (server, req) => {
    const state_cookie = newCookie(req)
    const cookie_name = local_cookie_name(server, "state")
    // console.log(`STATE COOKIE NAME: ${cookie_name}`)
    return state_cookie.get(cookie_name)
}

export const getMarkerCookie = (server, req) => {
    const marker_cookie = newCookie(req)
    const cookie_name = server_cookie_name(server, "m")
    // console.log(`MARKER COOKIE NAME: ${cookie_name}`)
    return marker_cookie.get(cookie_name)
}

export const getVisitorCookie = (server, req) => {
    const visitor_cookie = newCookie(req)
    const cookie_name = server_cookie_name(server, "v")
    // console.log(`VISITOR COOKIE NAME: ${cookie_name}`)
    return visitor_cookie.get(cookie_name)
}

export const resolveLoggedIn = async (state, dispatch, ctx) => {
    const req = ctx && ctx.req
    const server = getServer(req)
    // console.log(`RESOLVE_LOGGED_IN_CHECK: ${state.app.auth.logged_in}`)

    if (state.app.auth.logged_in) {
        dispatch(LoginActions.RESOLVE_LOGIN(true))
        return;
    }

    const cookie = getMarkerCookie(server, req)

    try {
        cookie ?
            await dispatch(loginSession(server, {ctx})) :
            await dispatch(loginUser({login: "demo", password: "123", server}, {ctx}))
    } catch (err) {
        console.log(err.message)
    } finally {
        dispatch(LoginActions.RESOLVE_LOGIN(true))
    }
}

export const useOnResolvedLogin = (state, event) => {
    const [prior_value, setPrior] = useState(state.app.auth.logged_in);

    useEffect(() => {
        console.log(`LOGGED IN STATUS: ${state.app.auth.logged_in}`)
        if (state.app.auth.resolved) {
            event(state.app.auth.logged_in, state.app.auth.logged_in && !prior_value)
        }
    }, [state.app.auth.logged_in, state.app.auth.resolved])

    return state.app.auth.resolved;
}

export const resolveDataPayload = (data, secret) => {
    const keyname = "__data__";

    if (_.has(data, keyname) && _.isString(data[keyname])) {
        const payload = Payload.decryptJSON(data[keyname], secret);
        delete data[keyname];
        data = _.merge(data, payload);
        // if (DEVELOPMENT) {
        //     console.log(`GOT __DATA__: ${JSON.stringify(data, null, 4)}`);
        // }
    }
    return data;
}



