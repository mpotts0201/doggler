import React, {Component} from "react";
import {Form, FormTextInput, FormSelectInput} from "../../../lib/forms/components";
import createForm from "./user_update";
import Api from "lib/api/api";

export default class UpdateUserForm extends Component {
    constructor(props) {
        super(props);
        const {user} = this.props;
        this.updateUserForm = createForm({
            onSubmit: this.handleSubmit,
            initialValues: {
                name: user.name,
                age: user.age,
                gender: user.gender,
                image_src: user.image_src,
                description: user.description,
                location: user.location
            }
        });
    }

    handleSubmit = (values) => {
        const {user, setShowForm, dispatch} = this.props;

        dispatch(Api.updateUserProfile)(user.id, values)
            .then(() => {
                setShowForm(false);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
            });
    };

    render() {
        return (
            <div className="p-4">
                <Form
                    onSubmit={this.handleSubmit}
                    form={this.updateUserForm}
                    render={(props) => {
                        const {secure, values, errors, touched, dirty, isValid} = props;

                        return (
                            <div>
                                <h3 className="title">Your Info</h3>
                                <div className="field">
                                    <label className="label">Name</label>
                                    <FormTextInput {...props} className="input" name="name" />
                                </div>
                                <div className="field">
                                    <label className="label">Age</label>
                                    <FormTextInput {...props} className="input" name="age" />
                                </div>
                                <div className="field">
                                    <label className="label">Gender</label>
                                    <FormSelectInput
                                        {...props}
                                        name="gender"
                                        options={[
                                            {value: "male", title: "Male"},
                                            {value: "female", title: "Female"}
                                        ]}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Description</label>
                                    <FormTextInput {...props} textarea className="input" name="description" />
                                </div>
                                <div className="field">
                                    <label className="label">Location</label>
                                    <FormTextInput {...props} className="input" name="location" />
                                </div>
                                <button className="button is-dark is-fullwidth mt-6" disabled={!dirty && !isValid} onClick={() => this.handleSubmit(values)} type="submit">
                                    Submit
                                </button>
                                <button className="button is-fullwidth mt-3" onClick={() => this.props.setShowForm(false)}>
                                    Cancel
                                </button>
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}
