import "../styles/globals.css";
import Router from "lib/core/Router";
import {withApp} from "lib/core/wrapper";

function MyApp(props) {
    return <Router {...props} />;
}

export default withApp(MyApp);
