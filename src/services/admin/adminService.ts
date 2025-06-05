import { AdminCreateBody, AdminParam } from '@/types/admin';
import api from './api';
import { formatDate } from '@/utils/common';

const getAdminList = async (params: AdminParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/admins', {params: formattedParams})
    .then(response => response.data);
}

const createAdmin = async (formData: AdminCreateBody) => {
  return api
    .post('/admin/admins', formData)
    .then(response => response.data);
}

const getDetailAdmin = async (id: number) => {
  return api
    .get(`/admin/admins/${id}`)
    .then(response => response.data);
}

const editAdmin = async (id: number, formData: AdminCreateBody) => {
  return api
    .put(`/admin/admins/${id}`, formData)
    .then(response => response.data);
}

const deleteAdmin = async (id: number) => {
  return api
    .delete(`/admin/admins/${id}`)
    .then(response => response.data);
}

export default {
  getAdminList,
  createAdmin,
  getDetailAdmin,
  editAdmin,
  deleteAdmin,
}