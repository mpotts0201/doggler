import React, {useEffect, useState} from "react";
import styles from "../styles/DogList.module.css";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function DogList(props) {
    const {dogs, controller} = props;

    const handleNavigation = (id) => {
        controller.navigateToPage("/user-dog", "dog_id", id);
    };

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {dogs.map((dog) => {
                    return (
                        <div key={dog.id} onClick={() => handleNavigation(dog.id)}>
                            <img className={styles.image} src={dog.images[0]} alt={dog.name} />
                        </div>
                    );
                })}
                <FontAwesomeIcon className={styles.icon} icon={faPlusCircle} size="6x" color="#DA3472" />
            </div>
        </div>
    );
}
