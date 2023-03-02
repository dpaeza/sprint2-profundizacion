import Luggage from "../luggage/Luggage"
import { useState } from "react"
import moment from 'moment';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import 'moment/locale/es';

const Flight = ({flight, isSelected, handleFlightClick}) => {
    
    const [equipaje, setEquipaje] = useState('1 objeto personal');
    const { take_off, land, duration, base_rate, luggage: {personal_objetc, hand_luggage, big_25Kg} } = flight

    const handleEquipaje = (newEquipaje) => {
        setEquipaje(newEquipaje);
    };

    const formatCostLuggage = (cost) => cost.toLocaleString('es-ES', { style: 'decimal', minimumFractionDigits: 0 });

    return (
        <section className="flight"
            style={{ boxShadow: isSelected ? "1px 4px 8px 1px rgba(51, 41, 39, .3)" : "none" }}
            onClick={() => handleFlightClick(flight, equipaje)}
        >
            <div className="flight__div1">
                <p className="flight__div1__hour">{take_off}</p>
                <div>
                <p className="flight__div1__grey">{duration}</p>
                <div className="flight__div1__div2">
                    <div className="flight__div1__circle"></div>
                    <hr />
                    <div className="flight__div1__circle"></div>
                </div>
                <p className="flight__div1__grey">Sin escalas</p>
                </div>
                <p className="flight__div1__hour">{land}</p>
            </div>
            <div className="flight__luggage">
                <Luggage
                type="1 objeto personal"
                price={`$ ${formatCostLuggage(base_rate + personal_objetc)} COP`}
                onClick={() => handleEquipaje('1 objeto personal')}
                active={equipaje === '1 objeto personal'}
                />
                <Luggage
                type="Equipaje de mano"
                price={`$ ${formatCostLuggage(base_rate + hand_luggage)} COP`}
                onClick={() => handleEquipaje('Equipaje de mano')}
                active={equipaje === 'Equipaje de mano'}
                />
                <Luggage
                type="Equipaje 25Kg"
                price={`$ ${formatCostLuggage(base_rate + big_25Kg)} COP`}
                onClick={() => handleEquipaje('Equipaje 25Kg')}
                active={equipaje === 'Equipaje 25Kg'}
                />
            </div>
        </section>
    );
};

export default Flight;

