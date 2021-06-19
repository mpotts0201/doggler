import React, {useEffect} from "react";
import styles from "../styles/SwipeCard.module.css";
import {animated, useSpring} from "react-spring";
import {useDrag} from "@use-gesture/react";

export default function SwipeCard(props) {
    const swipeOffTimeout = setTimeout;

    useEffect(() => {
        return () => clearTimeout(swipeOffTimeout);
    });

    const {card, swipeOff} = props;
    const [{x, rotateZ, scale}, api] = useSpring(() => ({x: 0, rotateZ: 0, scale: 1}));

    const bind = useDrag(({down, movement: [mx], velocity, direction: [xDir]}) => {
        let deltaX = 0;
        const dir = xDir > 0 ? 1 : -1;
        const rotation = mx / 100;
        if (!down && velocity[0] > 0.2) {
            deltaX = (200 + window.innerWidth) * dir;
            swipeOffTimeout(() => {
                swipeOff(card.name);
            }, 500);
        }

        api.start({x: down ? mx : deltaX, rotateZ: down ? rotation : 0, scale: down ? 1.1 : 1});
    });

    return (
        <animated.div {...bind()} style={{x, touchAction: "none", rotateZ, scale}} className={styles.card}>
            <div className={styles.info}>
                <div className={styles.textblock}>
                    <h1 className={styles.name}>{card.name}</h1>
                    <h3 className={styles.description}>{card.description}</h3>
                </div>
                <img draggable={false} src={card.url} alt="good boi" className={styles.image} />
            </div>
        </animated.div>
    );
}
