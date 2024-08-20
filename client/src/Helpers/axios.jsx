import axios from "axios";

const BASEURL="https://ecova.onrender.com/api/v1";

const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=BASEURL;
axiosInstance.defaults.withCredentials=true;

export default axiosInstance;
