import { ReleaseParam } from '@/types/user-release';
import api from './api';

const getReleaseList = async (params: ReleaseParam) => {
  const formattedParams = {
    ...params,
    page: params.page,
  }
  return api
    .get(`/user/release-page/releases`, {params: formattedParams})
    .then(response => response.data);
}

const getReleaseDetail = async (id: number) => {
  return api
    .get(`/user/release-page/releases/${id}`)
    .then(response => response.data);
}

const getDepartmentList = async () => {
  return api
    .get(`/user/get-departments`)
    .then(response => response.data);
}

const getReleaseCreatedBys = async () => {
  return api
    .get(`/user/get-release-created-bys`)
    .then(response => response.data);
}

export default {
  getReleaseList,
  getReleaseDetail,
  getDepartmentList,
  getReleaseCreatedBys
}