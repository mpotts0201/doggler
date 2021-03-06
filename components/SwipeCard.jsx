import React, {useEffect, useState} from "react";
import styles from "../styles/SwipeCard.module.css";
import {animated, useSpring} from "react-spring";
import {useDrag} from "@use-gesture/react";
import {faBone, faHeartBroken} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function SwipeCard(props) {
    const {dog} = props;
    const swipeOffTimeout = setTimeout;

    useEffect(() => {
        return () => clearTimeout(swipeOffTimeout);
    });

    const [icon, setIcon] = useState(faBone);

    const {swipeOff} = props;
    const [{x, rotateZ, scale: cardScale}, cardApi] = useSpring(() => ({x: 0, rotateZ: 0, scale: 1}));
    const [{y, opacity, scale: iconScale}, iconApi] = useSpring(() => ({y: 0, scale: 0.5, opacity: 0}));

    const bindCard = useDrag(({down, movement: [mx], velocity, direction: [xDir]}) => {
        let deltaX = 0;
        const dir = xDir > 0 ? 1 : -1;
        const rotation = mx / 100;
        if (!down && velocity[0] > 0.2) {
            deltaX = (200 + window.innerWidth) * dir;
            swipeOffTimeout(() => {
                swipeOff(dog, dir === 1 ? true : false);
            }, 500);
        }

        if (dir === 1 && mx > 0) {
            setIcon(faBone);
        } else if (dir === -1 && mx < 0) {
            setIcon(faHeartBroken);
        }

        cardApi.start({x: down ? mx : deltaX, rotateZ: down ? rotation : 0, scale: down ? 1.1 : 1});
        iconApi.start({y: down ? -Math.abs(mx / 2) : -deltaX, opacity: down ? Math.abs(mx / (window.innerWidth / 2)) : 0, scale: down ? 1.5 : 1});
    });

    return (
        <>
            <animated.div {...bindCard()} style={{x, touchAction: "none", rotateZ, scale: cardScale}} className={styles.card}>
                <div className={styles.info}>
                    <div className={styles.textblock}>
                        <div>
                            <h1 className={styles.name}>{dog.name}</h1>
                            <h3 className={styles.description}>
                                {dog.breed} | {dog.age}
                            </h3>
                        </div>
                    </div>
                    <img draggable={false} src={dog.images.length ? dog.images[0] : "https://www.e-days.com/wp-content/uploads/2019/06/french-bulldog-dressed-as-businessman-works-at-6HFKQY8-1024x683.jpg"} alt="good boi" className={styles.image} />
                </div>
            </animated.div>
            <animated.div style={{y, touchAction: "none", scale: iconScale, opacity}} className={styles.icon}>
                <FontAwesomeIcon color={icon === faBone ? "green" : "red"} icon={icon} size="4x" />
            </animated.div>
        </>
    );
}
