import React, {useState, useEffect} from "react";
import {useSelector} from "react-redux";
import SwipeCard from "../components/SwipeCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import Loader from "../components/Loader";
import styles from "../styles/Swipe.module.css";
import {withRouter} from "next/router";
import actions from "app/config/store/actions";
import Layout from "components/Layout";
import {demo_dogs} from "data";

const {DogActions} = actions;

function Swipe(props) {
    const {userId, dispatch} = props;
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const dogs = useSelector((state) => state.app.dogs.dogs);

    useEffect(() => {
        dispatch(DogActions.SET_DOG_DATA(demo_dogs));

        setLoading(false);
    }, []);

    const swipeOff = (dog, liked = false) => {
        const {id} = dog;

        if (liked) {
            // Api.likeDog({dog_id: id}, userId);
        }

        const filteredDogs = dogs.filter((dog) => dog.id !== id);

        setTimeout(() => {
            dispatch(DogActions.SET_DOG_DATA(filteredDogs));
        }, 100);
    };

    const renderCards = () => {
        return [dogs[1], dogs[0]].map((dog, i) => {
            return <SwipeCard {...props} key={dog.id} dog={dog} swipeOff={swipeOff} />;
        });
    };

    if (error) return <h1>{error}</h1>;

    if (!loading && !dogs.length) return <h1>Out of swipes</h1>;

    return (
        <Layout {...props}>
            <div className={styles.container}>
                <Header {...props} swipe={true} />
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {renderCards()}
                        <CardControls dog={dogs[0]} swipeOff={swipeOff} />
                    </>
                )}
            </div>
        </Layout>
    );
}

export default withRouter(Swipe);
