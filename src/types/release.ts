// Internal Release

import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";
import { DepartmentChecked, GroupList } from "./group";

export type ReleaseState = {
  loading: boolean;
  releaseErrors: any;
  success: boolean;
  releaseMessage: string;
  releaseParams: ReleaseParam;
  releaseList: ReleaseList;
  releaseDetail: ReleaseDetail;
  groupList: GroupList;
  departmentKeywordSearch: string;
  selectedGroupDraft: string[];
};

export type ReleaseParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type ReleaseList = {
  data: Release[];
  links: Links;
  meta: Meta;
};

export type Release = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type ReleaseCreateBody = {
  name: string;
  user_ids: number[];
  user_option_id: number;
  group_ids: number[];
  release_status_id: number;
  video_url: string;
  description: string;
  images: string[];
};

export type ReleaseDetail = {
  id: number;
  name: string;
  video_url: string;
  description: string;
  userOption: UserOption;
  releaseStatus: ReleaseStatus;
  departments: DepartmentChecked[];
  groups: GroupChecked[];
  images: any[];
};

export type GroupChecked = {
  id: number;
  name: string;
};
export type UserOption = {
  id: number;
  name: string;
};

export type ReleaseStatus = {
  id: number;
  name: string;
};
