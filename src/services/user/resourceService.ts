import { ResourceParam } from '@/types/user-resource';
import api from './api';

const getResourceCategories = async () => {
  return api
    .get(`/user/resource-page/get-categories`)
    .then(response => response.data);
}

const getResourceList = async (params: ResourceParam) => {
  const formattedParams = {
    ...params,
    page: params.page,
    subcategory_id: params.subcategory_id == 0 ? undefined : params.subcategory_id,
  }
  return api
    .get(`/user/resource-page/resources`, {params: formattedParams})
    .then(response => response.data);
}

const getResourceDetail = async (id: number) => {
  return api
    .get(`/user/resource-page/resources/${id}`)
    .then(response => response.data);
}

const getResourceCreatedBys = async () => {
  return api
    .get(`/user/get-resource-created-bys`)
    .then(response => response.data);
}

export default {
  getResourceCategories,
  getResourceList,
  getResourceDetail,
  getResourceCreatedBys,
}