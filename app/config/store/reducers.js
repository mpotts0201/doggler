import {combineReducers} from "redux";
import routerReducer from "./reducers/router_reducer";
import uxReducer from "./reducers/ux_reducer";
import fakeDataReducer from "./reducers/fake_data_reducer";
import authReducer from "./reducers/auth_reducer";

const reducers = {
    ux: uxReducer,
    router: routerReducer,
    fake_data: fakeDataReducer,
    auth: authReducer
};

export default combineReducers(reducers);
