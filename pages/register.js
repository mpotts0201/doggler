import React, {useState} from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Router from 'next/router'

export default function register() {
    const [state, setState] = useState({
        name: "",
        email: "",
        encrypted_password: "",
        error: "",
        success: ""
    });

    const {name, email, encrypted_password, error, succes} = state;

    const handleChange = (name) => (e) => {
        setState({...state, [name]: e.target.value, error: "", success: ""});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.table(state);
        const body = {
            name: state.name,
            email: state.email,
            encrypted_password: state.encrypted_password
        }
        axios.post("http://localhost:3001/api/users", body).then((res) => {
            console.log(res.data)
            Router.push({pathname: '/swipe', query: {user_id: res.data[0].id}})
        }).catch((err) => {
            console.log(err)
            setState({error: 'Invalid email or password'})
        })
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
                <label className="label">encrypted_password</label>
                <div className="control">
                    <input onChange={handleChange("encrypted_password")} className="input" type="encrypted_password" value={encrypted_password} placeholder="Type Your Password" />
                </div>
            </div>
            <div className="control">
                <button className="button is-link">{"Register"}</button>
            </div>
        </form>
    );

    return (
        <Layout>
            <div className="column is-three-fifths is-offset-one-fifth">
                <h1>Register</h1>
                <br />
                {registerForm()}
            </div>
        </Layout>
    );
}
