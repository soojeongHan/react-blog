import Axios from 'axios';

const config = {
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://soojeonghan.shop",
  withCredentials: true,
}
const axios = Axios.create(config);

export default axios;
