import { RoleCreateBody, RoleParam } from '@/types/role';
import api from './api';
import { formatDate } from '@/utils/common';

const getRoleList = async (params: RoleParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/roles', {params: formattedParams})
    .then(response => response.data);
}

const createRole = async (formData: RoleCreateBody) => {
  return api
    .post('/admin/roles', formData)
    .then(response => response.data);
}

const getDetailRole = async (id: number) => {
  return api
    .get(`/admin/roles/${id}`)
    .then(response => response.data);
}

const editRole = async (id: number, formData: RoleCreateBody) => {
  return api
    .put(`/admin/roles/${id}`, formData)
    .then(response => response.data);
}

const deleteRole = async (id: number) => {
  return api
    .delete(`/admin/roles/${id}`)
    .then(response => response.data);
}

export default {
  getRoleList,
  createRole,
  getDetailRole,
  editRole,
  deleteRole,
}