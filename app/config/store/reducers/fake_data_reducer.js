import actions from "app/config/store/actions";
import Immutable from "seamless-immutable";

const {FakeDataConstants} = actions;

const initialState = Immutable({
    nodes: {},
    arena: {},
    dc: {},
    selected: ""
});

function fakeDataReducer(state = initialState, action) {
    switch (action.type) {
        case FakeDataConstants.SET_NODE_DATA:
            state = state.set("nodes", action.value);
            break;
        case FakeDataConstants.SET_ARENA_DATA:
            state = state.set("arena", action.value);
            break;
        case FakeDataConstants.SET_DC_DATA:
            state = state.set("dc", action.value);
            break;
        case FakeDataConstants.SET_SELECTED:
            state = state.set("selected", action.value);
    }

    return state;
}

export default fakeDataReducer;
