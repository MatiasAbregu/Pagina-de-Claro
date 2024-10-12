import React from "react";
import claro from './assets/claro.png';

export const Footer = () => {
    return(
        <footer className="d-flex align-items-center">
            <img src={claro} alt="" height="30"/>
            <p>Todos los derechos reservados. Claro - 2024</p>
        </footer>
    );
}