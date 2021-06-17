import React from "react";
import styles from "../styles/SwipeCard.module.css";

export default function SwipeCard(props) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.info}>
                    <div className={styles.textblock}>
                        <h1 className={styles.name}>{props.name}</h1>
                        <h3 className={styles.description}>{props.breed} | {props.age}</h3>
                    </div>
                    <img src={props.image} alt="good boi" className={styles.image} />
                </div>
                <div className=""></div>
            </div>
        </div>
    );
}
