import React from "react";
import dog_loading_gif from "../public/dog_loading.gif";
import Image from "next/image";

export default function Loader() {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100vh"}}>
            <Image width="250px" height="250px" src={dog_loading_gif} />
        </div>
    );
}
