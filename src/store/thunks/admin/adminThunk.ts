import adminService from "@/services/admin/adminService";
import { AdminCreateBody, AdminParam } from "@/types/admin";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAdminList = createAsyncThunk(
  'admin/fetchAdminList',
  async (params: AdminParam, thunkAPI) => {
    try {
      const res = await adminService.getAdminList(params);
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

export const fetchCreateAdmin = createAsyncThunk(
  'admin/fetchCreateAdmin',
  async (formData: AdminCreateBody, thunkAPI) => {
    try {
      const res = await adminService.createAdmin(formData);
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

export const fetchDetailAdmin = createAsyncThunk(
  'admin/fetchDetailAdmin',
  async (id: number, thunkAPI) => {
    try {
      const res = await adminService.getDetailAdmin(id);
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

export const fetchEditAdmin = createAsyncThunk(
  'admin/fetchEditAdmin',
  async ({id, formData}: {id: number, formData: AdminCreateBody}, thunkAPI) => {
    try {
      const res = await adminService.editAdmin(id, formData);
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

export const fetchDeleteAdmin = createAsyncThunk(
  'admin/fetchDeleteAdmin',
  async (id: number, thunkAPI) => {
    try {
      const res = await adminService.deleteAdmin(id);
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