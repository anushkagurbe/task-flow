import axios from "axios";

export let AUTH_API = axios.create({
    baseURL: "http://localhost:8080/api/v1/auth"
});

