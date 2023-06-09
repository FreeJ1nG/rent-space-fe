import axios from "axios";

const axiosApi = axios.create({
  baseURL:
    "http://34.128.87.105/api/v1",
});

export default axiosApi;
