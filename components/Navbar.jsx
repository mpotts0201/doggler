import React from "react";
import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                {/* <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                </a> */}

                {/* <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a> */}
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link href="/">
                        <a className="navbar-item">Home</a>
                    </Link>

                    {/* <a className="navbar-item">Login</a> */}

                    {/* <a className="navbar-item">Register</a> */}

                    {/* <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">More</a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">Home</a>
                            <a className="navbar-item">Jobs</a>
                            <a className="navbar-item">Contact</a>
                            <hr className="navbar-divider" />
                            <a className="navbar-item">Report an issue</a>
                        </div>
                    </div> */}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            <Link href="/register">
                                <a className="button is-primary">
                                    <strong>Sign up</strong>
                                </a>
                            </Link>
                            <Link href="/login">
                                <a className="button is-light">Log in</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
