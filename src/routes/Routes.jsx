import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './../App'
import ChooseFlight from '../components/ChooseFlight/ChooseFlight'
import ChooseSeat from '../components/chooseSeat/ChooseSeat'
import PaymentForm from '../components/paymentForm/PaymentForm'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path='/choose' element={<ChooseFlight />} />
                <Route path='/seats' element={<ChooseSeat />} />
                <Route path='/payment' element={<PaymentForm/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router