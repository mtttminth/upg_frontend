import { CategoryCreateBody, CategoryParam, PageCreateBody, PageParam, SubCategoryCreateBody, SubCategoryParam } from '@/types/page';
import api from './api';
import { formatDate } from '@/utils/common';

const getPageList = async (params: PageParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/resources', {params: formattedParams})
    .then(response => response.data);
}

const createPage = async (formData: PageCreateBody) => {
  return api
    .post('/admin/resources', formData)
    .then(response => response.data);
}

const getDetailPage = async (id: number) => {
  return api
    .get(`/admin/resources/${id}`)
    .then(response => response.data);
}

const editPage = async (id: number, formData: PageCreateBody) => {
  return api
    .put(`/admin/resources/${id}`, formData)
    .then(response => response.data);
}

const deletePage = async (id: number) => {
  return api
    .delete(`/admin/resources/${id}`)
    .then(response => response.data);
}

// Categories
const getCategoryList = async (params: CategoryParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/categories', {params: formattedParams})
    .then(response => response.data);
}

const createCategory = async (formData: CategoryCreateBody) => {
  return api
    .post('/admin/categories', formData)
    .then(response => response.data);
}

const getDetailCategory = async (id: number) => {
  return api
    .get(`/admin/categories/${id}`)
    .then(response => response.data);
}

const editCategory = async (id: number, formData: CategoryCreateBody) => {
  return api
    .put(`/admin/categories/${id}`, formData)
    .then(response => response.data);
}

const deleteCategory = async (id: number) => {
  return api
    .delete(`/admin/categories/${id}`)
    .then(response => response.data);
}

const getAllCategoryList = async () => {
  return api
    .get('/admin/get-categories')
    .then(response => response.data);
}

// SubCategories
const getSubCategoryList = async (params: SubCategoryParam) => {
  const formattedParams = {
    ...params,
    page: params.page + 1,
    fromDate: params.fromDate && formatDate(params.fromDate),
    toDate: params.toDate && formatDate(params.toDate),
  }
  return api
    .get('/admin/subcategories', {params: formattedParams})
    .then(response => response.data);
}

const createSubCategory = async (formData: SubCategoryCreateBody) => {
  return api
    .post('/admin/subcategories', formData)
    .then(response => response.data);
}

const getDetailSubCategory = async (id: number) => {
  return api
    .get(`/admin/subcategories/${id}`)
    .then(response => response.data);
}

const editSubCategory = async (id: number, formData: SubCategoryCreateBody) => {
  return api
    .put(`/admin/subcategories/${id}`, formData)
    .then(response => response.data);
}

const deleteSubCategory = async (id: number) => {
  return api
    .delete(`/admin/subcategories/${id}`)
    .then(response => response.data);
}

const getSubCategoryListByCategoryId = async (id: number) => {
  return api
    .get(`/admin/categories/${id}/subcategories`)
    .then(response => response.data);
}

export default {
  getPageList,
  createPage,
  getDetailPage,
  editPage,
  deletePage,
  getCategoryList,
  createCategory,
  getDetailCategory,
  editCategory,
  deleteCategory,
  getSubCategoryList,
  createSubCategory,
  getDetailSubCategory,
  editSubCategory,
  deleteSubCategory,
  getAllCategoryList,
  getSubCategoryListByCategoryId,
}