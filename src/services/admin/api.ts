import axios from "axios";
import tokenService from "../tokenService";
import { ADMIN } from "@/consts/common";
import { redirect } from 'next/navigation';

const instance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

instance.interceptors.request.use(
  async (config) => {
    const accessToken = await tokenService.getAccessToken(ADMIN);
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
      if (requestUrl !== '/admin-login') {
        // redirect to login screen
        await tokenService.resetToken(ADMIN);
        redirect('/admin/login')
        return Promise.resolve();
      }
    }
    // redirect to common error screen
    return Promise.reject(error);
  }
)

export default instance;