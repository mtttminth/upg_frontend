import userService from "@/services/admin/userService";
import { UserCreateBody, UserParam } from "@/types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUserList = createAsyncThunk(
  'admin/fetchUserList',
  async (params: UserParam, thunkAPI) => {
    try {
      const res = await userService.getUserList(params);
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

export const fetchCreateUser = createAsyncThunk(
  'admin/fetchCreateUser',
  async (formData: UserCreateBody, thunkAPI) => {
    try {
      const res = await userService.createUser(formData);
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

export const fetchDetailUser = createAsyncThunk(
  'admin/fetchDetailUser',
  async (id: number, thunkAPI) => {
    try {
      const res = await userService.getDetailUser(id);
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

export const fetchEditUser = createAsyncThunk(
  'admin/fetchEditUser',
  async ({id, formData}: {id: number, formData: UserCreateBody}, thunkAPI) => {
    try {
      const res = await userService.editUser(id, formData);
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

export const fetchDeleteUser = createAsyncThunk(
  'admin/fetchDeleteUser',
  async (id: number, thunkAPI) => {
    try {
      const res = await userService.deleteUser(id);
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