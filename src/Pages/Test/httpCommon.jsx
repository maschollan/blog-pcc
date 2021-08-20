import axios from "axios";

export const http =  axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        "Content-type": "application/json"
    }
});

export const httpfile = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
        "Content-type": "multipart/form-data"
    }
});

