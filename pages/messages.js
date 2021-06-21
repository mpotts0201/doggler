import React, {useState, useEffect} from 'react'
import axios from 'axios';
import styles from "../styles/Messages.module.css";
import Header from '../components/Header';

export default function messages() {
    const userId = "cd251923-6a29-4cfe-94ea-a2c4b044e0c4"

    const [dogs, setDogs] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = () => {
        axios.get(`http://localhost:3001/api/users/${userId}/favorites`).then((data) => {
            data.data.map((dog) => {
                axios.get(`http://localhost:3001/api/dogs/${dog.dog_id}`).then((data) => {
                    setDogs((dogs) => [...dogs, data.data])
                })
            })
        }).catch((err) => {
            console.log(err)
        });
    }

    const unmatch = (dog_id) => {
        const user_id = "cd251923-6a29-4cfe-94ea-a2c4b044e0c4";
        axios.delete(`http://localhost:3001/api/users/${user_id}/unmatch/${dog_id}`).then((data) => {
            setDogs(dogs.filter((dog) => dog.id !== dog_id))
        }).catch((err) => {
            console.log(err)
        })
    }

    return (
        <div>
            <Header />
            <h1 className={styles.header}>Messages</h1>
            <div className={styles["messages-container"]}>
                {dogs.map((dog) => (
                    <div className={styles["message-row"]} key={dog.id}>
                        <div className={styles["message-row-left"]}>
                            <img className={styles["message-image"]} src={dog.images[0]} alt={dog.name} />
                            <div className={styles["message-name"]}>{dog.name}</div>
                        </div>
                        <div onClick={() => unmatch(dog.id)} className={styles.unmatch}>Unmatch</div>
                    </div>
                ))}
            </div>
        </div>
    )
}
