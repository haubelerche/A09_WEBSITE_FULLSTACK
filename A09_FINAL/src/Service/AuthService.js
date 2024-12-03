import axiosInstance from "../utils/axiosInstance.js";

// Register User
export const register = async (name, email, password) => {
    try {
        const response = await axiosInstance.post("/register", {
            name,
            email,
            password,
        });
        return response.data;
    } catch (err) {
        console.error("Register failed:", err.response?.data || err.message);
        throw err;
    }
};

// Login User
export const login = async (email, password) => {
    try {
        const response = await axiosInstance.post("/login", {
            email,
            password,
        });
        if (response.data && response.data.token) {
            // Save token in LocalStorage
            localStorage.setItem("token", response.data.token);
        }
        return response.data;
    } catch (err) {
        console.error("Login failed:", err.response?.data || err.message);
        throw err;
    }
};

