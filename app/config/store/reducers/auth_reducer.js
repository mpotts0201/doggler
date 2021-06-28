import actions from "app/config/store/actions";
import Immutable from "seamless-immutable";

const {AuthConstants} = actions;

const initialState = Immutable({
    logged_in: false,
    userId: null
});

function authReducer(state = initialState, action) {
    switch (action.type) {
        case AuthConstants.SET_LOGGED_IN:
            return state.set("logged_in", action.value);
        case AuthConstants.SET_USER_ID:
            return state.set("userId", action.value);
    }

    return state;
}

export default authReducer;
