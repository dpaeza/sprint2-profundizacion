import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ChangeFlightHeader from "../changeFlightHeader/ChangeFlightHeader";
import moment from 'moment';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import 'moment/locale/es';

const ChooseFlight = () => {

    const [flightsIda, setFlightsIda] = useState([]);
    const [flightsRegreso, setFlightsRegreso] = useState([]);
    const [arrayPassengers, setArrayPassengers] = useState({});
    const [chooseFlightIda, setChooseFlightIda] = useState({});
    const [chooseFlightRegreso, setChooseFlightRegreso] = useState({});
    const [costFlightIda, setCostFlightIda] = useState(0);
    const [costFlightRegreso, setCostFlightRegreso] = useState(0);
    const [equipajeIda, setEquipajeIda] = useState(0);
    const [equipajeRegreso, setEquipajeRegreso] = useState(0);
    const [payingPassengers, SetpayingPassengers] = useState(0);
    const IVA = 0.19;

    useEffect(() => {
        const flightsIdaData = localStorage.getItem("flightsIda");
        const flightsRegresoData = localStorage.getItem("flightsRegreso");
        const passengersSelected = localStorage.getItem("passengers");

        if (flightsIdaData) {
            setFlightsIda(JSON.parse(flightsIdaData));
        }

        if (flightsRegresoData) {
            setFlightsRegreso(JSON.parse(flightsRegresoData));
        }

        const payingPassengersParse = JSON.parse(passengersSelected);
        setArrayPassengers(JSON.parse(passengersSelected));
        SetpayingPassengers(payingPassengersParse.Adulto + payingPassengersParse.Niño);

    }, [])

    const handleChooseFlightIda = (item, equipajeI) => {
        setChooseFlightIda(item);
        setCostFlightIda(item.base_rate);
        switch (equipajeI) {
            case '1 objeto personal':
                setEquipajeIda(item.luggage.personal_objetc);
                break;
            case 'Equipaje de mano':
                setEquipajeIda(item.luggage.hand_luggage);
                break;
            case 'Equipaje 25Kg':
                setEquipajeIda(item.luggage.big_25Kg);
                break;
        }
    }

    const handleChooseFlightRegreso = (obj, equipajeR) => {
        setChooseFlightRegreso(obj);
        setCostFlightRegreso(obj.base_rate);
        switch (equipajeR) {
            case '1 objeto personal':
                setEquipajeRegreso(obj.luggage.personal_objetc);
                break;
            case 'Equipaje de mano':
                setEquipajeRegreso(obj.luggage.hand_luggage);
                break;
            case 'Equipaje 25Kg':
                setEquipajeRegreso(obj.luggage.big_25Kg);
                break;
        }
    }

    const propertyEmpty = (property) => {
        if (property !== 0) {
            return true
        } else {
            return false
        }
    }

    const formatDate3 = (date) => moment(date, 'DD/MM/YYYY').format('dddd, D MMMM, YYYY').replace(/\./g, '')

    const formatCostLuggage2 = (cost) => cost.toLocaleString('es-ES', { style: 'decimal', minimumFractionDigits: 0 });

    return (
        <section className="ChooseFlight">
            <div className="ChooseFlight__div">
                {flightsIda.length !== 0 ? 
                    <ChangeFlightHeader title='Vuelo de salida' flightType='flightsIda' handleChooseFlightIda={handleChooseFlightIda} />
                    : <></>
                }
                {flightsRegreso.length !== 0 ? 
                        <ChangeFlightHeader title='Vuelo de regreso' flightType='flightsRegreso' handleChooseFlightIda={handleChooseFlightRegreso}/>
                    : <></>
                }
            </div>
            {Object.entries(chooseFlightIda).length !== 0 || Object.entries(chooseFlightRegreso).length !== 0 ? 
                <aside>
                    {Object.entries(chooseFlightIda).length !== 0 || Object.entries(chooseFlightRegreso).length !== 0 ? 
                        <section className="section">
                            <div className="tittle">
                                <p>Tu reservación</p>
                            </div>
                            <div className="body">
                                <div className="body__passengers">
                                    <p>Pasajeros</p>
                                    <div>
                                        {propertyEmpty(arrayPassengers.Adulto) ? <p className="body__passengers__left">{arrayPassengers.Adulto} Adulto/s</p> : <></>}
                                        {propertyEmpty(arrayPassengers.Niño) ? <p className="body__passengers__left">{arrayPassengers.Niño} Niño/s</p> : <></>}
                                        { propertyEmpty(arrayPassengers.Bebé) ? <p className="body__passengers__left">{arrayPassengers.Bebé} Niño/s</p> : <></>}
                                    </div>
                                </div>
                                <div className="body__flight">
                                    {Object.entries(chooseFlightIda).length !== 0 ? 
                                        <div className="body__flight">
                                            <p className="body__vueloSalida">Vuelo de salida</p>
                                            <div className="body__citysContainer">
                                                <div>
                                                    <p className="body__citysContainer__city">{chooseFlightIda.origin_abr}</p>
                                                    <p className="body__citysContainer__hour">{chooseFlightIda.take_off}</p>
                                                </div>
                                                <hr />
                                                <div>
                                                    <p className="body__citysContainer__city">{chooseFlightIda.destination_abr}</p>
                                                    <p className="body__citysContainer__hour">{chooseFlightIda.land}</p>
                                                </div>
                                            </div>
                                            <p className="body__date">{formatDate3(chooseFlightIda.date)}</p> 
                                        </div>        
                                        : <></>
                                    }
                                    {Object.entries(chooseFlightRegreso).length !== 0 ?  
                                        <div className="body__flight">
                                            <p className="body__vueloSalida">Vuelo de regreso</p>
                                            <div className="body__citysContainer">
                                                <div>
                                                    <p className="body__citysContainer__city">{chooseFlightRegreso.origin_abr}</p>
                                                    <p className="body__citysContainer__hour">{chooseFlightRegreso.take_off}</p>
                                                </div>
                                                <hr />
                                                <div>
                                                    <p className="body__citysContainer__city">{chooseFlightRegreso.destination_abr}</p>
                                                    <p className="body__citysContainer__hour">{chooseFlightRegreso.land}</p>
                                                </div>
                                            </div>
                                            <p className="body__date">{formatDate3(chooseFlightRegreso.date)}</p>
                                        </div>
                                        : <></>
                                    }
                                </div>
                            </div>
                        </section>
                    : <></>
                    }
                    {Object.entries(chooseFlightIda).length !== 0 ? 
                        <section className="section">
                            <div className="tittle">
                                <p>Costo de vuelo</p>
                            </div>
                            <div className="body gap">
                                <div className="body__grey">
                                    <p>Tarifa base</p>
                                    <p>{`$${formatCostLuggage2((costFlightIda + costFlightRegreso + equipajeIda + equipajeRegreso) - ((costFlightIda + costFlightRegreso + equipajeIda + equipajeRegreso)*IVA))} COP`}</p>
                                </div>
                                <div className="body__grey">
                                    <p>IVA Tarifa</p>
                                    <p>{`$${formatCostLuggage2((costFlightIda + costFlightRegreso + equipajeIda + equipajeRegreso)*IVA)} COP`}</p>
                                </div>
                                {payingPassengers > 1 ? 
                                    <div className="body__grey">
                                        <p>Total/persona</p>
                                        <p>{`$${formatCostLuggage2(costFlightIda + costFlightRegreso + equipajeIda + equipajeRegreso)} COP`}</p>
                                    </div>
                                    : <></>
                                }
                                <div className="body__black">
                                    <p>Total</p>
                                    <p>{`$${formatCostLuggage2((costFlightIda + costFlightRegreso + equipajeIda + equipajeRegreso)*payingPassengers)} COP`}</p>
                                </div>
                            </div>
                        </section>
                        : <></>
                    }
                    {Object.entries(chooseFlightIda).length !== 0 && Object.entries(chooseFlightRegreso).length !== 0 ? 
                        <NavLink to='/payment'>
                            <button>Seleccionar asientos</button>
                        </NavLink>
                        :<></>
                    }
                </aside>                
                :<></>
            }

        </section>
    )
}

export default ChooseFlight