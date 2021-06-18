import React from "react";
import styles from "../styles/SwipeCard.module.css";
import {animated, useSpring} from "react-spring";
import {useDrag} from "@use-gesture/react";

export default function SwipeCard(props) {
    const [{x}, api] = useSpring(() => ({x: 0}));

    const bind = useDrag(({down, movement: [mx], velocity, direction: [xDir]}) => {
        let deltaX = 0;
        const dir = xDir > 0 ? 1 : -1;
        if (!down && velocity[0] > 0.2) {
            deltaX = (200 + window.innerWidth) * dir;
        }

        api.start({x: down ? mx : deltaX});
    });
    return (
        <animated.div {...bind()} style={{x, touchAction: "none"}} className={styles.card}>
            <div className={styles.info}>
                <div className={styles.textblock}>
                    <h1 className={styles.name}>Murphy the dog</h1>
                    <h3 className={styles.description}>I like sniffing</h3>
                </div>
                <img draggable={false} src="https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2018/01/12201051/cute-puppy-body-image.jpg" alt="good boi" className={styles.image} />
            </div>
        </animated.div>
    );
}
