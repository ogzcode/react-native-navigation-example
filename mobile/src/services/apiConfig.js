import axios from "axios";
import { getToken, removeToken, setToken } from "./tokenServices";


export const request = axios.create({
    baseURL: "http://localhost:3000",
});


export const setupInterceptors = () => {
    request.interceptors.request.use(
        async (config) => {
            const token = await getToken();
            if (token) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    request.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response.status === 401) {
                await removeToken();
            }
            return Promise.reject(error);
        }
    );
}
