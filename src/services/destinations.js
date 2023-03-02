import axios from "axios";
import endpoints from "./endpoints";

export const getDestinations = async () => {
    try {
        const { data } = await axios.get(`${endpoints.destinations}`)
        return data
    } catch (error) {
        console.log(error);
        return {}
    }
}