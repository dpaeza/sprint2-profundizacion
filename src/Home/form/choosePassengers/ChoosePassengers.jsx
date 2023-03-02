import React from "react"
import PassengerCategory from "../passengerCategory/PassengerCategory"
import PlusMinusButtons from "../plusMinusButtons/PlusMinusButtons"
import arrowDown from "./../../../assets/icons/chevron-down.svg"

const ChoosePassengers = ({pasajerosChange}) => {
    const [type, setType] = React.useState('1 Adulto');
    const [passengers, setPassengers] = React.useState({
        Adulto: 1,
        Niño: 0,
        Bebé: 0,
    });
    const [showPassengers, setShowPassengers] = React.useState(true)
    
    const handlePassengers = () => {
        let pass = '';
        let ps = '';
        for (let propiedad in passengers) {
            if (passengers[propiedad] !== 0) {
                if (passengers[propiedad] > 1) {
                    ps = `${passengers[propiedad]} ${propiedad}s `
                } else {
                    ps = `${passengers[propiedad]} ${propiedad} `
                }
                pass +=  ps;
            }
        }
        setShowPassengers(!showPassengers);
        setType(`${pass}`);
        pasajerosChange(passengers);
    }

    return (
        <>
            <div className="ChoosePassengers" >
                <div className="ChoosePassengers__div1">
                    <p className="passengers">Pasajeros</p>
                    <p className="type">{type}</p>
                </div>
                <div className="ChoosePassengers__div2">
                    <i><img src={arrowDown} alt="arrow icon" onClick={handlePassengers}/></i>
                </div>
            </div>
            {!showPassengers ? 
                <section className="choosePassengersFixed">
                    <div className="choosePassengersFixed__category">
                        <PassengerCategory category="Adultos" range="(13 + años)" onClick={() => setPassengers({...passengers, Adulto: passengers.Adulto + 1})} />
                        <PassengerCategory category="Niños" range="(2 - 12 años)" onClick={() => setPassengers({...passengers, Niño: passengers.Niño + 1})} />
                        <PassengerCategory category="Bebés" range="(0 - 23 meses)" onClick={() => setPassengers({...passengers, Bebé: passengers.Bebé + 1})}/>
                    </div>
                    <div className="choosePassengersFixed__plusMinusButtons">
                        <PlusMinusButtons amount={passengers.Adulto} setAmount={(amount) => setPassengers({...passengers, Adulto: amount})} />
                        <PlusMinusButtons amount={passengers.Niño} setAmount={(amount) => setPassengers({...passengers, Niño: amount})} />
                        <PlusMinusButtons amount={passengers.Bebé} setAmount={(amount) => setPassengers({...passengers, Bebé: amount})} />
                    </div>
                </section>
                : <></>
            }
        </>
    )
}

export default ChoosePassengers