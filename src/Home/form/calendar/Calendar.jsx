import x from './../../../assets/icons/x.svg';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import * as locales from 'react-date-range/dist/locale';
import { Calendar } from 'react-date-range';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useState } from 'react';
import moment from 'moment';
import 'moment/locale/es';

const CalendarBig = ({ addMensaje }) => {

    const [date1, setDate1] = useState(null);
    const [date2, setDate2] = useState(null);
    const formattedDate1 = moment(date1).locale('es').format('ddd DD MMM YYYY').replace(/\./g, ',');
    const formattedDate2 = moment(date2).locale('es').format('ddd DD MMM YYYY').replace(/\./g, ',');
    
    return (
        <section className="calendarOverlay">
            <section className="calendar">
                <div className="calendar__div1">
                    <h1>Selecciona tus fechas</h1>
                    <i >
                        <img src={x} alt="x icon" onClick={() => addMensaje(formattedDate1, formattedDate2)}/>
                    </i>
                </div>
                <div className="calendar__div2">
                    <div>
                        <p >Fecha de salida</p>
                        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                            <Calendar
                                locale={locales['es']}
                                minDate={new Date()}
                                onChange={item => setDate1(item)}
                                date={date1}
                            />
                        </div>
                    </div>
                    <div>
                        <p>Fecha de regreso</p>
                        <div style={{ display: 'flex', flexFlow: 'column nowrap' }}>
                            <Calendar
                                onChange={item => setDate2(item)}
                                locale={locales['es']}
                                date={date2}
                                minDate={new Date()}
                            />
                        </div>
                    </div>
                </div>
                <button className="doneButton" type="button" onClick={() => addMensaje(formattedDate1, formattedDate2)}>
                Hecho
                </button>
            </section>
        </section>
    )
}

export default CalendarBig