import api from './api';
import { CreateAboutBody } from '@/types/about';

const getDetailAbout = async () => {
  return api
    .get(`/admin/about-us`)
    .then(response => response.data);
}

const editAbout = async (id: number, formData: CreateAboutBody) => {
  return api
    .put(`/admin/about-us/${id}/update`, formData)
    .then(response => response.data);
}

export default {
  getDetailAbout,
  editAbout,
}