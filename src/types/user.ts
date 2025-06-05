import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";

export type UserState = {
  loading: boolean;
  userErrors: any;
  success: boolean;
  userMessage: string;
  userParams: UserParam;
  userList: UserList;
  userDetail: User;
}

export type UserParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
}

export type UserList = {
  data: User[];
  links: Links;
  meta: Meta;
}

export type User = {
  id: number;
  code: string;
  name: string;
  position: string;
  department: {
    id: number;
    name: string;
  };
  rank: string;
  rank_code: string;
  created_at: string;
  created_by: string;
}

export type UserCreateBody = {
  name: string;
}