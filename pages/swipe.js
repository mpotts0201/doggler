import React, {useState, useEffect} from "react";
import SwipeCard from "../components/SwipeCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import styles from "../styles/Swipe.module.css";
import {demo_dogs} from "../data"

export default function Swipe() {
    const [dogs, setDogs] = useState([]);
    const [dog, setDog] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setDogs(demo_dogs);
        setLoading(false);
        setDog(getRandomDog());
    }, []);

    const swipeOff = (oldDog) => {
        const newDog = getRandomDog(oldDog);

        setDog(newDog);
    };

    const getRandomDog = (name) => {
        if (name) {
            const newDogs = dogs.filter((dog) => dog.name !== name)
            setDogs(newDogs)
            return newDogs[Math.floor(Math.random() * newDogs.length)]
        } else {
            return demo_dogs[Math.floor(Math.random() * dogs.length)]
        }
    }

    const renderCards = () => {
        const randomDog = dog;

        return <SwipeCard
            key={randomDog.name}
            breed={randomDog.breed}
            age={randomDog.age}
            image={randomDog.images[0]}
            name={randomDog.name} />;
    };

    if (loading) return <h1>Loading...</h1>;

    if (!loading && dogs.length === 0) return <h1>Out of swipes</h1>;

    return (
        <div className={styles.container}>
            <Header />
            {renderCards()}
            <CardControls name={dog.name} swipeOff={swipeOff}/>
        </div>
    );
}
