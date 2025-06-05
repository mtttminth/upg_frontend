import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";

export type GroupState = {
  loading: boolean;
  groupErrors: any;
  success: boolean;
  groupMessage: string;
  groupParams: GroupParam;
  allGroupList: GroupAll[];
  filteredAllGroupList: GroupAll[];
  selectedGroupsDraft: GroupAll[];
  groupList: GroupList;
  groupDetail: GroupDetail;
  departmentFilterParam: DepartmentFilterParam;
  departmentUsers: Department[];
  selectedDepartmentUsersDraft: CheckedState;
  selectedDepartmentUsers: User[];
  selededUsersBinded: boolean;
};

export type CheckedState = DepartmentChecked[];

export type DepartmentChecked = {
  id?: number;
  name: string;
  users: User[];
};

export type GroupAll = {
  id: number;
  name: string;
};

export type OpenState = {
  [key: number]: boolean;
};

export type User = {
  id: number;
  name: string;
  code: string;
  rank: number;
  checked?: boolean;
  department?: string;
};

export type Department = {
  id: number;
  name: string;
  users: User[];
};

export type GroupParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type DepartmentFilterParam = {
  fromRank: string;
  toRank: string;
  departments: number[];
};

export type GroupList = {
  data: Group[];
  links: Links;
  meta: Meta;
};

export type Group = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type GroupCreateBody = {
  name: string;
  user_ids: number[];
};

export type GroupDetail = {
  id: number;
  name: string;
  departments: DepartmentChecked[];
};

export type GroupUser = {
  id: number;
  name: string;
  code: string;
  rank: number;
};
