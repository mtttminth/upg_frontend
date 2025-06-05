import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";

export type RoleState = {
  loading: boolean;
  roleErrors: any;
  success: boolean;
  roleMessage: string;
  roleParams: RoleParam;
  roleList: RoleList;
  roleDetail: RoleDetail;
};

export type RoleParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type RoleList = {
  data: Role[];
  links: Links;
  meta: Meta;
};

export type Role = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type RoleDetail = {
  id: number;
  name: string;
  permissions: string[];
  created_at: string;
  updated_at?: string | null;
};

export type RoleCreateBody = {
  name: string;
  permissions: string[];
};
