import React from "react";
import styles from "../styles/CardControls.module.css";
import {faBone, faHeartBroken, faStar} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {motion} from "framer-motion";

export default function CardControls(props) {
    const buttons = [
        {
            icon: faHeartBroken,
            color: "red"
        },
        {
            icon: faStar,
            color: "lightblue"
        },
        {
            icon: faBone,
            color: "green"
        }
    ];
    return (
        <div className={styles.container}>
            {buttons.map(({color, icon}, i) => {
                return <ControlButton key={i} color={color} icon={icon} />;
            })}
        </div>
    );
}

const ControlButton = ({color, icon}) => {
    const animConfig = {
        scale: [1, 1.4, 1.2],
        transition: {duration: 0.2}
    };
    return (
        <motion.div whileHover={animConfig} whileTap={animConfig} className={styles.icon}>
            <FontAwesomeIcon icon={icon} color={color} size="2x" />
        </motion.div>
    );
};
