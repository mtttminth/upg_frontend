import { Links, Meta } from "./common";

export type UserContractState = {
  loading: boolean;
  contractErrors: any;
  success: boolean;
  contractMessage: string;
  contractParams: ContractParam;
  contractList: ContractList;
  contractDetail: ContractDetail;
  contractTypeList: ContractType[];
}

export type ContractParam = {
  page: number;
  perPage: number;
  keyword: string;
  contract_type_id: number;
}

export type ContractList = {
  data: Contract[];
  links: Links;
  meta: Meta;
}

export type Contract = {
  id: number;
  name: string;
}

export type ContractDetail = {
  id: number;
  name: string;
  file: string;
  contractType: string;
}


export type ContractType = {
  id: number;
  name: string;
}