import React, {useState, useEffect} from 'react'
import axios from 'axios';
import styles from "../styles/Messages.module.css";
import Header from '../components/Header';
import {withRouter} from 'next/router';
import Layout from "../components/Layout";
import Link from "next/link";

messages.getInitialProps = ({query: {user_id}}) => {
    return {user_id}
}

function messages({user_id}) {
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = () => {
        axios.get(`http://localhost:3001/api/users/${user_id}/favorites`).then((res) => {
            setDogs(res.data)
        }).catch((err) => {
            console.log(err)
        });
    }

    const unmatch = (dog_id) => {
        axios.delete(`http://localhost:3001/api/users/${user_id}/unmatch/${dog_id}`).then((data) => {
            setDogs(dogs.filter((dog) => dog.id !== dog_id))
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <Layout>
            <h1 className={styles.header}>Messages</h1>
            <div className={styles["messages-container"]}>
                {dogs.map((dog) => (
                    <Link key={dog.id} href={{pathname: "/dog-profile", query: {dog_id: dog.id}}}>
                        <div className={styles["message-row"]}>
                            <div className={styles["message-row-left"]}>
                                <img className={styles["message-image"]} src={dog.images[0]} alt={dog.name} />
                                <div className={styles["message-name"]}>{dog.name}</div>
                            </div>
                            <div onClick={() => unmatch(dog.id)} className={styles.unmatch}>Unmatch</div>
                        </div>
                    </Link>
                ))}
            </div>
        </Layout>
    )
}

export default withRouter(messages)