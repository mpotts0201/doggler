import React, {useState, useEffect} from "react";
import axios from "axios";
import styles from "../styles/Messages.module.css";
import {withRouter} from "next/router";
import Layout from "../components/Layout";
import DogMatchCard from "../components/DogMatchCard";

function messages(props) {
    const [dogs, setDogs] = useState([]);
    const {userId} = props;

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = () => {
        axios
            .get(`http://localhost:3001/api/users/${userId}/favorites`)
            .then((res) => {
                setDogs(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const unmatch = (dog_id) => {
        axios
            .delete(`http://localhost:3001/api/users/${userId}/unmatch/${dog_id}`)
            .then((data) => {
                setDogs(dogs.filter((dog) => dog.id !== dog_id));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const navigateToProfile = (dog_id) => {
        const {controller} = props;

        controller.navigateToPage("dog-profile", "dogId", dog_id);
    };

    return (
        <Layout {...props}>
            <div className={styles.container}>
                {dogs.map((dog) => (
                    <DogMatchCard key={dog.id} dog={dog} unmatch={unmatch} navigateToProfile={navigateToProfile} />
                ))}
            </div>
        </Layout>
    );
}

export default withRouter(messages);
