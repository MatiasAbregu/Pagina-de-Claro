import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { InputText } from "./InputText";
import { Navigate } from "react-router-dom";
import CryptoJS from "crypto-js";

export const Login = () => {

    const [dataUser, setDataUser] = useState("");
    const [dataPass, setDataPass] = useState("");
    const [alertComponent, setAlertComponent] = useState("");
    const [redirectToMenu, setRedirectToMenu] = useState(false);

    if (sessionStorage.getItem('token')) {
        if (CryptoJS.AES.decrypt(sessionStorage.getItem('token'), 'grupo7').toString(CryptoJS.enc.Utf8).split(',')[0] == "tokenClaroAuth") {
            return (
                <Navigate to={"/admin/menu"} replace={true} />
            );
        } else {
            sessionStorage.removeItem('token');
            return (
                <Navigate to={"/login"} replace={true} />
            );
        }
    }

    return (
        <>
            {redirectToMenu ? <Navigate to={"/admin/menu"} replace={true} /> : <></>}
            <Navbar />
            {
                alertComponent == "" ? <></> :
                    <>
                        <div className={`alert alert-${alertComponent} d-flex justify-content-between`} role="alert">
                            {alertComponent == "warning" ? "Rellene todos los campos antes de continuar." : "Usuario o contraseños incorrectos"}
                            <p onClick={() => setAlertComponent("")}>X</p>
                        </div>
                    </>
            }
            <div className="card text-center" id="cardLogin">
                <div className="card-header">
                    <h5 className="card-title">Iniciar Sesión</h5>
                </div>
                <div className="card-body">
                    <InputText label={"Nombre de Usuario"} type={"text"} data={dataUser} setData={setDataUser} />
                    <InputText label={"Contraseña"} type={"password"} data={dataPass} setData={setDataPass} />
                    <button className="btn btn-primary" onClick={() => {
                        if (dataUser == "" || dataPass == "") {
                            setAlertComponent("warning");
                        } else if (dataUser != "adminClaro" && dataPass != "claro123") {
                            setAlertComponent("danger");
                        } else {
                            sessionStorage.setItem("token", CryptoJS.AES.encrypt(`tokenClaroAuth, ${dataUser}`, "grupo7").toString());
                            setRedirectToMenu(true);
                        }
                    }}>Iniciar Sesión</button>
                </div>
                <div className="card-footer text-body-secondary">
                    ¿Problemas al iniciar sesión? <a href="">Cambia tu contraseña</a>
                </div>
            </div>
            <Footer />
        </>
    );
}