import {combineReducers} from "redux";
import routerReducer from "./reducers/router_reducer";
import uxReducer from "./reducers/ux_reducer";
import fakeDataReducer from "./reducers/fake_data_reducer";
import authReducer from "./reducers/auth_reducer";
import dogReducer from "./reducers/dog_reducer";
import profileReducer from "./reducers/profile_reducer";

const reducers = {
    ux: uxReducer,
    router: routerReducer,
    dogs: dogReducer,
    auth: authReducer,
    profile: profileReducer
};

export default combineReducers(reducers);
