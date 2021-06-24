import React from "react";
import styles from "../styles/SwipeCard.module.css";


export default function InactiveCard(props) {
    const {dog} = props;
    return (
        <div  className={styles.card}>
            <div className={styles.info}>
                <div className={styles.textblock}>
                        <div>
                            <h1 className={styles.name}>{dog.name}</h1>
                            <h3 className={styles.description}>
                                {dog.breed} | {dog.age}
                            </h3>
                        </div>
                </div>
                <img draggable={false} src={dog.images[0]} alt="good boi" className={styles.image} />
            </div>
        </div>
    );
}
