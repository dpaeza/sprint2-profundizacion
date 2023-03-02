import x from '../../../assets/icons/x.svg'
import search from '../../../assets/icons/search.svg'
import { getDestinations } from '../../../services/destinations';
import { useEffect, useState } from 'react';
import * as React from 'react';


const ChooseFixed = ({ cityBig, mode, question, originChange }) => {

    const [cityValue, setCityValue] = React.useState(cityBig);
    const [focus, setFocus] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [show, setShow] = React.useState(true);

    const [listOrigins, setListOrigins] = useState([])
    
    const getData = async () => {
        const response = await getDestinations();
        setListOrigins(response)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleClose = () => {
        setShow(true);
    }

    const handleFocus = () => {
        setFocus(!focus);
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleOnClick = (city) => {
        setInputValue(city);
        originChange(city)
        setCityValue(city.toUpperCase())
        setTimeout(() => {
            setShow(true);
        }, 900);
    }

    const handleOrigen = () => {
        setShow(!show);
    }

    return (
        <>
            <section className='Choose__click' onClick={handleOrigen}>
                <p className='Choose__click__City' value={cityValue}>{cityValue}</p>
                <p className='Choose__click__Origen'>{mode}</p>
            </section>
            {!show ? 
                <section className='ChooseFixed'>
                    <div className='ChooseFixed__header'>
                        <p>{question}</p>
                        <i onClick={handleClose}><img src={x} alt="x icon" /></i>
                    </div>
                    <div className={`ChooseFixed__filter ${focus ? 'focus' : ''}`}  onClick={handleFocus}>
                        <i><img src={search} alt="search icon" /></i>
                        <input value={inputValue} onChange={handleInputChange}></input>
                    </div>
                    <div className='ChooseFixed__destinos'>
                        {listOrigins.map( (item, index) => {
                            if(item.name.toLowerCase().includes(inputValue.toLowerCase())) {
                                return (
                                    <div key={`item2-${index}`} onClick={()=>handleOnClick(item.name)}>
                                        <p className='city'>{item.name}</p>
                                        <p className='abbr'>{item.abr}</p>
                                    </div>
                                )
                            }
                            return null;
                        })}
                    </div>
                    </section>
            : <></>}
        </>
    )
}

export default ChooseFixed;
