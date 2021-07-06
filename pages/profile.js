import React, {useState, useEffect} from "react";
import Layout from "../components/Layout";
import {withRouter} from "next/router";
import axios from "axios";
import Header from "../components/Header";
import styles from "../styles/Profile.module.css";
import actions from "app/config/store/actions";
import UpdateUserForm from "app/forms/user_update/UpdateUserForm";
const {AuthActions} = actions;

function profile(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);
    const {userId} = props;

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/users/${userId}`);
                console.log(res.data);
                setUser(res.data[0]);
                setLoading(false);
            } catch (error) {
                setError("Failed to get Dogs");
                setLoading(false);
                throw error;
            }
        };
        getUser();
    }, []);

    const logout = () => {
        const {controller, dispatch} = props;
        localStorage.removeItem("userId");
        dispatch(AuthActions.SET_USER_ID(null));
        controller.navigateToPage("login");
    };

    const toggleForm = () => {
        setShowForm(true);
    };

    return (
        <Layout {...props}>
            <div>
                <div className={styles["profile-container"]}>
                    <div className={styles["headline-content"]}>
                        <div className={styles.left}>
                            <img className={styles.image} src={user.image} alt={user.name} />
                            <div className={styles.name}>
                                <div>{user.name}</div>
                                <div>{user.location}</div>
                                <div>
                                    {user.gender} - {user.age}
                                </div>
                            </div>
                        </div>
                        {/* <div className={styles.right}></div> */}
                    </div>

                    <div className={styles["profile-content"]}>
                        <div>{user.description}</div>
                    </div>
                </div>
                {showForm ? (
                    <UpdateUserForm setUser={setUser} setShowForm={setShowForm} user={user} />
                ) : (
                    <>
                        <button className="button m-6" onClick={toggleForm}>
                            Update
                        </button>
                        <button className="button m-6" onClick={logout}>
                            Log out
                        </button>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default withRouter(profile);
