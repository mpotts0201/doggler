import actions from "app/config/store/actions";
import Immutable from "seamless-immutable";

const {ProfileConstants} = actions;

const initialState = Immutable({
    user: {},
    dogs: []
});

function profileReducer(state = initialState, action) {
    switch (action.type) {
        case ProfileConstants.SET_USER:
            return state.set("user", action.value);

        case ProfileConstants.SET_DOGS:
            state = state.set("dogs", action.value);
            break;
    }

    return state;
}

export default profileReducer;
