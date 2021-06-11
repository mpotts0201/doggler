import {applyMiddleware, createStore} from 'redux';
import reducers from 'lib/store/reducers';
import thunkMiddleware from 'redux-thunk';
import {persistMiddleware} from "./wrapper";

export function configureStore(initialState) {
    let middleware = [thunkMiddleware, persistMiddleware];
    let createStoreWithMiddleware = null;
    // if (NEXT_PUBLIC_DEVELOPMENT && process.env.DEBUG) {
    //     console.log(`STORE IN DEBUG MODE`);
    //     createStoreWithMiddleware = compose(
    //         applyMiddleware(...middleware, require('redux-logger')),
    //         require('./devtools').DevTools.instrument()
    //     )(createStore)
    // } else {
    createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    // }

    // console.log(`CONFIGURING STORE: ${JSON.stringify(initialState)}`)
    return createStoreWithMiddleware(reducers, initialState);
}

// export default configureStore({});

