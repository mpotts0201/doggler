import {domain} from 'app/config/settings/domain'

export const isServer = () => typeof window === 'undefined' || process.env.NODE_ENV === "test";

export const getServer = (req) => {
    const host = isServer() ? req.headers.host : (window && window.location && window.location.host ? window.location.host : '');

    let server = "dev";

    if (_.startsWith(host, "localhost")) {
        server = "dev"
    }

    if (_.endsWith(host, domain)) {
        server = "prod"
    }

    return server;
}

export const success = (data) => {
    return {
        success: true,
        data: data || {}
    }
}

export const failure = (code, message) => {
    return {
        success: false,
        error: {
            code: code || 1,
            message: message || "unknown"
        }
    }
}

