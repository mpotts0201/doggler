import BaseApi from './base';

export default class CoreApi extends BaseApi {
    constructor(secret, options = {}) {
        super(secret, options);
    }

    // Session

    session(server, challenge) {
        return this.helper(null, 'POST', '/session', {server, challenge});
    }

    // Refresh
    refresh(token, challenge) {
        return this.helper(token, 'POST', '/refresh', {challenge});
    }

    // Login

    login(token, username, password, server, challenge) {
        return this.helper(token, 'POST', '/login', {username, password, server, challenge});
    }

    // Logout

    logout(token) {
        return this.helper(token, 'POST', '/logout');
    }

    // Refresh

    postRegister(token, values) {
        // we ignore token
        const {name, email, password, server} = values;
        return this.register(token, name, email, password, server)
    }

    // Register
    register(token, name, email, password, server) {
        return this.helper(token, 'POST', '/register', {name, email, password, server});
    }

    postConfirm(token, values) {
        const {confirmation_token, confirmation_code, server} = values;
        return this.confirm(token, confirmation_token, confirmation_code, server);
    }

    // Confirm
    confirm(token, confirmation_token, confirmation_code, server) {
        return this.helper(token, 'POST', '/confirm', {
            token: confirmation_token,
            code: confirmation_code,
            server
        });
    }
}
