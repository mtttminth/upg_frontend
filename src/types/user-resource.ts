import { Links, Meta } from "./common";
import { CreatedBy, Department } from "./user-release";

export type UserResourceState = {
  loading: boolean;
  resourceErrors: any;
  success: boolean;
  resourceMessage: string;
  resourceParams: ResourceParam;
  resourceList: ResourceList;
  resourceDetail: ResourceDetail;
  categoryList: Category[];
  departmentList: Department[];
  resourceCreatedBys: CreatedBy[];
}

export type ResourceParam = {
  page: number;
  perPage: number;
  keyword: string;
  created_by_ids: number[];
  subcategory_id: number;
}

export type ResourceList = {
  data: Resource[];
  links: Links;
  meta: Meta;
}

export type ResourceDetail = {
  id: number;
  name: string;
  video_url: string;
  file: string;
  subcategory: string;
  created_by: string;
}

export type Resource = {
  id: number;
  name: string;
}

export type Category = {
  id: number;
  name: string;
  subcategories: SubCategory[];
}

export type SubCategory = {
  id: number;
  name: string;
}