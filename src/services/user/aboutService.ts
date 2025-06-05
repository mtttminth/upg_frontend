import api from './api';

const getPolicyMission = async () => {
  return api
    .get(`/user/about-us-page/get-policy-and-mission`)
    .then(response => response.data);
}

const getOurCommitments = async () => {
  return api
    .get(`/user/about-us-page/get-our-commitments`)
    .then(response => response.data);
}

const getOrganization = async () => {
  return api
    .get(`/user/about-us-page/get-company-organization-structure`)
    .then(response => response.data);
}

const getCompanyProfileVideo = async () => {
  return api
    .get(`/user/about-us-page/get-company-profile-and-video`)
    .then(response => response.data);
}

export default {
  getPolicyMission,
  getOurCommitments,
  getOrganization,
  getCompanyProfileVideo
}