import { Links, Meta } from "./common";

export type UserReleaseState = {
  loading: boolean;
  releaseErrors: any;
  success: boolean;
  releaseMessage: string;
  releaseParams: ReleaseParam;
  releaseList: ReleaseList;
  departmentList: Department[];
  releaseDetail : ReleaseDetail;
  releaseCreatedBys: CreatedBy[];
}

export type ReleaseParam = {
  page: number;
  perPage: number;
  keyword: string;
  created_by_ids: number[];
}

export type ReleaseList = {
  data: Release[];
  links: Links;
  meta: Meta;
}

export type Release = {
  id: number;
  name: string;
  image: string;
  department: string;
  release_status: string;
  created_at: string;
}

export type Department = {
  id: number;
  name: string;
}

export type ReleaseDetail = {
  i: number;
  name: string;
  video_url: string;
  description: string;
  releaseStatus: string;
  images: string;
  created_by: string;
}

export type CreatedBy = {
  id: number;
  name: string;
}