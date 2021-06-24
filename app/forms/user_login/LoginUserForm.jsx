import React, {Component} from "react";
import {Form, FormTextInput} from "lib/forms/components";
import createForm from "./user_login";

export default class LoginUserForm extends Component {
    constructor(props) {
        super(props);
        this.loginUserForm = createForm({
            onSubmit: this.handleSubmit,
            initialValues: {
                email: "",
                password: ""
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
                    form={this.loginUserForm}
                    render={(props) => {
                        const {secure, values} = props;
                        const secure_email = secure.email;
                        const secure_password = secure.password;
                        const has_errors = errors[secure_email] || errors[secure_password];
                        const fields_complete = values[secure_email] !== "" && values[secure_password] !== "";
                        const buttonReady = fields_complete && !has_errors;
                        return (
                            <div>
                                <h3 className="title">Add an Owner</h3>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <FormTextInput {...props} className="input" name="email" />
                                    {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />}
                                    {touched[secure_email] && errors[secure_email] ? <div className="field-spacer error">{errors[secure_email]}</div> : <div className="field-spacer" />}
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <FormTextInput {...props} className="input" name="password" />
                                    {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />}
                                    {touched[secure_password] && errors[secure_password] ? <div className="field-spacer error">{errors[secure_password]}</div> : <div className="field-spacer" />}
                                </div>
                                <button onClick={this.handleClick} className="button is-dark is-fullwidth mt-6" disabled={!buttonReady}>
                                    Submit
                                </button>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}
