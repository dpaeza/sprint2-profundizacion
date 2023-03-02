import * as React from 'react';
import { useEffect, useState } from 'react'; 
import ChooseDate from './chooseDate/ChooseDate';
import ChooseFixed from './chooseFixed/ChooseFixed';
import ChoosePassengers from './choosePassengers/ChoosePassengers';
import airplane from './../../assets/icons/plane.svg';
import { NavLink } from 'react-router-dom';
import CalendarBig from './calendar/Calendar';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { getFlights } from '../../services/flights';
import moment from 'moment';
import 'moment/locale/es';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Form = () => {
    const [alignment, setAlignment] = useState('Viaje redondo'); //Estado viaje redondo..sencillo
    const [showCalendar, setShowCalendar] = useState(false); //Estado para mostrar u ocultar el calendario
    const [dateValue1, setDateValue1] = useState(format(new Date(), 'EEE, dd MMM, yyyy', { locale: es })); //Estado fecha de salida
    const [dateValue2, setDateValue2] = useState(format(new Date(new Date().setDate(new Date().getDate() + 2)), 'EEE, dd MMM, yyyy', { locale: es })); //Estado fecha de regreso
    const [flightsIda, setFlightsIda] = useState([]);
    const [flightsRegreso, setFlightsRegreso] = useState([]);
    
    //funcion para modificar el estado de viaje redondo..sencillo
    const handleAlignment = (event) => {
        const newAlignment = event.target.value;
        setAlignment(newAlignment);
    }

    //funcion para mostrar el calendario al dar click en choose date
    const handleDateClick = () => {
        setShowCalendar(true);
    }
    
    //Funcion para actualizar la fecha de salida y regreso en el form
    const datesChange = (dateSalida, dateRegreso) => {

        if (dateSalida !== null && dateSalida !== 'Fecha inválida') {
            setDateValue1(dateSalida);
        } 

        if (dateRegreso !== null && dateRegreso !== 'Fecha inválida') {
            setDateValue2(dateRegreso);
        } 
    }

    //Funcion para obtener value de ChooseFixed Origen
    const [origin, setOrigin] = useState('Bogotá')
    const originChange = (ubicationOrigin) => {
        setOrigin(ubicationOrigin)
    }

    //Funcion para obtener value de ChooseFixed Destino
    const [destini, setDestini] = useState('')
    const destiniChange = (ubicationDestini) => {
        setDestini(ubicationDestini)

    }

    //Estado value de Passengers
    const [pasajeros, setPasajeros] = useState({
        Adulto: 1,
        Niño: 0,
        Bebé: 0,
    })

    //Funcion para obtener value de Passengers
    const pasajerosChange = (passengersNumber) => {
        setPasajeros(passengersNumber)
    }

    const navigate = useNavigate();

    const formData = {
        type: alignment,
        origin: origin ,
        destination: destini ,
        departure: moment(dateValue1, 'ddd DD MMM YYYY').locale('es').format('DD/MM/YYYY').replace(/\./g, ','),
        return: moment(dateValue2, 'ddd DD MMM YYYY').locale('es').format('DD/MM/YYYY').replace(/\./g, ','),
        passengers: pasajeros
    }

    const handleSearch = (e) => {
        e.preventDefault();

        if (formData.destination === '') {
            Swal.fire('Selecciona un destino para continuar con la busqueda.')
        } else {
            searchFlights()
        }
    }

    useEffect(() => {
        localStorage.setItem("flightsIda", JSON.stringify(flightsIda));
        localStorage.setItem("flightsRegreso", JSON.stringify(flightsRegreso));
        localStorage.setItem("passengers", JSON.stringify(formData.passengers));
    }, [flightsIda, flightsRegreso, formData.passengers]);

    const searchFlights = async () => {
        if (formData.type === 'Viaje sencillo') {
            const Ida = await getFlights(formData.origin, formData.destination, formData.departure);
            if (!Ida.length) { 
                Swal.fire(`Lo sentimos, no hay vuelos para ${formData.destination} desde ${formData.origin} en la fecha seleccionada.`)
            } else {
                setFlightsIda(Ida);
                setTimeout(() => {
                    navigate('/choose');
                }, 1000);
            }
        }
        if (formData.type === 'Viaje redondo') {
            const Ida = await getFlights(formData.origin, formData.destination, formData.departure);
            const Regreso = await getFlights(formData.destination, formData.origin, formData.return);
            if (!Ida.length && Regreso.length) { 
                Swal.fire(`Lo sentimos, no hay vuelos para ${formData.destination} desde ${formData.origin} en la fecha seleccionada.`)
            }
            if (Ida.length && !Regreso.length) { 
                Swal.fire(`Lo sentimos, no hay vuelos para ${formData.origin} desde ${formData.destination} en la fecha seleccionada.`)
            }
            if (Ida.length && Regreso.length) {
                setFlightsIda(Ida);
                setFlightsRegreso(Regreso);
                setTimeout(() => {
                    navigate('/choose');
                }, 1000);
            }
        }
    }

    return (
        <>
            <form action="submit" className="form" onSubmit={(e) => { handleSearch(e) }}>
                <div className="form__div1">
                    <h1>Busca un nuevo destino y comienza la aventura.</h1>
                    <p>Descubre vuelos al mejor precio y perfectos para cualquier viaje.</p>
                    <div value={alignment}>
                        <button
                        value="Viaje redondo"
                        type='button'
                        onClick={handleAlignment}
                        className={alignment === 'Viaje redondo' ? 'selected-btn' : ''}
                        >
                        Viaje redondo
                        </button>
                        <button
                        value="Viaje sencillo"
                        type='button'
                        onClick={handleAlignment}
                        className={alignment === 'Viaje sencillo' ? 'selected-btn' : ''}
                        >
                        Viaje sencillo
                        </button>
                    </div>
                </div>
                <section className='downPart'>
                    <section className="form__div2">
                        <div className="form__div2__div">
                            <ChooseFixed cityBig='BOGOTÁ' mode='Origen' question='¿Desde dónde viajas?' originChange={originChange} />
                            <ChooseDate
                                title='Salida'
                                onClick={handleDateClick}
                                dateDefault={dateValue1}
                                datesChange={datesChange}
                            />
                            <ChoosePassengers pasajerosChange={pasajerosChange} />
                        </div>
                        <div className="form__div2__div">
                            <ChooseFixed cityBig='---' mode='Seleccione un destino' question='¿A dónde viajas?' originChange={destiniChange} />
                            <ChooseDate
                                title='Regreso'
                                onClick={handleDateClick}
                                dateDefault={dateValue2}
                            />      
                            <div className="ChoosePassengers">
                                <div className="ChoosePassengers__div1">
                                    <p className="passengers">¿Tienes un código de promoción?</p>
                                    <p className="type">-- -- -- -- </p>
                                </div>
                            </div>
                        </div>
                    </section>
                        <button type='submit' className='searchFlightsButton'>
                            <img src={airplane} alt="airplane icon" />
                            <span>Buscar Vuelos</span>
                        </button>
                </section>
            </form>
        </>
    )
}

export default Form
