import React, {Component} from "react";
import Controller from "./controller";
import {connect} from "react-redux";

class Router extends Component {
    constructor(props) {
        super(props);
        this.controller = new Controller(props);
    }

    // componentDidMount() {
    //     const {logged_in} = this.props;
    //     if (!logged_in) {
    //         this.controller.navigateToPage("/");
    //     } else {
    //         this.controller.navigateToPage("swipe");
    //     }
    // }

    render() {
        const {Component, logged_in} = this.props;

        const component_props = {
            ...this.props,
            controller: this.controller
        };

        // if (!logged_in) return <Login {...component_props} />;

        return (
                <Component {...component_props} />
        );
    }
}

const select = (state) => {
    return {
        logged_in: state.app.auth.logged_in
    };
};

export default connect(select)(Router);
