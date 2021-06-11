import EasyActions from 'redux-easy-actions';

// this is a helper system to allow the auto-creation of actions
// it prevents us from having to do imports all over the place and create const variables mapped to strings

// it will create two exports from this helper..
// ie, import actions from 'thisfile'
// ie, const { Constants, Actions } from actions;

// Constants.VARIABLE which we can use in switch/case statements in reducers..
// Actions.VARIABLE which is the actual function we can pass optional params into under dispatch

export default EasyActions({
    // used in compare
    LOGIN_DEMO(type) {
        return {type}
    },

    LOGIN_USER(type, data) {
        return {type, data}
    },

    LOGIN_SESSION(type, data) {
        return {type, data}
    },

    REFRESH_USER(type, data) {
        return {type, data}
    },

    LOGOUT_USER(type, server) {
        return {type, server}
    },

    RESOLVE_LOGIN(type, value) {
        return {type, value}
    }
});

