import roleService from "@/services/admin/roleService";
import { RoleCreateBody, RoleParam } from "@/types/role";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRoleList = createAsyncThunk(
  'admin/fetchRoleList',
  async (params: RoleParam, thunkAPI) => {
    try {
      const res = await roleService.getRoleList(params);
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

export const fetchCreateRole = createAsyncThunk(
  'admin/fetchCreateRole',
  async (formData: RoleCreateBody, thunkAPI) => {
    try {
      const res = await roleService.createRole(formData);
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

export const fetchDetailRole = createAsyncThunk(
  'admin/fetchDetailRole',
  async (id: number, thunkAPI) => {
    try {
      const res = await roleService.getDetailRole(id);
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

export const fetchEditRole = createAsyncThunk(
  'admin/fetchEditRole',
  async ({id, formData}: {id: number, formData: RoleCreateBody}, thunkAPI) => {
    try {
      const res = await roleService.editRole(id, formData);
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

export const fetchDeleteRole = createAsyncThunk(
  'admin/fetchDeleteRole',
  async (id: number, thunkAPI) => {
    try {
      const res = await roleService.deleteRole(id);
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