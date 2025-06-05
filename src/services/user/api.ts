import axios from "axios";
import tokenService from "../tokenService";
import { USER } from "@/consts/common";
import { redirect } from 'next/navigation';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = tokenService.getAccessToken(USER);
    if(accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config.url;
      console.log('requestUrl,', requestUrl)
      if (requestUrl !== '/user-login') {
        // redirect to login screen
        await tokenService.resetToken(USER);
        redirect('/login')
        return Promise.resolve();
      }
    }
    // redirect to common error screen
    return Promise.reject(error);
  }
)

export default instance;