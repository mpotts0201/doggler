import React, {useState} from "react";
import Layout from "../components/Layout";
import axios from "axios";
import Router from "next/router";
import LoginUserForm from "../app/forms/user_login/LoginUserForm";

export default function login(props) {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: "",
        buttonText: "Login"
    });

    const {name, email, password, error, succes, buttonText} = state;

    // const handleChange = (name) => (e) => {
    //     setState({...state, [name]: e.target.value, error: "", success: "", buttonText: "Login"});
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/api/users/login", {email: state.email, encrypted_password: state.password}).then((data) => {
            Router.push({pathname: '/swipe', query: {user_id: data.data.id}})
        }).catch((err) => {
            console.log(err)
            setState({error: 'Invalid email or password'})
        })
    };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     axios
    //         .post("http://localhost:3001/api/users/login", {email: state.email, encrypted_password: state.password})
    //         .then((data) => {
    //             Router.push({pathname: "/swipe", query: {user_id: data.data[0].id}});
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //             setState({error: "Invalid email or password"});
    //         });
    // };

    // const loginForm = () => (
    //     <form onSubmit={handleSubmit}>
    //         <div className="field">
    //             <label className="label">Email</label>
    //             <div className="control">
    //                 <input onChange={handleChange("email")} className="input" type="email" value={email} placeholder="Type Your Email" />
    //             </div>
    //         </div>
    //         <div className="field">
    //             <label className="label">Password</label>
    //             <div className="control">
    //                 <input onChange={handleChange("password")} className="input" type="password" value={password} placeholder="Type Your Password" />
    //             </div>
    //         </div>
    //         <div className="control">
    //             <button className="button is-link">Login</button>
    //         </div>
    //     </form>
    // );

    return (
        <Layout {...props}>
            <div className="column is-three-fifths is-offset-one-fifth">
                <h1>Login</h1>
                <br />
                {/* {loginForm()} */}
                <LoginUserForm {...props}/>
                {state.error && <div style={{color: "red"}}>{state.error}</div>}
            </div>
        </Layout>
    );
}
