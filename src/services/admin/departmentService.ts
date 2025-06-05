import { DepartmentCreateBody, DepartmentParam } from '@/types/department';
import api from './api';
import { formatDate } from '@/utils/common';

const getDepartmentList = async (params: DepartmentParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/departments', {params: formattedParams})
    .then(response => response.data);
}

const createDepartment = async (formData: DepartmentCreateBody) => {
  return api
    .post('/admin/departments', formData)
    .then(response => response.data);
}

const getDetailDepartment = async (id: number) => {
  return api
    .get(`/admin/departments/${id}`)
    .then(response => response.data);
}

const editDepartment = async (id: number, formData: DepartmentCreateBody) => {
  return api
    .put(`/admin/departments/${id}`, formData)
    .then(response => response.data);
}

const deleteDepartment = async (id: number) => {
  return api
    .delete(`/admin/departments/${id}`)
    .then(response => response.data);
}

export default {
  getDepartmentList,
  createDepartment,
  getDetailDepartment,
  editDepartment,
  deleteDepartment,
}