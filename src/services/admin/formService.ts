import { FormCreateBody, FormParam, FormTypeCreateBody, FormTypeParam } from '@/types/form';
import api from './api';
import { formatDate } from '@/utils/common';

const getAllTypeList = async () => {
  return api
    .get('/admin/get-form-types')
    .then(response => response.data);
}

const getFormTypeList = async (params: FormTypeParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/form-types', {params: formattedParams})
    .then(response => response.data);
}

const createFormType = async (formData: FormTypeCreateBody) => {
  return api
    .post('/admin/form-types', formData)
    .then(response => response.data);
}

const getDetailFormType = async (id: number) => {
  return api
    .get(`/admin/form-types/${id}`)
    .then(response => response.data);
}

const editFormType = async (id: number, formData: FormTypeCreateBody) => {
  return api
    .put(`/admin/form-types/${id}`, formData)
    .then(response => response.data);
}

const deleteFormType = async (id: number) => {
  return api
    .delete(`/admin/form-types/${id}`)
    .then(response => response.data);
}

const getFormList = async (params: FormParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/forms', {params: formattedParams})
    .then(response => response.data);
}

const createForm = async (formData: FormCreateBody) => {
  return api
    .post('/admin/forms', formData)
    .then(response => response.data);
}

const getDetailForm = async (id: number) => {
  return api
    .get(`/admin/forms/${id}`)
    .then(response => response.data);
}

const editForm = async (id: number, formData: FormCreateBody) => {
  return api
    .put(`/admin/forms/${id}`, formData)
    .then(response => response.data);
}

const deleteForm = async (id: number) => {
  return api
    .delete(`/admin/forms/${id}`)
    .then(response => response.data);
}

export default {
  getAllTypeList,
  getFormTypeList,
  createFormType,
  getDetailFormType,
  editFormType,
  deleteFormType,
  getFormList,
  createForm,
  getDetailForm,
  editForm,
  deleteForm,
}