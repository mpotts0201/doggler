import React from "react";
import styles from "../styles/DogList.module.css";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function DogList(props) {
    // const {dogs} = props;

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                {dogs.map((dog) => {
                    return <img key={dog.id} className={styles.image} src={dog.images[0]} alt={dog.name} />;
                })}
                <FontAwesomeIcon className={styles.icon} icon={faPlusCircle} size="6x" color="#DA3472" />
            </div>
        </div>
    );
}

const dogs = [
    {
        id: "75676bd6-a356-453e-8e02-81ad8baeb49g",
        name: "Ms. Birmingham",
        description: "Reduced Ports synergistic Plastic copy Berkshire Handmade Loan Gorgeous Soft parse Consultant attitude-oriented Fresh recontextualize Bedfordshire Car matrix Customer Investor overriding Granite enable Security Soft plum synthesizing Summit Tuna Buckinghamshire",
        breed: "Trigg Hound",
        age: 0,
        gender: "male",
        user_id: "00c987a3-a6d8-429b-bf3f-8624761c5a30",
        created_at: "2021-06-23T22:47:17.647Z",
        updated_at: "2021-06-23T22:47:17.647Z",
        images: ["http://placeimg.com/640/480/animals?random=86592", "http://placeimg.com/640/480/animals?random=71477", "http://placeimg.com/640/480/animals?random=86877", "http://placeimg.com/640/480/animals?random=46333", "http://placeimg.com/640/480/animals?random=97207"]
    },
    {
        id: "75676bd6-a356-453e-8e02-81ad8baeb49f",
        name: "Ms. Birmingham",
        description: "Reduced Ports synergistic Plastic copy Berkshire Handmade Loan Gorgeous Soft parse Consultant attitude-oriented Fresh recontextualize Bedfordshire Car matrix Customer Investor overriding Granite enable Security Soft plum synthesizing Summit Tuna Buckinghamshire",
        breed: "Trigg Hound",
        age: 0,
        gender: "male",
        user_id: "00c987a3-a6d8-429b-bf3f-8624761c5a30",
        created_at: "2021-06-23T22:47:17.647Z",
        updated_at: "2021-06-23T22:47:17.647Z",
        images: ["http://placeimg.com/640/480/animals?random=86592", "http://placeimg.com/640/480/animals?random=71477", "http://placeimg.com/640/480/animals?random=86877", "http://placeimg.com/640/480/animals?random=46333", "http://placeimg.com/640/480/animals?random=97207"]
    },
    {
        id: "75676bd6-a356-453e-8e02-81ad8baeb496",
        name: "Ms. Birmingham",
        description: "Reduced Ports synergistic Plastic copy Berkshire Handmade Loan Gorgeous Soft parse Consultant attitude-oriented Fresh recontextualize Bedfordshire Car matrix Customer Investor overriding Granite enable Security Soft plum synthesizing Summit Tuna Buckinghamshire",
        breed: "Trigg Hound",
        age: 0,
        gender: "male",
        user_id: "00c987a3-a6d8-429b-bf3f-8624761c5a30",
        created_at: "2021-06-23T22:47:17.647Z",
        updated_at: "2021-06-23T22:47:17.647Z",
        images: ["http://placeimg.com/640/480/animals?random=86592", "http://placeimg.com/640/480/animals?random=71477", "http://placeimg.com/640/480/animals?random=86877", "http://placeimg.com/640/480/animals?random=46333", "http://placeimg.com/640/480/animals?random=97207"]
    },
    {
        id: "75676bd6-a356-453e-8e02-81ad8baeb49h",
        name: "Ms. Birmingham",
        description: "Reduced Ports synergistic Plastic copy Berkshire Handmade Loan Gorgeous Soft parse Consultant attitude-oriented Fresh recontextualize Bedfordshire Car matrix Customer Investor overriding Granite enable Security Soft plum synthesizing Summit Tuna Buckinghamshire",
        breed: "Trigg Hound",
        age: 0,
        gender: "male",
        user_id: "00c987a3-a6d8-429b-bf3f-8624761c5a30",
        created_at: "2021-06-23T22:47:17.647Z",
        updated_at: "2021-06-23T22:47:17.647Z",
        images: ["http://placeimg.com/640/480/animals?random=86592", "http://placeimg.com/640/480/animals?random=71477", "http://placeimg.com/640/480/animals?random=86877", "http://placeimg.com/640/480/animals?random=46333", "http://placeimg.com/640/480/animals?random=97207"]
    }
];
