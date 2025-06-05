import { DepartmentFilterParam, GroupCreateBody, GroupParam } from '@/types/group';
import api from './api';
import { formatDate } from '@/utils/common';

const getAllGroupList = async () => {
  return api
    .get('/admin/get-groups')
    .then(response => response.data);
}

const getGroupList = async (params: GroupParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/groups', {params: formattedParams})
    .then(response => response.data);
}

const createGroup = async (formData: GroupCreateBody) => {
  return api
    .post('/admin/groups', formData)
    .then(response => response.data);
}

const getDetailGroup = async (id: number) => {
  return api
    .get(`/admin/groups/${id}`)
    .then(response => response.data);
}

const editGroup = async (id: number, formData: GroupCreateBody) => {
  return api
    .put(`/admin/groups/${id}`, formData)
    .then(response => response.data);
}

const deleteGroup = async (id: number) => {
  return api
    .delete(`/admin/groups/${id}`)
    .then(response => response.data);
}

const getDepartmentUsers = async (params: DepartmentFilterParam) => {
  return api
    .get('/admin/get-department-users', {params})
    .then(response => response.data);
}

export default {
  getGroupList,
  getAllGroupList,
  createGroup,
  getDetailGroup,
  editGroup,
  deleteGroup,
  getDepartmentUsers,
}