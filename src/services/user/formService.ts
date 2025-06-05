import { FormParam } from '@/types/user-form';
import api from './api';

const getFormTypes = async () => {
  return api
    .get(`/user/form-page/get-form-types`)
    .then(response => response.data);
}

const getFormList = async (params: FormParam) => {
  const formattedParams = {
    ...params,
    page: params.page,
    form_type_id: params.form_type_id == 0 ? undefined : params.form_type_id,
  }
  return api
    .get(`/user/form-page/forms`, {params: formattedParams})
    .then(response => response.data);
}

const getFormDetail = async (id: number) => {
  return api
    .get(`/user/form-page/forms/${id}`)
    .then(response => response.data);
}

export default {
  getFormTypes,
  getFormList,
  getFormDetail,
}