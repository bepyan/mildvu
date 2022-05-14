import axios, { AxiosInstance } from 'axios';

export const _axios: AxiosInstance = axios.create({
  baseURL: process.env.API_ENDPOINT,
  timeout: 10000, // 10초
});

_axios.interceptors.request.use(
  (config) => ({
    ...config,
    headers: {
      'Content-Type': 'application/json',
      ...config.headers,
    },
  }),
  (error) => {
    return Promise.reject(error);
  },
);

_axios.interceptors.response.use(
  (res) => {
    if (process.env.NODE_ENV === 'development') {
      console.groupCollapsed(`[ Fetch ${res.status} ] ${res.config.url}`);
      console.log(res.data);
      console.groupEnd();
    }
    return res;
  },
  (error) => {
    console.log(`[ Error ] ${error.message}`, error.config);
    return Promise.reject(error.response.data);
  },
);
