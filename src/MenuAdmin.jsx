import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SelectBox } from "./SelectBox";
import { InputText } from "./InputText";

export const MenuAdmin = () => {

    const [opcionPrecioSeleccionada, setOpcionPrecioSeleccionada] = useState("2 GB de Internet")
    const [descuentoSeleccionado, setDescuentoSeleccionado] = useState("Movistar");
    const [precioNuevo, setPrecioNuevo] = useState();
    const [descuentoNuevo, setDescuentoNuevo] = useState();
    const [listadoPrecios, setListadoPrecios] = useState([]);
    const [listadoDescuentos, setListadoDescuentos] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('listadoPrecios')) {
            setListadoPrecios(JSON.parse(localStorage.getItem('listadoPrecios')));
        }

        if (localStorage.getItem('listadoDescuentos')) {
            setListadoDescuentos(JSON.parse(localStorage.getItem('listadoDescuentos')));
        }
    }, []);

    if (sessionStorage.getItem('token')) {
        if (CryptoJS.AES.decrypt(sessionStorage.getItem("token"), "grupo7").toString(CryptoJS.enc.Utf8).split(',')[0] == "tokenClaroAuth") {
            return (
                <>
                    <Navbar />
                    <div className="d-flex">
                        <h2 className="welcomeTitle">¡Bienvenido de vuelta:
                            <b>{CryptoJS.AES.decrypt(sessionStorage.getItem("token"), "grupo7").toString(CryptoJS.enc.Utf8).split(',')[1]}</b>!</h2>
                    </div>
                    <hr />
                    <div className="d-flex cajasCustomAdmin">
                        <div className="boxPrecios">
                            <h3>Modifica los precios ($)</h3>
                            <hr />
                            <div className="d-flex flex-column">
                                <SelectBox elements={[[1, "2 GB de Internet"], [2, "4 GB de Internet"],
                                [3, "7 GB de Internet"], [4, "10 GB de Internet"], [5, "20 GB de Internet"], [6, "30 GB de Internet"]]} setData={setOpcionPrecioSeleccionada} />
                                <br />
                                <InputText disabled={true} label={"Precio actual:"}
                                    data={listadoPrecios.find(item => item[0] == opcionPrecioSeleccionada)?.[1]} />

                                <InputText label={"Introduza el nuevo precio:"}
                                    data={precioNuevo} setData={setPrecioNuevo} />

                                <button className="btn btn-primary w-100 mt-2" onClick={() => {
                                    if (/^\d+(\.\d+)?$/.test(precioNuevo)) {
                                        const nuevosPrecios = 
                                        listadoPrecios
                                        .map(item => item[0] == opcionPrecioSeleccionada ? [item[0], parseFloat(precioNuevo)] : item);

                                        setListadoPrecios(nuevosPrecios);

                                        localStorage.setItem('listadoPrecios', JSON.stringify(nuevosPrecios));
                                        setPrecioNuevo('');
                                    } else alert("Solo números enteros o decimales positivos");
                                }} disabled={precioNuevo ? false : true}>Actualizar precio</button>
                            </div>
                        </div>
                        <div className="boxDescuentos">
                            <h3>Modifica los descuentos (%)</h3>
                            <hr />
                            <div className="d-flex flex-column">
                                <SelectBox setData={setDescuentoSeleccionado} elements={[[1, "Movistar"], [2, "Personal"], [3, "Tuenti"]]} />
                                <br />
                                <InputText label={"Descuento actual: "} disabled={true}
                                    data={listadoDescuentos.find(item => item[0] == descuentoSeleccionado)?.[1]} />

                                <InputText label={"Introduza el nuevo descuento (Solo números enteros del 1 al 100)"}
                                    data={descuentoNuevo} setData={setDescuentoNuevo} />

                                <button className="btn btn-primary w-100 mt-2" onClick={() => {
                                    if (/^(100|[1-9][0-9]?)$/.test(descuentoNuevo)) {
                                        const nuevosDescuentos = 
                                        listadoDescuentos.map(item => item[0] == descuentoSeleccionado ? [item[0], descuentoNuevo] : item);

                                        setListadoDescuentos(nuevosDescuentos);

                                        localStorage.setItem('listadoDescuentos', JSON.stringify(nuevosDescuentos));
                                        setDescuentoNuevo('');
                                    } else alert("Solo números enteros del 1 al 100");
                                }} disabled={descuentoNuevo ? false : true} >Actualizar descuento</button>
                            </div>
                        </div>
                    </div>
                    <Footer />
                </>
            );
        }
    }

    return (
        <Navigate to={"/error-403"} replace={true} />
    );
}