import React, {useState, useEffect} from "react";
import SwipeCard from "../components/SwipeCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import Loader from "../components/Loader";
import axios from "axios";
import styles from "../styles/Swipe.module.css";

export default function Swipe() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setCards(data);
            setLoading(false);
        }, 2000);
    }, []);

    const swipeOff = (name) => {
        const newCards = cards.filter((card) => card.name !== name);
        setCards(newCards);
    };

    const renderCards = () => {
        return cards.map((card, i) => {
            return <SwipeCard key={i} card={card} swipeOff={swipeOff} />;
        });
    };

    if (!loading && cards.length === 0) return <h1>Out of swipes</h1>;

    return (
        <div className={styles.container}>
            <Header />
            {loading ? (
                <Loader />
            ) : (
                <>
                    {renderCards()}
                    <CardControls />
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
