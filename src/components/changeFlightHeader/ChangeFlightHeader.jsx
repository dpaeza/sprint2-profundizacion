import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Flight from "../flight/Flight";
import moment from 'moment';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import 'moment/locale/es';

const ChangeFlightHeader = ({ title, flightType, handleChooseFlightIda}) => {
    
    const [array, setArray] = useState([]);
    const [selectedFlight, setSelectedFlight] = useState({});

    useEffect(() => {
        const arrayData = localStorage.getItem(flightType);

        if (arrayData) {
            setArray(JSON.parse(arrayData));
        }
    }, [])

    const handleFlightClick = (item, luggage) => {
        setSelectedFlight(item);
        handleChooseFlightIda(item, luggage);
    };
    
    return (
        <section className="changeFlight">
            <section className="changeFlightHeader">
                <h1>{title}</h1>
                <NavLink to='/' className="navLink">
                    <button className="changeFlightButton">Cambiar Vuelo</button>
                </NavLink>
            </section>
            {array.length !== 0 ?
                <>
                    <p className="changeFlight__date">{moment(array[0].date, 'DD/MM/YYYY').format('dddd D MMM YYYY').replace(/\./g, '')}</p>
                    <p className="changeFlight__destination">{array[0].origin} a {array[0].destination}</p>
                    <p className="changeFlight__selectTittle">Seleccion de horarios y equipajes</p>
                    <div className="changeFlight__div">
                        {array.map((item) => (<Flight
                            key={item.id}
                            flight={item}
                            isSelected={item === selectedFlight}
                            handleFlightClick={handleFlightClick}
                        />))}
                    </div>
                </>
                : <></>}
        </section>
    )
}

export default ChangeFlightHeader