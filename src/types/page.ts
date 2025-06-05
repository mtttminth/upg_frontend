import { Dayjs } from "dayjs";
import { Links, Meta } from "./common";
import { GroupChecked, UserOption } from "./release";
import { DepartmentChecked } from "./group";

export type PageState = {
  loading: boolean;
  pageErrors: any;
  success: boolean;
  pageMessage: string;
  pageParams: PageParam;
  pageList: PageList;
  pageDetail: PageDetail;
  categoryParams: CategoryParam;
  categoryList: CategoryList;
  categoryDetail: Category;
  subCategoryParams: SubCategoryParam;
  subCategoryList: SubCategoryList;
  subCategoryDetail: SubCategory;
  allCategoryList: AllCategory[];
  allSubCategoryList: AllSubCategory[];
};

export type PageParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type PageList = {
  data: Page[];
  links: Links;
  meta: Meta;
};

export type Page = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  created_at: string;
};

export type PageDetail = {
  id: number;
  name: string;
  video_url: string;
  userOption: UserOption;
  category: Category;
  subcategory: SubCategory;
  departments: DepartmentChecked[];
  groups: GroupChecked[];
  file: string;
};

export type PageCreateBody = {
  name: string;
  user_ids: number[];
  user_option_id: number;
  group_ids: number[];
  subcategory_id: number;
  video_url: string;
  file: string;
};

// Categories
export type CategoryParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type CategoryList = {
  data: Category[];
  links: Links;
  meta: Meta;
};

export type Category = {
  id: number;
  name: string;
  created_by?: string | null;
  updated_by?: string | null;
  created_at: string;
  updated_at?: string | null;
};

export type CategoryCreateBody = {
  name: string;
};

// SubCategories
export type SubCategoryParam = {
  page: number;
  perPage: number;
  fromDate: Dayjs | null;
  toDate: Dayjs | null;
  keyword: string;
};

export type SubCategoryList = {
  data: SubCategory[];
  links: Links;
  meta: Meta;
};

export type SubCategory = {
  id: number;
  name: string;
  category?: {
    id: number;
    name: string;
  };
  created_by?: string | null;
  updated_at?: string | null;
  updated_by?: string | null;
  created_at: string;
};

export type AllCategory = {
  id: number;
  name: string;
};

export type AllSubCategory = {
  id: number;
  name: string;
  category: {
    id: number;
    name: string;
  };
  created_at: string;
  updated_at?: string | null;
};

export type SubCategoryCreateBody = {
  name: string;
};
