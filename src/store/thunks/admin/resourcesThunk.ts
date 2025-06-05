import pageService from "@/services/admin/resourcesService";
import { CategoryCreateBody, CategoryParam, PageCreateBody, PageParam, SubCategoryCreateBody, SubCategoryParam } from "@/types/page";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPageList = createAsyncThunk(
  'admin/fetchPageList',
  async (params: PageParam, thunkAPI) => {
    try {
      const res = await pageService.getPageList(params);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchCreatePage = createAsyncThunk(
  'admin/fetchCreatePage',
  async (formData: PageCreateBody, thunkAPI) => {
    try {
      const res = await pageService.createPage(formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchDetailPage = createAsyncThunk(
  'admin/fetchDetailPage',
  async (id: number, thunkAPI) => {
    try {
      const res = await pageService.getDetailPage(id);
      console.log('res', res.data)
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchEditPage = createAsyncThunk(
  'admin/fetchEditPage',
  async ({id, formData}: {id: number, formData: PageCreateBody}, thunkAPI) => {
    try {
      const res = await pageService.editPage(id, formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchDeletePage = createAsyncThunk(
  'admin/fetchDeletePage',
  async (id: number, thunkAPI) => {
    try {
      const res = await pageService.deletePage(id);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

// Categories
export const fetchCategoryList = createAsyncThunk(
  'admin/fetchCategoryList',
  async (params: CategoryParam, thunkAPI) => {
    try {
      const res = await pageService.getCategoryList(params);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchCreateCategory = createAsyncThunk(
  'admin/fetchCreateCategory',
  async (formData: CategoryCreateBody, thunkAPI) => {
    try {
      const res = await pageService.createCategory(formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchDetailCategory = createAsyncThunk(
  'admin/fetchDetailCategory',
  async (id: number, thunkAPI) => {
    try {
      const res = await pageService.getDetailCategory(id);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchEditCategory = createAsyncThunk(
  'admin/fetchEditCategory',
  async ({id, formData}: {id: number, formData: CategoryCreateBody}, thunkAPI) => {
    try {
      const res = await pageService.editCategory(id, formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchDeleteCategory = createAsyncThunk(
  'admin/fetchDeleteCategory',
  async (id: number, thunkAPI) => {
    try {
      const res = await pageService.deleteCategory(id);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchAllCategoryList = createAsyncThunk(
  'admin/fetchAllCategoryList',
  async (_, thunkAPI) => {
    try {
      const res = await pageService.getAllCategoryList();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

// SubCategories
export const fetchSubCategoryList = createAsyncThunk(
  'admin/fetchSubCategoryList',
  async (params: SubCategoryParam, thunkAPI) => {
    try {
      const res = await pageService.getSubCategoryList(params);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchCreateSubCategory = createAsyncThunk(
  'admin/fetchCreateSubCategory',
  async (formData: SubCategoryCreateBody, thunkAPI) => {
    try {
      const res = await pageService.createSubCategory(formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchDetailSubCategory = createAsyncThunk(
  'admin/fetchDetailSubCategory',
  async (id: number, thunkAPI) => {
    try {
      const res = await pageService.getDetailSubCategory(id);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchEditSubCategory = createAsyncThunk(
  'admin/fetchEditSubCategory',
  async ({id, formData}: {id: number, formData: SubCategoryCreateBody}, thunkAPI) => {
    try {
      const res = await pageService.editSubCategory(id, formData);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchDeleteSubCategory = createAsyncThunk(
  'admin/fetchDeleteSubCategory',
  async (id: number, thunkAPI) => {
    try {
      const res = await pageService.deleteSubCategory(id);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchSubCategoryListByCategoryId = createAsyncThunk(
  'admin/fetchSubCategoryListByCategoryId',
  async (id: number, thunkAPI) => {
    try {
      const res = await pageService.getSubCategoryListByCategoryId(id);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)