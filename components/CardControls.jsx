import React from "react";
import styles from "../styles/CardControls.module.css";
import {faBone, faHeartBroken, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CardControls(props) {
    return (
        <div className={styles.container}>
            <div className={styles.icon} onClick={() => props.swipeOff(props.name)}>
                <FontAwesomeIcon icon={faHeartBroken} color="red" size="2x" />
            </div>
            <div className={styles.icon} onClick={() => props.swipeOff(props.name)}>
                <FontAwesomeIcon icon={faStar} color="lightblue" size="2x" />
            </div>
            <div className={styles.icon} onClick={() => props.swipeOff(props.name)}>
                <FontAwesomeIcon icon={faBone} color="green" size="2x" />
            </div>
        </div>
    );
}
