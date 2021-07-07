import React, {Component} from "react";
import {Form, FormTextInput} from "../../../lib/forms/components";
import createForm from "./user_login";
import axios from "axios";
import Router from "next/router";
import actions from "app/config/store/actions";
import Api from "lib/api/api";
const {AuthActions} = actions;
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

        this.state = {
            error: null
        };
    }

    handleSubmit = (values, actions) => {
        const {controller, dispatch} = this.props;

        const payload = {
            email: values.email,
            encrypted_password: values.password
        };

        dispatch(Api.login)(payload)
            .then(() => {
                controller.navigateToPage("swipe");
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                this.setState({error: "Login failed. Ensure your email address and password are valid and please try again"});
            });
    };

    render() {
        const {error} = this.state;
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
                                {error && <span style={{color: "red", fontSize: 12}}>{error}</span>}
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
