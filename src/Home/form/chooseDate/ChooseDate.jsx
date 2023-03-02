import calendarIcon from "../../../assets/icons/calendar.svg";
import { useState } from "react";
import CalendarBig from "../calendar/Calendar";

const ChooseDate = ({ title, dateDefault, datesChange }) => {
    
    const [showCalendar, setShowCalendar] = useState(false);

    const addMensaje = (mensaje1, mensaje2) => {
        datesChange(mensaje1, mensaje2);
        setShowCalendar(!showCalendar);
    }

    const closing = () => {
        setShowCalendar(!showCalendar);
    }
    
    return (
        <>
            <div className="ChooseDate" onClick={closing}>
                <div className="ChooseDate__div1">
                    <i>
                        <img src={calendarIcon} alt="calendar icon" />
                    </i>
                </div>
                <div className="ChooseDate__div2">
                    <p className="out">{title}</p>
                    <p className="date">{dateDefault}</p>
                </div>
            </div>
            {showCalendar && <CalendarBig  addMensaje={addMensaje}/>}
        </>
    );
};

export default ChooseDate;

