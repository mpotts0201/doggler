import {Component} from "react";
import actions from "app/config/store/actions";

const {RouterActions} = actions;
class Controller extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    navigateToPage = (page_name, key = null, page_params) => {
        const {dispatch, router} = this.props;
        router.push(page_name);

        if (key && page_params) {
            dispatch(RouterActions.SET_PARAMS(key, page_params));
        }
    };
}

export default Controller;
