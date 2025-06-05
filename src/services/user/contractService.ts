import api from './api';
import { ContractParam } from '@/types/user-contract';

const getContractTypes = async () => {
  return api
    .get(`/user/contract-page/get-contract-types`)
    .then(response => response.data);
}

const getContractList = async (params: ContractParam) => {
  const formattedParams = {
    ...params,
    page: params.page,
    contract_type_id: params.contract_type_id == 0 ? undefined : params.contract_type_id,
  }
  return api
    .get(`/user/contract-page/contracts`, {params: formattedParams})
    .then(response => response.data);
}

const getContractDetail = async (id: number) => {
  return api
    .get(`/user/contract-page/contracts/${id}`)
    .then(response => response.data);
}

export default {
  getContractTypes,
  getContractList,
  getContractDetail,
}