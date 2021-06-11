import React, {Component} from "react";
import {Form, FormTextInput} from "lib/forms/components";
import createForm from "./dog";

export default class NewDogForm extends Component {
    constructor(props) {
        super(props);
        this.newDogForm = createForm({
            onSubmit: this.handleSubmit,
            initialValues: {
                name: "",
                age: 0,
                email: "",
                confirm: ""
            }
        });
    }

    handleSubmit = (values) => {
        console.log(values);
    };

    render() {
        return (
            <div>
                <Form
                    form={this.newDogForm}
                    render={(props) => {
                        const {secure, values} = props;
                        const secure_name = secure.name;
                        const secure_age = secure.age;
                        const secure_gender = secure.gender;
                        const secure_description = secure.description;
                        const secure_image_src = secure.image_src;
                        const has_errors = errors[secure_name] || errors[secure_age] || errors[secure_gender] || errors[secure_description] || errors[secure_image_src];
                        const fields_complete = values[secure_name] !== "" && values[secure_age] !== "" && values[secure_gender] !== "" && values[secure_description] !== "" && values[secure_image_src] !== "";
                        const buttonReady = fields_complete && !has_errors;
                        return (
                            <div>
                                <h3 className="title">Add a Dog</h3>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <FormTextInput {...props} className="input" name="name" />
                                    {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />}
                                    {touched[secure_name] && errors[secure_name] ? <div className="field-spacer error">{errors[secure_name]}</div> : <div className="field-spacer" />}
                                </div>
                                <div className="field">
                                    <label className="label">Age</label>
                                    <FormTextInput {...props} className="input" name="age" />
                                    {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />}
                                    {touched[secure_age] && errors[secure_age] ? <div className="field-spacer error">{errors[secure_age]}</div> : <div className="field-spacer" />}
                                </div>
                                <div className="field">
                                    <label className="label">Gender</label>
                                    <FormTextInput {...props} className="input" name="gender" />
                                    {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />}
                                    {touched[secure_gender] && errors[secure_gender] ? <div className="field-spacer error">{errors[secure_gender]}</div> : <div className="field-spacer" />}
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <FormTextInput {...props} className="input" name="description" />
                                    {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />}
                                    {touched[secure_description] && errors[secure_description] ? <div className="field-spacer error">{errors[secure_description]}</div> : <div className="field-spacer" />}
                                </div>
                                <div className="field">
                                    <label className="label">Image Link</label>
                                    <FormTextInput {...props} className="input" name="image_src" />
                                    {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />}
                                    {touched[secure_image_src] && errors[secure_image_src] ? <div className="field-spacer error">{errors[secure_image_src]}</div> : <div className="field-spacer" />}
                                </div>

                                <button onClick={this.handleClick} className="button is-dark is-fullwidth mt-6" disabled={!buttonReady}>
                                    Next
                                </button>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}
