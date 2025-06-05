import { ContractCreateBody, ContractParam, ContractTypeCreateBody, ContractTypeParam } from '@/types/contract';
import api from './api';
import { formatDate } from '@/utils/common';

const getAllTypeList = async () => {
  return api
    .get('/admin/get-contract-types')
    .then(response => response.data);
}

const getContractTypeList = async (params: ContractTypeParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/contract-types', {params: formattedParams})
    .then(response => response.data);
}

const createContractType = async (formData: ContractTypeCreateBody) => {
  return api
    .post('/admin/contract-types', formData)
    .then(response => response.data);
}

const getDetailContractType = async (id: number) => {
  return api
    .get(`/admin/contract-types/${id}`)
    .then(response => response.data);
}

const editContractType = async (id: number, formData: ContractTypeCreateBody) => {
  return api
    .put(`/admin/contract-types/${id}`, formData)
    .then(response => response.data);
}

const deleteContractType = async (id: number) => {
  return api
    .delete(`/admin/contract-types/${id}`)
    .then(response => response.data);
}

const getContractList = async (params: ContractParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/contracts', {params: formattedParams})
    .then(response => response.data);
}

const createContract = async (formData: ContractCreateBody) => {
  return api
    .post('/admin/contracts', formData)
    .then(response => response.data);
}

const getDetailContract = async (id: number) => {
  return api
    .get(`/admin/contracts/${id}`)
    .then(response => response.data);
}

const editContract = async (id: number, formData: ContractCreateBody) => {
  return api
    .put(`/admin/contracts/${id}`, formData)
    .then(response => response.data);
}

const deleteContract = async (id: number) => {
  return api
    .delete(`/admin/contracts/${id}`)
    .then(response => response.data);
}

export default {
  getAllTypeList,
  getContractTypeList,
  createContractType,
  getDetailContractType,
  editContractType,
  deleteContractType,
  getContractList,
  createContract,
  getDetailContract,
  editContract,
  deleteContract,
}