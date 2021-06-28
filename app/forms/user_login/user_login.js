import * as yup from "yup";
import {createForm} from "../../../lib/forms/create";

export default createForm(
    {
        email: {
            label: "Email",
            yup: yup.string().required("Please enter your email address")
        },
        password: {
            label: "Password",
            yup: yup.string().required("Please enter your password")
        }
    },
    {secure: true}
);
