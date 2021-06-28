import React, {Component} from "react";
import {Form, FormTextInput} from "../../../lib/forms/components";
import createForm from "./user_login";
import axios from "axios";
import Router from "next/router";

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

    handleSubmit = () => {
        // e.preventDefault();
        const {values} = this.props;
        console.log(values);
        // axios
        //     .post("http://localhost:3001/api/users/login", {email: state.email, encrypted_password: state.password})
        //     .then((data) => {
        //         Router.push({pathname: "/swipe", query: {user_id: data.data[0].id}});
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         setState({error: "Invalid email or password"});
        //     });
    };

    render() {
        return (
            <div>
                <Form
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
