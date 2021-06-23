import {combineReducers} from "redux";
import appReducers from '../../app/config/store/reducers';
// these are the reducers we're using

// each one is tied to function off a "portion" of the global state...
const reducers = {
    app: appReducers,
};

// we combine them using redux and it exports out as the "reducer" for our store..
export default combineReducers(reducers);