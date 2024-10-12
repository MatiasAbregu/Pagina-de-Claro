import React from "react";
import claro from './assets/claro.png';
import { Link } from "react-router-dom";

export const Navbar = ({ login }) => {
    return (
        <nav className="navbar">
            <div className="container-fluid">
                <Link to={"/"} className="navbar-brand">
                    <img src={claro} alt="Logo" height="30" />
                </Link>
                {login ? <a href="/login" id="adminNav">¿Eres administrador?</a> : <></>}
            </div>
        </nav>
    );
}