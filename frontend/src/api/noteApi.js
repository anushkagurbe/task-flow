import axios from "axios";

export let NOTE_API = axios.create({
    baseURL: "http://localhost:8080/api/v1/notes",
    headers: {
        "Content-Type": "application/json"
    }
})