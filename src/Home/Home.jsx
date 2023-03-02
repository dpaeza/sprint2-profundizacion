import Form from "./form/Form"
import airPlaneImg from "../assets/images/airplane.jpg"
import SecurePayment from "./securePayment/SecurePayment"
import AvailableServices from "./availableServices/AvailableServices"

const Home = () => {

    return (
        <section className="home">
            <figure><img src={airPlaneImg} alt="imagen avion" className="imgAirplane"/></figure>
            <Form className="form" />
            <div className="div">
                <SecurePayment />
                <AvailableServices />
            </div>
        </section>
    )
}

export default Home