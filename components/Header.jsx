import React from "react";
import styles from "../styles/Header.module.css";
import {faDog, faPaw, faComment} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Link from "next/link";
import {useRouter} from "next/router";

export default function Header(props) {
    const router = useRouter()

    return (
        <div className={styles.container}>
            <Link href="/">
                <div>
                    <FontAwesomeIcon icon={faDog} size="lg" color="grey" />
                </div>
            </Link>
            <Link href={{pathname: "/swipe", query: {user_id: router.query.user_id}}}>
                <div>
                    <FontAwesomeIcon icon={faPaw} size="lg" color="#DA3472" />
                </div>
            </Link>
            <Link href={{pathname: "/messages", query: {user_id: router.query.user_id}}} >
                <div>
                    <FontAwesomeIcon icon={faComment} size="lg" color="grey" />
                </div>
            </Link>
        </div>
    );
}
