import React, {Component} from "react";
import {Form, FormTextInput} from "../../../lib/forms/components";
import createForm from "./user_login";
import axios from "axios";
import Router from "next/router";
import actions from "app/config/store/actions"
const {AuthActions} = actions
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

    handleSubmit = (values, actions) => {
        // e.preventDefault();
        const {controller, dispatch} = this.props;
        console.log(controller)

        axios
            .post("http://localhost:3001/api/users/login", {email: values.email, encrypted_password: values.password})
            .then((res) => {
                dispatch(AuthActions.SET_USER_ID(res.data.id))
                controller.navigateToPage('swipe');
            })
            .catch((err) => {
                console.log(err);
                // setState({error: "Invalid email or password"});
            });
    };

    render() {
        return (
            <div>
                <Form
                    onSubmit={this.handleSubmit}
                    form={this.loginUserForm}
                    render={(props) => {
                        const {secure, values, errors, touched} = props;
                        const secure_email = secure.email;
                        const secure_password = secure.password;
                        const has_errors = errors[secure_email] || errors[secure_password];
                        const fields_complete = values[secure_email] !== "" && values[secure_password] !== "";
                        const buttonReady = fields_complete && !has_errors;
                        return (
                            <div>
                                <h3 className="title">Login</h3>
                                <div className="field">
                                    <label className="label">Email</label>
                                    <FormTextInput {...props} className="input" name="email" />
                                    {/* {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />} */}
                                    {touched[secure_email] && errors[secure_email] ? <div className="field-spacer error">{errors[secure_email]}</div> : <div className="field-spacer" />}
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <FormTextInput {...props} className="input" name="password" />
                                    {/* {!has_errors && <div className="icon-svg-form" dangerouslySetInnerHTML={{__html: check_circle_outline}} />} */}
                                    {touched[secure_password] && errors[secure_password] ? <div className="field-spacer error">{errors[secure_password]}</div> : <div className="field-spacer" />}
                                </div>
                                <button className="button is-dark is-fullwidth mt-6" disabled={!buttonReady} type="submit">
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