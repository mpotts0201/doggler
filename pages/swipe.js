import React, {useState, useEffect} from "react";
import SwipeCard from "../components/SwipeCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import Loader from "../components/Loader";
import axios from "axios";
import styles from "../styles/Swipe.module.css";
import {demo_dogs} from "../data"

export default function Swipe() {
    // const [demo_dogs, setDemoDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dogs, setDogs] = useState([])
    const [dog, setDog] = useState({});

    useEffect(() => {
        // setDemoDogs(demo_dogs);
        axios.get(`http://localhost:3001/api/dogs`).then((data) => {
            console.log(data.data)
            setDogs(data.data)
            setLoading(false);
        })
        console.log(dogs)
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
            // remove old dog from state
            const newDogs = dogs.filter((dog) => dog.name !== name)
            console.log(newDogs.length)
            setDogs(newDogs)
            return newDogs[Math.floor(Math.random() * newDogs.length)]
        } else {
            return dogs[Math.floor(Math.random() * dogs.length)]
        }
    }

    const renderCards = () => {
        // const randomDog = dog;
        // const randomDog = [dog, getRandomDog()];
        // console.log(randomDog)
        const randomDog = [dogs[0], dogs[1]];

        console.log(randomDog)

        return (randomDog && randomDog.map((dog) => (
            <SwipeCard
                key={dog.name}
                breed={dog.breed}
                age={dog.age}
                image={dog.images[0]}
                name={dog.name} />
        )))
    };

    if (loading) return <h1>Loading...</h1>;

    if (!loading && !dog) return <h1>Out of swipes</h1>;

    return (
        <div className={styles.container}>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                    <>
                        {renderCards()}
                        <CardControls name={dog.name} swipeOff={swipeOff} likeDog={likeDog} />
                    </>
                )}
        </div>
    );
}

const data = [
    {name: "Baxter", url: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg", description: "Loves sandwiches"},
    {name: "Eddy", url: "https://img.webmd.com/dtmcms/live/webmd/consumer_assets/site_images/article_thumbnails/other/dog_cool_summer_slideshow/1800x1200_dog_cool_summer_other.jpg?resize=750px:*", description: "Has a humping problem"},
    {name: "Phil", url: "https://www.tampabay.com/resizer/tAqq_86KOmKgluEgpI6xaV_Csvo=/1600x900/smart/arc-anglerfish-arc2-prod-tbt.s3.amazonaws.com/public/4BPHOOWHJAI6TBKNIBWI6S7HAY.jpg", description: "He lost his favorite toy"},
    {name: "Stacy", url: "https://www.riverviewanimalhospital.ca/wp-content/uploads/sites/7/2018/10/weed-dog.jpg", description: "Always happy to meet people"},
    {name: "Fang", url: "http://www.mypet.com/img/basic-pet-care/Breeds-of-Dogs-That-Need-The-Most-Exercise.jpg", description: "Small and friendly"}
];
