import ux_actions from "./actions/ux_actions";
import router_actions from "./actions/router_actions";
import fake_data_actions from "./actions/fake_data_actions";
import auth_actions from "./actions/auth_actions";
import {mergeActions} from "lib/store/actions";
// when we add others, we'll need to merge all the Actions and Constants together...
const merge_list = [
    ["UX", ux_actions],
    ["Router", router_actions],
    ["FakeData", fake_data_actions],
    ["Auth", auth_actions]
];

export default mergeActions(merge_list);
