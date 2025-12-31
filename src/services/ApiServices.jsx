import apiClient from './api';

//get news
export const getAllNews = async (page, limit) => {
    try {
        return await apiClient(`/news?page=${page}&limit=${limit}`);
    } catch (error) {
        return { success: false, error: error.message || 'Failed to fetch about list' };
    }
};

//get About
export const getAboutList = async () => {
  try {
    return await apiClient('/about');
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch about list' };
  }
};

//get Photos
export const getPhotosList = async () => {
  try {
    return await apiClient('/gallery/list-by-year');
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch about list' };
  }
};

//get Videos
export const getAllVideos = async () => {
  try {
    return await apiClient('/videos');
  } catch (error) {
    return { success: false, error: error.message || 'Failed to fetch videos' };
  }
}