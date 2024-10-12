import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export const ErrorPage = () => {
    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center mx-4">
                <img src="https://cdni.iconscout.com/illustration/premium/thumb/error-403-illustration-download-in-svg-png-gif-file-formats--forbidden-client-website-http-web-empty-pages-pack-user-interface-illustrations-6588413.png" width={"60%"} alt="" />
                <div className="text-center">
                    <h2>¡Oops! El sitio que estás intentado acceder está prohibido, inicia sesión antes de continuar.</h2>
                    <a href="/login">Volver al inicio de sesión</a>
                </div>
            </div>
            <Footer />
        </>
    );
}