import Head from "next/head";
import React from "react";
import Header from "./Header";
import Navbar from "./Navbar";

export default function Layout({children, controller, showHeader = true}) {
    return (
        <React.Fragment>
            <Head>
                <title>Dogglr</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.2/css/bulma.min.css" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/nprogress/0.2.0/nprogress.min.css" />
            </Head>

            {/* <Navbar /> */}
            {showHeader && <Header controller={controller} swipe={false} />}

            {children}
        </React.Fragment>
    );
}
