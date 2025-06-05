import { CreateProfileBody } from '@/types/profile';
import api from './api';

const getDetailProfile = async () => {
  return api
    .get(`/profile`)
    .then(response => response.data);
}

const editProfile = async (formData: CreateProfileBody) => {
  return api
    .put(`/profile/update`, formData)
    .then(response => response.data);
}

export default {
  getDetailProfile,
  editProfile,
}