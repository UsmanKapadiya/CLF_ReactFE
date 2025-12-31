// import requests from "./Api.js";

// const ApiServices = {
//    getAllNews: async (page, limit) => {
//     return requests.get(`/news?page=${page}&limit=${limit}`);
//   },

//   getAllGallery: async () => {
//     return requests.get(`/gallerys`);
//   },
// }
// export default ApiServices;
import apiClient from './api';

export const getAllNews = async (page, limit) => {
    try {
        return await apiClient(`/news?page=${page}&limit=${limit}`);
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch about list' };
    }
};