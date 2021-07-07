import React, {useState, useEffect} from "react";
import Layout from "../components/Layout";
import {withRouter} from "next/router";
import axios from "axios";
import Header from "../components/Header";
import styles from "../styles/Profile.module.css";
import actions from "app/config/store/actions";
import UpdateUserForm from "app/forms/user_update/UpdateUserForm";
import DogList from "../components/DogList";
const {AuthActions, ProfileActions} = actions;

function profile(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});
    const [showForm, setShowForm] = useState(false);
    const {userId, dispatch} = props;

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/users/${userId}`);
                console.log(res.data);
                dispatch(ProfileActions.SET_USER(res.data));
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
                <DogList dogs={dogs} {...props} />
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

const dogs = [
    {
        id: "75676bd6-a356-453e-8e02-81ad8baeb49g",
        name: "Ms. Birmingham",
        description: "Reduced Ports synergistic Plastic copy Berkshire Handmade Loan Gorgeous Soft parse Consultant attitude-oriented Fresh recontextualize Bedfordshire Car matrix Customer Investor overriding Granite enable Security Soft plum synthesizing Summit Tuna Buckinghamshire",
        breed: "Trigg Hound",
        age: 0,
        gender: "male",
        user_id: "00c987a3-a6d8-429b-bf3f-8624761c5a30",
        created_at: "2021-06-23T22:47:17.647Z",
        updated_at: "2021-06-23T22:47:17.647Z",
        images: ["http://placeimg.com/640/480/animals?random=86592", "http://placeimg.com/640/480/animals?random=71477", "http://placeimg.com/640/480/animals?random=86877", "http://placeimg.com/640/480/animals?random=46333", "http://placeimg.com/640/480/animals?random=97207"]
    },
    {
        id: "75676bd6-a356-453e-8e02-81ad8baeb49f",
        name: "Ms. Birmingham",
        description: "Reduced Ports synergistic Plastic copy Berkshire Handmade Loan Gorgeous Soft parse Consultant attitude-oriented Fresh recontextualize Bedfordshire Car matrix Customer Investor overriding Granite enable Security Soft plum synthesizing Summit Tuna Buckinghamshire",
        breed: "Trigg Hound",
        age: 0,
        gender: "male",
        user_id: "00c987a3-a6d8-429b-bf3f-8624761c5a30",
        created_at: "2021-06-23T22:47:17.647Z",
        updated_at: "2021-06-23T22:47:17.647Z",
        images: ["http://placeimg.com/640/480/animals?random=86592", "http://placeimg.com/640/480/animals?random=71477", "http://placeimg.com/640/480/animals?random=86877", "http://placeimg.com/640/480/animals?random=46333", "http://placeimg.com/640/480/animals?random=97207"]
    },
    {
        id: "75676bd6-a356-453e-8e02-81ad8baeb496",
        name: "Ms. Birmingham",
        description: "Reduced Ports synergistic Plastic copy Berkshire Handmade Loan Gorgeous Soft parse Consultant attitude-oriented Fresh recontextualize Bedfordshire Car matrix Customer Investor overriding Granite enable Security Soft plum synthesizing Summit Tuna Buckinghamshire",
        breed: "Trigg Hound",
        age: 0,
        gender: "male",
        user_id: "00c987a3-a6d8-429b-bf3f-8624761c5a30",
        created_at: "2021-06-23T22:47:17.647Z",
        updated_at: "2021-06-23T22:47:17.647Z",
        images: ["http://placeimg.com/640/480/animals?random=86592", "http://placeimg.com/640/480/animals?random=71477", "http://placeimg.com/640/480/animals?random=86877", "http://placeimg.com/640/480/animals?random=46333", "http://placeimg.com/640/480/animals?random=97207"]
    },
    {
        id: "75676bd6-a356-453e-8e02-81ad8baeb49h",
        name: "Ms. Birmingham",
        description: "Reduced Ports synergistic Plastic copy Berkshire Handmade Loan Gorgeous Soft parse Consultant attitude-oriented Fresh recontextualize Bedfordshire Car matrix Customer Investor overriding Granite enable Security Soft plum synthesizing Summit Tuna Buckinghamshire",
        breed: "Trigg Hound",
        age: 0,
        gender: "male",
        user_id: "00c987a3-a6d8-429b-bf3f-8624761c5a30",
        created_at: "2021-06-23T22:47:17.647Z",
        updated_at: "2021-06-23T22:47:17.647Z",
        images: ["http://placeimg.com/640/480/animals?random=86592", "http://placeimg.com/640/480/animals?random=71477", "http://placeimg.com/640/480/animals?random=86877", "http://placeimg.com/640/480/animals?random=46333", "http://placeimg.com/640/480/animals?random=97207"]
    }
];
