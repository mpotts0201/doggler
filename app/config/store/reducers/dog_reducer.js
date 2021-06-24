import actions from "app/config/store/actions";
import Immutable from "seamless-immutable";

const {DogConstants} = actions;

const initialState = Immutable({
    logged_in: false
});

function uxReducer(state = initialState, action) {
    switch (action.type) {
        case DogConstants.SET_DOG_DATA:
            return state.set("dogs", action.value);
    }

    return state;
}

export default uxReducer;