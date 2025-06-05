import { CreateBannerBody } from '@/types/banner';
import api from './api';

const getDetailBanner = async () => {
  return api
    .get(`/admin/banner`)
    .then(response => response.data);
}

const editBanner = async (id: number, formData: CreateBannerBody) => {
  return api
    .put(`/admin/banner/${id}/update`, formData)
    .then(response => response.data);
}

export default {
  getDetailBanner,
  editBanner,
}