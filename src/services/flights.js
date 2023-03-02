import axios from "axios";
import endpoints from "./endpoints";

export const getFlights = async (origen, destino, fecha) => {
    try {
        const { data } = await axios.get(`${endpoints.flights}?origin=${origen}&destination=${destino}&date=${fecha}`)
        return data 
    } catch (error) {
        console.log(error);
        return {}
    }
}

export const getAuthorLogin = async (user, password) => {
    try {
        const { data } = await axios.get(`${endpoints.authors}?user=${user}&password=${password}`)
        return data
    } catch (error) {
        console.log(error);
        return {}
    }
}