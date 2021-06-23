import React, {useState, useEffect} from "react";
import Layout from "../components/Layout";
import {withRouter} from 'next/router';
import axios from "axios";
import Header from "../components/Header";
import styles from "../styles/Profile.module.css";

profile.getInitialProps = ({query: {user_id}}) => {
    console.log(user_id)
    return {user_id}
}

function profile({user_id}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user, setUser] = useState({});

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/users/${user_id}`);
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

    return <Layout>
        <div>
            <div className={styles["profile-container"]}>
                <div className={styles["headline-content"]}>
                    <div className={styles.left}>
                        <img className={styles.image} src={user.image} alt={user.name} />
                        <div className={styles.name}>
                            <div>{user.name}</div>
                            <div>{user.location}</div>
                            <div>{user.gender} - {user.age}</div>
                        </div>
                    </div>
                    {/* <div className={styles.right}></div> */}
                </div>

                <div className={styles["profile-content"]}>
                    <div>{user.description}</div>
                </div>
            </div>
        </div>
    </Layout>;
}

export default withRouter(profile)