import axios from "axios";
import endpoints from "./endpoints";

export const postPassengers = async (obj) => {
    try {
        const response = await axios.post(endpoints.passengers, obj)
        return response.status === 200 ? true : false;
    } catch (error) {
        console.log(error);
        return {}
    }
}
