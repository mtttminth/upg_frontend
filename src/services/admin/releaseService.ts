import { ReleaseCreateBody, ReleaseParam } from '@/types/release';
import api from './api';
import { formatDate } from '@/utils/common';

const getReleaseList = async (params: ReleaseParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/releases', {params: formattedParams})
    .then(response => response.data);
}

const createRelease = async (formData: ReleaseCreateBody) => {
  return api
    .post('/admin/releases', formData)
    .then(response => response.data);
}

const getDetailRelease = async (id: number) => {
  return api
    .get(`/admin/releases/${id}`)
    .then(response => response.data);
}

const editRelease = async (id: number, formData: ReleaseCreateBody) => {
  return api
    .put(`/admin/releases/${id}`, formData)
    .then(response => response.data);
}

const deleteRelease = async (id: number) => {
  return api
    .delete(`/admin/releases/${id}`)
    .then(response => response.data);
}

export default {
  getReleaseList,
  createRelease,
  getDetailRelease,
  editRelease,
  deleteRelease,
}