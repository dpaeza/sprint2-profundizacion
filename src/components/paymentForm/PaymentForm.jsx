import useForm from './../../hooks/useForm'
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { postPassengers } from '../../services/passengers';
import { useNavigate } from 'react-router-dom';


const PaymentForm = () => {

    const [selectedValue, setSelectedValue] = useState('');
    const [passengersValue, setPassengersValue] = useState(0);
    const [formPayData, setFormPayData] = useState([]);
    const [flightsIda, setFlightsIda] = useState([]);
    const [flightsRegreso, setFlightsRegreso] = useState([]);
    const navigate = useNavigate();

    const handleSelectChange = (event) => {
        setSelectedValue(event.target.value)
    }


    const createPassengersArray = (passengersValue) => {
        const passengersArray = [];
        for (let i = 0; i < passengersValue; i++) {
            passengersArray.push({
                number: `pasajero ${i+1}`,
                name: '',
                last_name: '',
                document_type: '',
                document_number: '',
            });
        }
        setFormPayData(passengersArray);
    }

    useEffect(() => {
        const passengersSelected = localStorage.getItem("passengers");
        const passengersSelectedParse = JSON.parse(passengersSelected);
        const totalPassengers = passengersSelectedParse.Adulto + passengersSelectedParse.Niño;

        setPassengersValue(totalPassengers);
        createPassengersArray(totalPassengers);
    }, [])
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        const number = event.target.dataset.id;
        const index = formPayData.findIndex(item => item.number === number);
        const updatedPassenger = { ...formPayData[index], [name]: value };
        const updatedData = [...formPayData.slice(0, index), updatedPassenger, ...formPayData.slice(index + 1)];
        setFormPayData(updatedData);
    };

    const handlePagar = (e) => {
        e.preventDefault();
        formPayData.map((item) => {
            if (item.name === '' || item.last_name === '' || item.document_type === '' || item.document_number === '' || selectedValue=== '') {
                Swal.fire('Diligencie todos los campos para continuar con la compra.')
            } else if (item.document_type !== "CC" && item.document_type !== "TI"  && item.document_type !== "CE" && item.document_type !== "PA" && item.document_type !== ''){
                Swal.fire('Tipo de documento no valido.')
            } else {
                postNewPassenger()
            }
        })
    }

    const postNewPassenger =  async () => {
        try {
            const promises = formPayData.map(async (element) => {
                const result = await postPassengers(element);
                return result;
            });
            const results = await Promise.all(promises);
            Swal.fire('Su compra se ha realizado con exito bajo el número de reserva 5689.')
            navigate('/')
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <section className='paymentForm'>
            <h1>Formulario de Pago</h1>
            <form action="submit" onSubmit={(e) => { handlePagar(e) }}>
                {formPayData.map((item, index) => (
                    <div key={index}>
                        <p>{`Pasajero ${item.number}`}</p>
                        <label>Nombre</label>
                        <input
                            type="text"
                            placeholder='Igual que en el documento de identidad'
                            value={formPayData[index].name}
                            // name={`name${item.number}`}
                            name="name"
                            data-id={item.number}
                            onChange={(e) => { handleChange(e) }}
                        />
                        <label>Apellidos</label>
                        <input
                            type="text"
                            placeholder='Igual que en el documento de identidad'
                            value={formPayData[index].last_name}
                            data-id={item.number}
                            name="last_name"
                            onChange={(e) => { handleChange(e) }}  />
                        <label>Tipo de documento</label>
                        <input
                            type="text"
                            placeholder='CC, TI, CE o PA'
                            value={formPayData[index].document_type}
                            data-id={item.number}
                            name="document_type"
                            onChange={(e) => { handleChange(e) }}  />
                        <label>Número de documento </label>
                        <input
                            type="number"
                            value={formPayData[index].document_number}
                            data-id={item.number}
                            onChange={(e) => { handleChange(e) }}
                            name="document_number"
                        />
                    </div>
                ))}
                <label>Metodo de Pago</label>
                <select id="my-select" value={selectedValue} onChange={handleSelectChange}>
                    <option value="">-- Elige una opción --</option>
                    <option value="Tarjeta de crédito">Tarjeta de crédito</option>
                    <option value="Efectivo">Efectivo</option>
                    <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                    <option value="PSE">PSE</option>
                </select>
                <button type='submit'>Pagar</button>
            </form>
        </section>
    )
}

export default PaymentForm