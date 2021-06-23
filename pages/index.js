import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";

export default function Home() {
    return (
        <div>
            <Layout>Doggler</Layout>
            <Link href="login"><button className="button is-link">Login</button></Link>
            <Link href="register"><button className="button is-link">Register</button></Link>
        </div>
    );
}
