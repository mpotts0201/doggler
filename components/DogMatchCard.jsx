import React, {useRef, useEffect} from "react";
import {animated, useSpring} from "react-spring";
import {useDrag} from "@use-gesture/react";
import styles from "../styles/DogMatchCard.module.css";
import {ref} from "yup";

export default function DogMatchCard(props) {
    const {dog, navigateToProfile, unmatch} = props;

    const clickRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!ref.current?.contains(event.target)) {
                api.start({x: 0});
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [clickRef]);

    const [{x}, api] = useSpring(() => ({x: 0}));

    const bind = useDrag(({down, movement: [mx], velocity, direction: [xDir]}) => {
        let deltaX = 0;
        const dir = xDir > 0 ? 1 : -1;

        const left = dir < 0;
        const open = velocity[0] > 0.2 || mx < -window.innerWidth * 0.12;

        const openPosition = -window.innerWidth / 4;
        if (down && left && open) {
            deltaX = openPosition;
        }

        api.start({x: open ? openPosition : deltaX});
    });

    return (
        <div ref={clickRef} key={dog.id} className={styles.container}>
            <animated.div {...bind()} style={{x, touchAction: "none"}} className={styles.card}>
                <div className={styles.info} onClick={() => navigateToProfile(dog.id)}>
                    <img className={styles.image} src={dog.images[0]} alt={dog.name} />
                    <div className={styles.name}>{dog.name}</div>
                </div>
            </animated.div>
            <div onClick={() => unmatch(dog.id)} className={styles.remove}>
                REMOVE
            </div>
        </div>
    );
}
