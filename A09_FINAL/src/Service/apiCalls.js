import axiosInstance from '../utils/axiosInstance.js';
import { loginFailure, loginStart, loginSuccess, logout } from "./AuthAction.js";
import axios from "axios";

// API Đăng nhập
export const login = async (user, dispatch) => {
    dispatch(loginStart()); // Bắt đầu trạng thái đăng nhập
    try {
        // Gửi request đăng nhập tới backend
        const res = await axiosInstance.post("/login", user);

        // Lưu token và thông tin người dùng vào LocalStorage
        const { token, ...userData } = res.data;
        localStorage.setItem("token", token); // Lưu token riêng
        localStorage.setItem("user", JSON.stringify(userData)); // Lưu thông tin người dùng

        // Cập nhật state trong Context
        dispatch(loginSuccess(res.data));
    } catch (err) {
        console.error("Login failed:", err);
        dispatch(loginFailure());
    }
};

// API Đăng ký
export const register = async (user) => {
    try {
        // Gửi request đăng ký tới backend
        const res = await axiosInstance.post("/register", user);
        return res.data; // Trả về kết quả để xử lý thêm nếu cần
    } catch (err) {
        console.error("Register failed:", err.response?.data || err.message);
        throw err; // Quăng lỗi ra ngoài để xử lý
    }
};

