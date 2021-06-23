import {createWrapper} from "next-redux-wrapper";
import {configureStore} from "lib/core/store";
import Immutable from "seamless-immutable";
import {withRouter} from "next/router";
import {compose} from "redux";
import {connect} from "react-redux";

const makeStore = (context) => {
    let state = {};

    return configureStore(Immutable(state));
};

export const appWrapper = createWrapper(makeStore, {debug: false});

const select = (state, props) => {
    return {
        dispatch: props.dispatch
    };
};

const enhance = compose(withRouter, appWrapper.withRedux, connect(select));

export const withApp = (app) => enhance(app);
