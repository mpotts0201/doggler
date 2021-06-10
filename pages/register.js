import React, {useState} from "react";
import Layout from "../components/Layout";

export default function register() {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText: "Register"
    });

    const {name, email, password, error, succes, buttonText} = state;

    const handleChange = (name) => (e) => {
        setState({...state, [name]: e.target.value, error: "", success: "", buttonText: "Register"});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.table(state);
    };

    const registerForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label className="label">Name</label>
                <div className="control">
                    <input onChange={handleChange("name")} className="input" type="text" value={name} placeholder="Type Your Name" />
                </div>
            </div>
            <div className="field">
                <label className="label">Email</label>
                <div className="control">
                    <input onChange={handleChange("email")} className="input" type="email" value={email} placeholder="Type Your Email" />
                </div>
            </div>
            <div className="field">
                <label className="label">Password</label>
                <div className="control">
                    <input onChange={handleChange("password")} className="input" type="password" value={password} placeholder="Type Your Password" />
                </div>
            </div>
            <div className="control">
                <button className="button is-link">{buttonText}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="column is-three-fifths is-offset-one-fifth">
                <h1>Register</h1>
                <br />
                {registerForm()}
                {/* <hr /> */}
                {/* {JSON.stringify(state)} */}
            </div>
        </Layout>
    );
}
