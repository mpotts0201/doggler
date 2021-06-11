import {useDispatch} from "react-redux";

export function dispatchApi(func) {
    const dispatch = useDispatch();
    return (data, id_values) => {
        return dispatch(func(data, id_values))
    }
}
