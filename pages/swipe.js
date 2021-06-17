import React, {useState, useEffect} from "react";
import SwipeCard from "../components/SwipeCard";
import Header from "../components/Header";
import CardControls from "../components/CardControls";
import axios from "axios";
import styles from "../styles/Swipe.module.css";

export default function Swipe() {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getPokemon = async () => {
            try {
                const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=5");

                setCards(res.data.results);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        getPokemon();
    }, []);

    const swipeOff = (name) => {
        const newCards = cards.filter((card) => card.name !== name);
        setCards(newCards);
    };

    const renderCards = () => {
        return cards.map((card, i) => {
            return <SwipeCard zIndex={cards.length - i} key={card.name} name={card.name} swipeOff={swipeOff} />;
        });
    };

    if (loading) return <h1>Loading...</h1>;

    if (!loading && cards.length === 0) return <h1>Out of swipes</h1>;

    return (
        <div className={styles.container}>
            <Header />
            {renderCards()}
            <CardControls />
        </div>
    );
}
