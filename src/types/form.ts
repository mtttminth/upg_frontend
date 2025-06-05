import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";
import { ReleaseStatus, GroupChecked, UserOption } from "./release";
import { DepartmentChecked } from "./group";

export type FormState = {
  loading: boolean;
  formErrors: any;
  success: boolean;
  formMessage: string;
  formTypeParams: FormTypeParam;
  formTypeList: FormTypeList;
  formTypeDetail: FormType;
  allFormType: AllFormTypeList[];
  // Forms
  formParams: FormParam;
  formList: FormList;
  formDetail: FormDetail;
};

export type FormDetail = {
  id: number;
  name: string;
  video_url: string;
  userOption: UserOption;
  formType: AllFormTypeList;
  departments: DepartmentChecked[];
  groups: GroupChecked[];
  file: string;
};

export type FormTypeParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type FormTypeList = {
  data: FormType[];
  links: Links;
  meta: Meta;
};

export type FormType = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type FormTypeCreateBody = {
  name: string;
};

// Forms
export type FormParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type FormList = {
  data: Form[];
  links: Links;
  meta: Meta;
};

export type Form = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type FormCreateBody = {
  name: string;
  user_ids: number[];
  user_option_id: number;
  group_ids: number[];
  form_type_id: number;
  file: string;
};

export type AllFormTypeList = {
  id: number;
  name: string;
  created_at: string;
  updated_at?: string | null;
};
