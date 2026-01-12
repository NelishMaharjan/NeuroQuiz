import axios from "axios";

const ApiFormData = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    withCredentials: true,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
}); 


const API = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000',
    headers: {
        "Content-Type": "application/json",
    },
});

// LOGIN API
export const loginUserApi = (data) => API.post("/api/user/login", data);
// REGISTER API
export const createUserApi = (data) => API.post("/api/user/register", data);


export default API;
