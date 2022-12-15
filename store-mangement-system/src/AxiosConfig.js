import axios from "axios";

const Axios = axios.create({
    baseURL: "http://localhost:8085",
    headers: {
        "Content-Type": 'application/json',
    },
})

export { Axios }