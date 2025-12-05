import axios from 'axios';

// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_TIMEOUT = 30000;

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Response Interceptor for error handling
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error('Network error:', error.message);
    }
    return Promise.reject(error);
  }
);

const responseBody = (response) => response.data;

const requests = {
  get: (url, params, headers) =>
    instance.get(url, { params, headers }).then(responseBody),

  post: (url, body) => instance.post(url, body).then(responseBody),

  put: (url, body) => instance.put(url, body).then(responseBody),

  patch: (url, body) => instance.patch(url, body).then(responseBody),

  delete: (url, body) =>
    instance.delete(url, { data: body }).then(responseBody),

  upload: (url, formData) =>
    instance.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(responseBody),
};

export default requests;