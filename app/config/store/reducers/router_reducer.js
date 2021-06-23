import actions from "app/config/store/actions";
import Immutable from "seamless-immutable";

const {RouterConstants} = actions;

const initialState = Immutable({
    params: {},
    page_name: ""
});

function routerReducer(state = initialState, action) {
    switch (action.type) {
        case RouterConstants.SET_PARAMS:
            return state.setIn(["params", action.id], action.value);

        case RouterConstants.SET_PAGE_NAME:
            state = state.set("page_name", action.value);
            break;
    }

    return state;
}

export default routerReducer;
