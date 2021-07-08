import React, {useState, useEffect} from "react";
import Layout from "../components/Layout";
import {withRouter} from "next/router";
import Loader from "../components/Loader";
import styles from "../styles/Profile.module.css";
import actions from "app/config/store/actions";
import UpdateUserForm from "app/forms/user_update/UpdateUserForm";
import DogList from "../components/DogList";
import {useSelector} from "react-redux";
import Api from "lib/api/api";
const {AuthActions} = actions;

function profile(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const {userId, dispatch} = props;
    const user = useSelector((state) => state.app.profile.user);

    useEffect(() => {
        dispatch(Api.getProfile)(userId)
            .then(() => {
                setLoading(false);
            })
            .catch((error) => {
                console.log("ERROR: ", error);
                setError("Unable to retrieve profile at this time");
                setLoading(false);
            });
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

    if (loading) return <Loader />;

    if (error) return <div>{error}</div>;

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
                <DogList {...props} />
                {showForm ? (
                    <UpdateUserForm dispatch={dispatch} setShowForm={setShowForm} user={user} />
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
