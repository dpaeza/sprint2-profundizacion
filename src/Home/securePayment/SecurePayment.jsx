import amex from '../../assets/icons/Amex.svg'
import payPal from '../../assets/icons/paypal.svg'
import invex from '../../assets/icons/banco.jpg'
import masterCard from '../../assets/icons/Mastercard.svg'
import visa from '../../assets/icons/Visa.svg'
import oxxo from '../../assets/icons/oxxo.svg'
import seveneEleven from '../../assets/icons/7-eleven.svg'
import walmart from '../../assets/icons/walmart.svg'
import farmacias from '../../assets/icons/farmacias.svg'

const SecurePayment = () => {

    const arrayPaymentMethods1 = [amex, payPal, invex, masterCard, visa];
    const arrayPaymentMethods2 = [oxxo, seveneEleven, walmart, farmacias];

    return (
        <section className="securePayment">
            <h2>Pago Seguro</h2>
            <section>
                <div>
                    <p>Tarjeta de crédito, tarjeta de débito y pago electrónico</p>
                    <div className='paymentMethods'>
                        {arrayPaymentMethods1.map((method, index) => (
                            <figure  key={`method1-${index}`}><img src={method} alt="pay method image" /></figure>
                        ))}
                    </div>
                </div>
                <div>
                    <p>Efectivo en cualquiera de las sucursales participantes</p>
                    <div className='paymentMethods'>
                        {arrayPaymentMethods2.map((method, index) => (
                            <figure  key={`method2-${index}`}><img src={method} alt="pay method image" /></figure>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}

export default SecurePayment