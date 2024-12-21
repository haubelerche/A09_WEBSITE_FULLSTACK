import axiosInstance from "../utils/axiosInstance.js";
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