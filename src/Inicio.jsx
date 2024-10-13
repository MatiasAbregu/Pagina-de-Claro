import { useEffect, useState } from 'react';
import { InputText } from './InputText'
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SelectBox } from './SelectBox';

export const Inicio = () => {

    const [dataTel, setDataTel] = useState("");
    const [dataPO, setDataPO] = useState("");
    const [dataPA, setDataPA] = useState("");
    const [tipoPlan, setTipoPlan] = useState("2 GB de Internet");
    const [listadoPrecios, setListadoPrecios] = useState([]);
    const [listadoDescuentos, setListadoDescuentos] = useState([]);

    useEffect(() => {
        if (localStorage.getItem('listadoPrecios')) {
            setListadoPrecios(JSON.parse(localStorage.getItem('listadoPrecios')));
        } else {
            localStorage.setItem('listadoPrecios', JSON.stringify([
                ["2 GB de Internet", 21500],
                ["4 GB de Internet", 27700],
                ["7 GB de Internet", 36900],
                ["10 GB de Internet", 54800],
                ["20 GB de Internet", 71200],
                ["30 GB de Internet", 82100],
            ]));

            setListadoPrecios([
                ["2 GB de Internet", 21500],
                ["4 GB de Internet", 27700],
                ["7 GB de Internet", 36900],
                ["10 GB de Internet", 54800],
                ["20 GB de Internet", 71200],
                ["30 GB de Internet", 82100],
            ]);
        }

        if (localStorage.getItem('listadoDescuentos')) {
            setListadoDescuentos(JSON.parse(localStorage.getItem('listadoDescuentos')));
        } else {
            localStorage.setItem('listadoDescuentos', JSON.stringify([
                ["Personal", 30],
                ["Movistar", 85],
                ["Tuenti", 85],
            ]));

            setListadoDescuentos([
                ["Personal", 30],
                ["Movistar", 85],
                ["Tuenti", 85],
            ]);
        }
    }, []);

    return (
        <>
            <Navbar login={true} />
            <div className='d-flex mt-4 mb-5'>
                <div className="card mt-3" id='cardTelefono'>
                    <div className="card-body">
                        <h5 className="card-title">Ingrese el número teléfonico a buscar:</h5>
                        <InputText type={"tel"} disabled={false} data={dataTel} setData={setDataTel} />
                        <button className="btn btn-primary w-100" onClick={() => {
                            if (dataTel) {
                                if (dataTel.startsWith("1") || dataTel.startsWith("4") || dataTel.startsWith("7")) {
                                    setDataPO("Movistar");
                                    if (Math.round(Math.random()) + 1 == 1) setDataPA("Tuenti");
                                    else setDataPA("Personal");
                                } else if (dataTel.startsWith("2") || dataTel.startsWith("5") || dataTel.startsWith("8")) {
                                    setDataPO("Tuenti");
                                    if (Math.round(Math.random()) + 1 == 1) setDataPA("Movistar");
                                    else setDataPA("Personal");
                                } else {
                                    setDataPO("Personal");
                                    if (Math.round(Math.random()) + 1 == 1) setDataPA("Movistar");
                                    else setDataPA("Tuenti");
                                }
                            } else alert("Rellenar los campos");
                        }} >Buscar</button>
                    </div>
                </div>
                <div className="card mt-3" id='cardDatos'>
                    <div className="card-body">
                        <h5 className="card-title text-center">Datos del Usuario</h5>
                        <hr />
                        <InputText type={"text"} disabled={true} label={"Prestador Original"} data={dataPO} />
                        <InputText type={"text"} disabled={true} label={"Prestador Actual"} data={dataPA} />
                    </div>
                </div>
            </div>
            {dataPA && dataPO ? <hr /> : <></>}
            <div className='d-flex flex-column claroBox mb-5'>
                {
                    dataPO && dataPA ?
                        <>
                            <h3>¡Que estás esperando para pasarte a Claro!</h3>
                            <div className='d-flex mt-4'>
                                <div className='d-flex flex-column planBox'>
                                    <h5>Escoge un plan:</h5>
                                    <SelectBox setData={setTipoPlan} elements={[[1, "2 GB de Internet"], [2, "4 GB de Internet"],
                                    [3, "7 GB de Internet"], [4, "10 GB de Internet"], [5, "20 GB de Internet"], [6, "30 GB de Internet"]]} />
                                </div>
                                <div className="card mt-3">
                                    <div className="card-body">
                                        <h5 className="card-title text-center">Detalles del Plan</h5>
                                        <hr />
                                        <ul>
                                            <li>Tipo de Plan de: <b>{tipoPlan}</b></li>
                                            <li><b>Descuento del {listadoDescuentos.find(item => item[0] == dataPA)[1]}%</b> por cambiarte de tu plan {dataPA} a Claro</li>
                                            <li>Precio de lista: <b><s>{listadoPrecios.find(item => item[0] == tipoPlan)[1]} ARS</s></b></li>
                                            <li>Precio final con descuento aplicado: <b> {listadoPrecios.find(item => item[0] == tipoPlan)[1] - (listadoPrecios.find(item => item[0] == tipoPlan)[1] *
                                                (listadoDescuentos.find(item => item[0] == dataPA)[1] / 100))} ARS</b></li>
                                        </ul>
                                        <button className="btn btn-primary w-100">Comprar</button>
                                    </div>
                                </div>
                            </div>
                        </>
                        : <></>
                }
            </div>
            <Footer />
        </>
    )
}