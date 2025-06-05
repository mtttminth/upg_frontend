import { UserCreateBody, UserParam } from '@/types/user';
import api from './api';
import { formatDate } from '@/utils/common';

const getUserList = async (params: UserParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/users', {params: formattedParams})
    .then(response => response.data);
}

const createUser = async (formData: UserCreateBody) => {
  return api
    .post('/admin/users', formData)
    .then(response => response.data);
}

const getDetailUser = async (id: number) => {
  return api
    .get(`/admin/users/${id}`)
    .then(response => response.data);
}

const editUser = async (id: number, formData: UserCreateBody) => {
  return api
    .put(`/admin/users/${id}`, formData)
    .then(response => response.data);
}

const deleteUser = async (id: number) => {
  return api
    .delete(`/admin/users/${id}`)
    .then(response => response.data);
}

export default {
  getUserList, createUser, getDetailUser, editUser, deleteUser
}