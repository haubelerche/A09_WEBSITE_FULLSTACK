import axiosInstance from '../utils/axiosInstance.js';
import { loginFailure, loginStart, loginSuccess } from "./AuthAction.js";


export const login = async (user, dispatch) => {
    dispatch(loginStart());
    try {

        const res = await axiosInstance.post("/login", user);


        const { token, ...userData } = res.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));


        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.error("Login failed:", err);
        dispatch(loginFailure());
    }
};


export const register = async (user) => {
    try {

        const res = await axiosInstance.post("/register", user);
        return res.data;
    } catch (err) {
        console.error("Register failed:", err.response?.data || err.message);
        throw err;
    }
};

