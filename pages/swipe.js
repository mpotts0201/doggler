import React, {useState, useEffect} from "react";
import SwipeCard from "../components/SwipeCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import Loader from "../components/Loader";
import axios from "axios";
import styles from "../styles/Swipe.module.css";
import {withRouter} from 'next/router';
import {demo_dogs} from "../data";

Swipe.getInitialProps = ({query: {user_id}}) => {
    console.log(user_id)
    return {user_id}
}

function Swipe({user_id}) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        const getDogs = async () => {
            try {
                // const user_id = "cd251923-6a29-4cfe-94ea-a2c4b044e0c4";
                const res = await axios.get(`http://localhost:3001/api/users/${user_id}/dogs/getUserEligibleDogs`);
                console.log(res.data);
                setDogs(res.data);
                setLoading(false);
            } catch (error) {
                setError("Failed to get Dogs");
                setLoading(false);
                throw error;
            }
        };

        getDogs();
    }, []);

    const swipeOff = (dog, liked = false) => {
        // const user_id = "cd251923-6a29-4cfe-94ea-a2c4b044e0c4";
        const {id} = dog;

        if (liked) {
            // axios
            //     .post(`http://localhost:3001/api/users/${user_id}/favorites`, {dog_id: id})
            //     .then(() => {
            //         console.log(`Dog ${id} added!`);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });
        }

        const filteredDogs = dogs.filter((dog) => dog.id !== id);
        setDogs(filteredDogs);
    };

    const renderCards = () => {
        console.log(user_id)
        console.log("2 DOGS: ", dogs.slice(0, 2), dogs);
        return dogs
            .slice(0, 2)
            .reverse()
            .map((dog) => {
                return <SwipeCard key={dog.id} user_id={user_id} dog={dog} swipeOff={swipeOff} />;
            });
    };

    if (loading) return <h1>Loading...</h1>;

    if (error) return <h1>{error}</h1>;

    if (!loading && !dogs.length) return <h1>Out of swipes</h1>;

    return (
        <div className={styles.container}>
            <Header swipe={true}/>
            {loading ? (
                <Loader />
            ) : (
                    <>
                        {renderCards()}
                        <CardControls dog={dogs[0]} swipeOff={swipeOff} />
                    </>
                )}
        </div>
    );
}

export default withRouter(Swipe)