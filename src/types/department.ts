import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";

export type DepartmentState = {
  loading: boolean;
  departmentErrors: any;
  success: boolean;
  departmentMessage: string;
  departmentParams: DepartmentParam;
  departmentList: DepartmentList;
  departmentDetail: Department;
};

export type DepartmentParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type DepartmentList = {
  data: Department[];
  links: Links;
  meta: Meta;
};

export type Department = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type DepartmentCreateBody = {
  name: string;
};
