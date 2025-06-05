import formService from "@/services/admin/formService";
import { FormCreateBody, FormParam, FormTypeCreateBody, FormTypeParam } from "@/types/form";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFormTypeList = createAsyncThunk(
  'admin/fetchFormTypeList',
  async (params: FormTypeParam, thunkAPI) => {
    try {
      const res = await formService.getFormTypeList(params);
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

export const fetchCreateFormType = createAsyncThunk(
  'admin/fetchCreateFormType',
  async (formData: FormTypeCreateBody, thunkAPI) => {
    try {
      const res = await formService.createFormType(formData);
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

export const fetchDetailFormType = createAsyncThunk(
  'admin/fetchDetailFormType',
  async (id: number, thunkAPI) => {
    try {
      const res = await formService.getDetailFormType(id);
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

export const fetchEditFormType = createAsyncThunk(
  'admin/fetchEditFormType',
  async ({id, formData}: {id: number, formData: FormTypeCreateBody}, thunkAPI) => {
    try {
      const res = await formService.editFormType(id, formData);
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

export const fetchDeleteFormType = createAsyncThunk(
  'admin/fetchDeleteFormType',
  async (id: number, thunkAPI) => {
    try {
      const res = await formService.deleteFormType(id);
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

// Forms
export const fetchFormList = createAsyncThunk(
  'admin/fetchFormList',
  async (params: FormParam, thunkAPI) => {
    try {
      const res = await formService.getFormList(params);
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

export const fetchCreateForm = createAsyncThunk(
  'admin/fetchCreateForm',
  async (formData: FormCreateBody, thunkAPI) => {
    try {
      const res = await formService.createForm(formData);
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

export const fetchDetailForm = createAsyncThunk(
  'admin/fetchDetailForm',
  async (id: number, thunkAPI) => {
    try {
      const res = await formService.getDetailForm(id);
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

export const fetchEditForm = createAsyncThunk(
  'admin/fetchEditForm',
  async ({id, formData}: {id: number, formData: FormCreateBody}, thunkAPI) => {
    try {
      const res = await formService.editForm(id, formData);
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

export const fetchDeleteForm = createAsyncThunk(
  'admin/fetchDeleteForm',
  async (id: number, thunkAPI) => {
    try {
      const res = await formService.deleteForm(id);
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

export const fetchAllTypeList = createAsyncThunk(
  'admin/fetchAllTypeList',
  async (_, thunkAPI) => {
    try {
      const res = await formService.getAllTypeList();
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