import actions from 'app/config/store/actions';
import {callApiMethod} from "lib/methods/base";

const {
    UXActions
} = actions;

// order of params is values, redux_ACTION, id_values, method name
export function postRegister(values, options) {
    return callApiMethod(values, UXActions.NETWORK_NOOP, {}, 'postRegister', options)
}

export function postConfirm(values, options) {
    return callApiMethod(values, UXActions.NETWORK_NOOP, {}, 'postConfirm', options)
}