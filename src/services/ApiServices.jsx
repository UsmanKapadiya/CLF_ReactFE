import requests from "./Api.js";

const ApiServices = {
  getAllGallery: async () => {
    return requests.get(`/gallerys`);
  },
}
export default ApiServices;
