import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    "https://adpro.rnb.freejing.com/api/v1",
});

export default axiosApi;
