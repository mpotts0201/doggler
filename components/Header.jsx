import React from "react";
import styles from "../styles/Header.module.css";
import {faDog, faPaw, faComment} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Header(props) {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon icon={faDog} size="lg" color="grey" />
            <FontAwesomeIcon icon={faPaw} size="lg" color="#DA3472" />
            <FontAwesomeIcon icon={faComment} size="lg" color="grey" />
        </div>
    );
}

// #DA3472
// #E05C5B
