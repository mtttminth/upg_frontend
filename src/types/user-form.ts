import { Links, Meta } from "./common";

export type UserFormState = {
  loading: boolean;
  formErrors: any;
  success: boolean;
  formMessage: string;
  formParams: FormParam;
  formList: FormList;
  formDetail: FormDetail;
  formTypeList: FormType[];
}

export type FormParam = {
  page: number;
  perPage: number;
  keyword: string;
  form_type_id: number;
}

export type FormList = {
  data: Form[];
  links: Links;
  meta: Meta;
}

export type Form = {
  id: number;
  name: string;
  image: string;
  department: string;
  form_status: string;
  created_at: string;
}

export type FormDetail = {
  id: number;
  name: string;
  file: string;
  formType: string;
}

export type FormType = {
  id: number;
  name: string;
}