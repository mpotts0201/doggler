import React from "react";
import {useSelector, useDispatch} from "react-redux";
import SwipeCard from "../components/SwipeCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import Loader from "../components/Loader";
import styles from "../styles/Swipe.module.css";
import {withRouter} from "next/router";
import actions from "app/config/store/actions";
import Layout from "components/Layout";
import {useFetch} from "hooks";

const {DogActions} = actions;

function Swipe(props) {
    const {loading, error} = useFetch("/api/dogs", DogActions.SET_DOG_DATA);

    const dogs = useSelector((state) => state.app.dogs.dogs);
    const dispatch = useDispatch();

    const swipeOff = (dog, liked = false) => {
        const {id} = dog;

        if (liked) {
            // TODO: handle liked dogs from swiping
            // Would be done with a server, would hydrate redux with liked dogs
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

    if (error) return <h1>{error} (TODO: styled error component)</h1>;

    if (!loading && !dogs.length) return <h1>Out of swipes (TODO: styled "Out of swipes" component)</h1>;

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
