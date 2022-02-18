import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch} from "react-redux";

const useFetch = (endPoint, reduxAction) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const get = async () => {
            try {
                const res = await axios.get(endPoint);
                console.log("RES: ", res);
                dispatch(reduxAction(res.data));
                setLoading(false);
            } catch (error) {
                console.log("ERROR: ", error);
                setError(error);
                setLoading(false);
            }
        };

        get();
    }, []);

    return {loading, error};
};

export default useFetch;
