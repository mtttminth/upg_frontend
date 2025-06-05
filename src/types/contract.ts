import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";
import { ReleaseStatus, GroupChecked, UserOption } from "./release";
import { DepartmentChecked } from "./group";

export type ContractState = {
  loading: boolean;
  contractErrors: any;
  success: boolean;
  contractMessage: string;
  contractTypeParams: ContractTypeParam;
  contractTypeList: ContractTypeList;
  contractTypeDetail: ContractType;
  allContractType: AllContractTypeList[];
  // Contracts
  contractParams: ContractParam;
  contractList: ContractList;
  contractDetail: ContractDetail;
};

export type ContractDetail = {
  id: number;
  name: string;
  video_url: string;
  userOption: UserOption;
  contractType: AllContractTypeList;
  departments: DepartmentChecked[];
  groups: GroupChecked[];
  file: string;
};

export type ContractTypeParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type ContractTypeList = {
  data: ContractType[];
  links: Links;
  meta: Meta;
};

export type ContractType = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type ContractTypeCreateBody = {
  name: string;
};

// Contracts
export type ContractParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type ContractList = {
  data: Contract[];
  links: Links;
  meta: Meta;
};

export type Contract = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type ContractCreateBody = {
  name: string;
  user_ids: number[];
  user_option_id: number;
  group_ids: number[];
  contract_type_id: number;
  file: string;
};

export type AllContractTypeList = {
  id: number;
  name: string;
  created_at: string;
  updated_at?: string | null;
};
