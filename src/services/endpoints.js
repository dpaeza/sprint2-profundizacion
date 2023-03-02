const BASE_URL_API = process.env.REACT_APP_URL_API;

const endpoints = {
    flights: `${BASE_URL_API}flights`,
    destinations: `${BASE_URL_API}destinations`,
    passengers: `${BASE_URL_API}passengers`
};

export default endpoints;