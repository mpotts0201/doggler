import React, {useState, useEffect} from "react";
import Layout from "../components/Layout";
import {withRouter} from 'next/router';
import axios from "axios";
import styles from "../styles/Profile.module.css";

function dogProfile(props) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dog, setDog] = useState({});
    const dog_id = props.params.dogId
    useEffect(() => {
        const getDog = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/dogs/${dog_id}`);
                console.log(res.data);
                setDog(res.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to get Dog");
                setLoading(false);
                throw error;
            }
        };
        getDog();
    }, []);

    return <Layout {...props}>
        <div>
            <div className={styles["profile-container"]}>
                <div className={styles["headline-content"]}>
                    <div className={styles.left}>
                        {dog.images && <img className={styles.image} src={dog.images[0]} alt={dog.name} />}
                        <div className={styles.name}>
                            <div>{dog.name}</div>
                            <div>{dog.breed}</div>
                            <div>{dog.gender} - {dog.age}</div>
                        </div>
                    </div>
                    {/* <div className={styles.right}></div> */}
                </div>

                <div className={styles["profile-content"]}>
                    <div>{dog.description}</div>
                </div>
            </div>
        </div>
    </Layout>;
}

export default withRouter(dogProfile)