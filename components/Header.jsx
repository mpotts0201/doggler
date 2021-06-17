import React from "react";
import styles from "../styles/Header.module.css";
import {faCoffee, faPaw} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Header(props) {
    return (
        <div className={styles.container}>
            <FontAwesomeIcon icon={faPaw} />
            <FontAwesomeIcon icon={faPaw} />
            <FontAwesomeIcon icon={faPaw} />
        </div>
    );
}
