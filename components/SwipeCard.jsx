import React, {useEffect, useState, useRef} from "react";
import styles from "../styles/SwipeCard.module.css";

export default function SwipeCard(props) {
    const ref = useRef();
    const [pressed, setPressed] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});

    useEffect(() => {
        if (ref.current && pressed) {
            ref.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
        }
    }, [position]);

    useEffect(() => {
        if (ref.current && !pressed && Math.abs(position.x) < 200) {
            ref.current.style.transform = `translate(0px, 0px)`;
            setPosition({
                x: 0,
                y: 0
            });
        } else if (!pressed && Math.abs(position.x) > 200) {
            props.swipeOff(props.name);
        }
    }, [pressed]);

    const onMouseMove = (event) => {
        if (pressed) {
            setPosition({
                x: position.x + event.movementX,
                y: position.y + event.movementY
            });
        }
    };

    const handleStartPress = () => {
        setPressed(true);
    };

    const handleEndPress = () => {
        setPressed(false);
    };

    return (
        <div ref={ref} onPointerDown={handleStartPress} onPointerMove={onMouseMove} onPointerUp={handleEndPress} onMouseMove={onMouseMove} onMouseDown={handleStartPress} onMouseUp={handleEndPress} className={styles.container}>
            {props.name}
        </div>
    );
}
