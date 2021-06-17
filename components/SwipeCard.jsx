import React from "react";
import styles from "../styles/SwipeCard.module.css";

export default function SwipeCard(props) {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.info}>
                    <div className={styles.textblock}>
                        <h1 className={styles.name}>Murphy the dog</h1>
                        <h3 className={styles.description}>I like sniffing garbage</h3>
                    </div>
                    <img src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg" alt="good boi" className={styles.image} />
                </div>
                <div className=""></div>
            </div>
        </div>
    );
}
