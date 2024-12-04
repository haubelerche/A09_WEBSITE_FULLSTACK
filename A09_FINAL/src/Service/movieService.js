import axiosInstance from "../utils/axiosInstance.js";


const handleRequest = async (request, errorMessage) => {
    try {
        const response = await request;
        return response.data;
    } catch (error) {
        console.error(`${errorMessage}:`, error.response?.data || error.message);
        throw error;
    }
};



export const getFilm = async () => {
    try {
        const response = await axiosInstance.get("/film");
        return response.data;
    } catch (error) {
        console.error("Error fetching films:", error);
        throw error;
    }
};


export const getSeries = async () => {
    try {
        const response = await axiosInstance.get("/series");
        return response.data;
    } catch (error) {
        console.error("Error fetching series:", error);
        throw error;
    }
};