import React from "react";
import Layout from "../components/Layout";
import {useSelector} from "react-redux";

export default function UserDog(props) {
    const dogId = useSelector((state) => state.app.router.params.dog_id);

    console.log("DOG ID: ", dogId);
    return <Layout {...props}>User Dog</Layout>;
}
