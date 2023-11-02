import { request } from "./apiConfig";

export const login = async (username, password) => {
    try {
        const response = await request.post("/login", {
            username,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const register = async (email, password) => {
    try {
        const response = await request.post("/register", {
            email,
            password,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getProfile = async () => {
    try {
        const response = await request.get("/getProfile");
        return response.data;
    } catch (error) {
        throw error;
    }
}
