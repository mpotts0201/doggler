import React from "react";
import styles from "../styles/Header.module.css";
import {faDog, faPaw, faComment} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Header(props) {
    return (
        <div className={styles.container}>
            <Link href="/">
                <div>
                    <FontAwesomeIcon icon={faDog} size="lg" color="grey" />
                </div>
            </Link>
            <Link href="/swipe">
                <div>
                    <FontAwesomeIcon icon={faPaw} size="lg" color="#DA3472" />
                </div>
            </Link>
            <Link href="/messages">
                <div>
                    <FontAwesomeIcon icon={faComment} size="lg" color="grey" />
                </div>
            </Link>
        </div>
    );
}
