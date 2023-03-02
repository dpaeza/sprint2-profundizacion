import plus from "./../../../assets/icons/plus.svg"
import minus from "./../../../assets/icons/minus.svg"
import React from "react"

const PlusMinusButtons = ({ amount, setAmount }) => {  

    const handlePlus = (e) => {
        e.preventDefault();
        setAmount(amount + 1);
    }

    const handleMinus = (e) => {
        e.preventDefault();
        if (amount !== 0) {
            setAmount(amount - 1);
        }
    }

    return (
        <div className="plusMinusButtons">
            <button><img src={minus} alt="minus icon" type="button" onClick={handleMinus}/></button>
            <p>{amount}</p>
            <button><img src={plus} alt="plus icon" type="button" onClick={handlePlus} /></button>
        </div>
    )
}

export default PlusMinusButtons