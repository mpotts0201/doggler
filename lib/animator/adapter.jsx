import React, {Component} from 'react';
// import UAParser from "ua-parser-js";
import {lookup_routes} from "app/config/settings/paths";
import {withRouter} from "next/router";
import {isServer} from "../utils/server";

class Adapter extends Component {
    constructor(props) {
        super(props)
        // this.parser = new UAParser();
        // this.parser_result = this.parser.getResult();
        this.state = {
            scrollPosition: 0,
            scrollPercentage: 0,
            window: undefined,
            layout: "desktop"
        }
    }

    clickToPage = (name, params) => {
        return (e) => {
            this.navigateToPage(name, params)
            return false
        }
    }

    navigateToPage = (name, params) => {
        const {router} = this.props;
        const newRoute = lookup_routes.paths[name];
        // need to build the path here...
        router.push(newRoute)
    }

    getRouteName = (path) => {
        return lookup_routes.names[path] || "default"
    }

    scrollToTop = () => {
        if (window && typeof window === "object" && window.scroll && typeof window.scroll === "function") {
            window.scroll({
                top: 0,
                left: 0,
                behavior: 'auto'
            });
        }
    }

    handleRouteChange = (url) => {
        // console.log('Path changed to: ', url)
        // this.scrollToTop()
    }

    componentDidMount() {
        const {router} = this.props;
        const host = !isServer() && window && window.location && window.location.host ? window.location.host : '';
        this.setState({window, host})
        // router.events.on('routeChangeComplete', this.handleRouteChange)
        // window.addEventListener('scroll', this.listenToScroll)
    }

    componentWillUnmount() {
        const {router} = this.props;
        // router.events.off('routeChangeComplete', this.handleRouteChange)
        // window.removeEventListener('scroll', this.listenToScroll)
    }

    calcScreenWidthHeightDevice = () => {
        const height = window.innerHeight; //window.screen.height;
        const width = window.innerWidth; //window.screen.width;
        const orientation = window.orientation || 0;
        return orientation !== 0 && width < height ? [height, width, 1, orientation] : [width, height, 0, orientation];
    }

    evaluateLayout = () => {
        const {window} = this.state;
        if (!window) return "desktop"
        const [width, height, apple, orientation] = this.calcScreenWidthHeightDevice();
        return width <= 480 ? "mobile" : "desktop"
    }

    listenToScroll = () => {
        const winScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;

        const scrolled = winScroll / height;
        const position = window.pageYOffset;

        this.setState({
            scrollPosition: position,
            scrollPercentage: scrolled * 100
        })
    };

    render() {
        return (
            <div className={`adaptive-wrapper`}>
                {this.renderAdaptive()}
                {this.props.children}
            </div>
        )
    }

    renderAdaptive = () => {
        const {render, router} = this.props;
        const {host} = this.state;
        // const layout = this.evaluateLayout();
        const additional_props = {
            // parser: this.parser,                // user agent parser,
            // parser_result: this.parser_result,
            routeName: this.getRouteName(router.asPath),
            routePath: router.asPath,
            scroll: this.state,
            host,
            // layout,
            clickToPage: this.clickToPage,
            navigateToPage: this.navigateToPage
        };

        const all_props = {
            ...this.props,
            ...additional_props
        };

        return render(all_props);
    };
}

export default withRouter(Adapter)
