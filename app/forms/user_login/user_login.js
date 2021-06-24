import * as yup from "yup";
import {createForm} from "lib/forms/create";

export default createForm(
    {
        email: {
            label: "Email",
            yup: yup.email().required()
        },
        password: {
            label: "Password",
            yup: yup.string().required()
        }
    },
    {secure: true}
);
