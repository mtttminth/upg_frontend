import api from './api';

const getBanner = async () => {
  return api
    .get(`/user/home-page/get-banner`)
    .then(response => response.data);
}

const getRelease = async () => {
  return api
    .get(`/user/home-page/get-releases`)
    .then(response => response.data);
}

const getResources = async () => {
  return api
    .get(`/user/home-page/get-resources`)
    .then(response => response.data);
}

const getDashboardOverview = async () => {
  return api
    .get(`/user/home-page/get-dashboard-overview`)
    .then(response => response.data);
}

export default {
  getBanner,
  getRelease,
  getResources,
  getDashboardOverview,
}