import React from "react";
import styles from "../styles/Header.module.css";
import {faDog, faPaw, faComment} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Header(props) {
    const router = useRouter()

    const navigateTo = (page) => {
        const {controller} = props;
        return () => {
            controller.navigateToPage(page)
        }
    }

    return (
        <div className={props.swipe ? `${styles.container} ${styles["swipe-container"]}` : styles.container}>
                <div className="icon" onClick={navigateTo("profile")}>
                    <FontAwesomeIcon icon={faDog} size="lg" color="grey" />
                </div>
                <div className="icon" onClick={navigateTo("swipe")}>
                    <FontAwesomeIcon icon={faPaw} size="lg" color="#DA3472" />
                </div>
                <div className="icon" onClick={navigateTo("messages")}>
                    <FontAwesomeIcon icon={faComment} size="lg" color="grey" />
                </div>
        </div>
    );
}
