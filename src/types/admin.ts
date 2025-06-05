import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";

export type AdminState = {
  loading: boolean;
  adminErrors: any;
  success: boolean;
  adminMessage: string;
  adminParams: AdminParam;
  adminList: AdminList;
  adminDetail: Admin;
};

export type AdminParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type AdminList = {
  data: Admin[];
  links: Links;
  meta: Meta;
};

export type Admin = {
  id: number;
  code: string;
  name: string;
  department: {
    id: number;
    name: string;
  };
  roles: {
    id: number;
    name: string;
  }[];
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type AdminCreateBody = {
  name: string;
};
