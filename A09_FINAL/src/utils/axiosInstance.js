import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/movies-app",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});


axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log("Authorization Header:", config.headers.Authorization);
        } else {
            console.warn("No token found in localStorage.");
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("Response Error:", error.response.status, error.response.data);
            if (error.response.status === 401) {
                console.warn("Unauthorized! Redirecting to login...");
                localStorage.removeItem("token");
                window.location.href = "/login";
            } else if (error.response.status === 403) {
                console.warn("Forbidden! Check your permissions.");
            }
        } else {
            console.error("Network Error or Server Unreachable:", error.message);
        }
        return Promise.reject(error);
    }
);


export default axiosInstance;