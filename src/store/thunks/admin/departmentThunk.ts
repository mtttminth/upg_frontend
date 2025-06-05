import departmentService from "@/services/admin/departmentService";
import { DepartmentCreateBody, DepartmentParam } from "@/types/department";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDepartmentList = createAsyncThunk(
  'admin/fetchDepartmentList',
  async (params: DepartmentParam, thunkAPI) => {
    try {
      const res = await departmentService.getDepartmentList(params);
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

export const fetchCreateDepartment = createAsyncThunk(
  'admin/fetchCreateDepartment',
  async (formData: DepartmentCreateBody, thunkAPI) => {
    try {
      const res = await departmentService.createDepartment(formData);
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

export const fetchDetailDepartment = createAsyncThunk(
  'admin/fetchDetailDepartment',
  async (id: number, thunkAPI) => {
    try {
      const res = await departmentService.getDetailDepartment(id);
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

export const fetchEditDepartment = createAsyncThunk(
  'admin/fetchEditDepartment',
  async ({id, formData}: {id: number, formData: DepartmentCreateBody}, thunkAPI) => {
    try {
      const res = await departmentService.editDepartment(id, formData);
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

export const fetchDeleteDepartment = createAsyncThunk(
  'admin/fetchDeleteDepartment',
  async (id: number, thunkAPI) => {
    try {
      const res = await departmentService.deleteDepartment(id);
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