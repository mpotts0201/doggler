import React, {useState, useEffect} from "react";
import {useSelector} from 'react-redux'
import SwipeCard from "../components/SwipeCard";
import InactiveCard from "../components/InactiveCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import Loader from "../components/Loader";
import axios from "axios";
import styles from "../styles/Swipe.module.css";
import {withRouter} from 'next/router';
import actions from "app/config/store/actions"
// if api is down, use this
// import {demo_dogs} from "../data"; 

const {DogActions} = actions

function Swipe(props) {

    const {dispatch} = props
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dogs = useSelector(state => state.app.dogs.dogs)
    const user_id = useSelector(state => state.app.router.params.userId)

    useEffect(() => {
        const getDogs = async () => {
            try {
                const res = await axios.get(`http://localhost:3001/api/users/${user_id}/dogs/getUserEligibleDogs`);
                dispatch(DogActions.SET_DOG_DATA(res.data))
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
        const {id} = dog;

        if (liked) {
            axios
                .post(`http://localhost:3001/api/users/${user_id}/favorites`, {dog_id: id})
                .then(() => {
                    console.log(`Dog ${id} added!`);
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        const filteredDogs = dogs.filter((dog) => dog.id !== id);
        dispatch(DogActions.SET_DOG_DATA(filteredDogs))

    };

    const renderCards = () => {
        return (
            <>
                <InactiveCard key={dogs[1].id} dog={dogs[1]} />
                <SwipeCard key={dogs[0].id} dog={dogs[0]} swipeOff={swipeOff} />
            </>
        )
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