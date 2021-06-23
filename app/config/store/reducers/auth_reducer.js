import actions from "app/config/store/actions";
import Immutable from "seamless-immutable";

const {AuthConstants} = actions;

const initialState = Immutable({
    logged_in: false
});

function uxReducer(state = initialState, action) {
    switch (action.type) {
        case AuthConstants.SET_LOGGED_IN:
            return state.set("logged_in", action.value);
    }

    return state;
}

export default uxReducer;
