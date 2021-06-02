import Axios, { AxiosAdapter } from 'axios';
import { cacheAdapterEnhancer } from 'axios-extensions';

const config = {
  baseURL: process.env.NODE_ENV === "development" ? "http://localhost:5000" : "https://soojeonghan.shop",
  headers: { 'Cache-Control': 'max-age=31536000' },
  withCredentials: true,
}

const defaultAdapter: AxiosAdapter | undefined = Axios.defaults.adapter;
if (defaultAdapter) {
  Object.assign(config, { adapter: cacheAdapterEnhancer(defaultAdapter) })
}

const axios = Axios.create(config);

export default axios;
