import axios from "axios";

export let NOTE_API = axios.create({
    baseURL: import.meta.env.VITE_NOTE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})