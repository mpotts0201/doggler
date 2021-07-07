import React, {Component} from "react";
import Controller from "./controller";
import Loader from "components/Loader";
import actions from "app/config/store/actions";
const {AuthActions} = actions;

class Router extends Component {
    constructor(props) {
        super(props);
        this.controller = new Controller(props);
        this.state = {
            loading: true
        };
    }

    componentDidMount() {
        const {dispatch} = this.props;
        const userId = localStorage.getItem("userId");
        if (userId) {
            dispatch(AuthActions.SET_USER_ID(userId));
            this.controller.navigateToPage("swipe");
            this.setState({loading: false});
        } else {
            this.controller.navigateToPage("/");
            this.setState({loading: false});
        }
    }

    render() {
        const {Component} = this.props;

        const component_props = {
            ...this.props,
            controller: this.controller
        };

        if (this.state.loading) return <Loader />;

        return <Component {...component_props} />;
    }
}

export default Router;
