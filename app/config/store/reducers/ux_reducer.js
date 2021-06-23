import actions from 'app/config/store/actions';
import Immutable from 'seamless-immutable';

const {UXConstants} = actions;

const initialState = Immutable({
    spinners: {},
    count: 0
});

function uxReducer(state = initialState, action) {
    switch (action.type) {

        case UXConstants.SET_SPINNER:
            return state.setIn(['spinners', action.id], action.value);

        case UXConstants.ADD_COUNT:
            state = state.set('count', state.count + action.value);
            break;

    }

    return state;
}

export default uxReducer;