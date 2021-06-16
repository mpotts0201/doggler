import * as yup from "yup";
import {createForm} from "lib/forms/create";

export default createForm(
    {
        name: {
            label: "Name",
            length: 50,
            yup: yup.string().required()
        },
        age: {
            label: "Age",
            length: 2,
            yup: yup.number().required()
        },
        gender: {
            label: "Gender",
            yup: yup.string().required()
        },
        description: {
            label: "Description",
            yup: yup.string().required()
        },
        image_src: {
            label: "Image Source",
            yup: yup.string().required()
        }
    },
    {secure: true}
);
