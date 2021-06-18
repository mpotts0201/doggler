import React, {useState, useEffect} from "react";
import SwipeCard from "../components/SwipeCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import styles from "../styles/Swipe.module.css";
import {demo_dogs} from "../data"
import axios from "axios";

export default function Swipe() {
    // const [demo_dogs, setDemoDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dogs, setDogs] = useState([])
    const [filteredDogList, setFilteredDogList] = useState([])
    const [dog, setDog] = useState({});

    useEffect(() => {
        // setDemoDogs(demo_dogs);
        axios.get(`http://localhost:3001/api/dogs`).then((data) => {
            console.log(data.data)
            setDogs(data.data)
            setFilteredDogList(data.data)
        })

        // axios.get(`http://localhost:3001/api/dogs/random`).then((data) => {
        //     setDog(data.data)
        //     setLoading(false);
        // })
        getDog()
    }, []);

    const getDog = () => {
        axios.get(`http://localhost:3001/api/dogs/random`).then((data) => {
            setDog(data.data)
            setLoading(false);
        })
    }

    const swipeOff = (oldDog) => {
        const newDog = getRandomDog(oldDog);

        setDog(newDog);
    };

    const likeDog = () => {
        const user_id = "cd251923-6a29-4cfe-94ea-a2c4b044e0c4";
        const dog_id = dog.id;

        axios.post(`http://localhost:3001/api/users/${user_id}/favorites`, {dog_id}).then(() => {
            console.log(`Dog ${dog_id} added!`)
            const newDog = getRandomDog(dog.name);
            setDog(newDog)

        }).catch((err) => {
            console.log(err)
        })
    }

    const getRandomDog = (name) => {
        if (name) {
            const newDogs = dogs.filter((dog) => dog.name !== name)
            console.log(newDogs.length)
            setDogs(newDogs)
            return newDogs[Math.floor(Math.random() * newDogs.length)]
        } else {
            return dogs[Math.floor(Math.random() * dogs.length)]
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

    if (!loading && !dog) return <h1>Out of swipes</h1>;

    return (
        <div className={styles.container}>
            <Header />
            {renderCards()}
            <CardControls name={dog.name} swipeOff={swipeOff} likeDog={likeDog}/>
        </div>
    );
}
