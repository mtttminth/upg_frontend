import authService from '@/services/admin/authService';
import { LoginFromData } from '@/types/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (formData: LoginFromData, thunkAPI) => {
    try {
      const res = await authService.login(formData);
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

export const fetchLogout = createAsyncThunk(
  '/auth/fetchLogout',
  async (_, thunkAPI) => {
    try {
      const res = await authService.logout();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }
  }
)

export const fetchPermission = createAsyncThunk(
  '/auth/fetchPermission',
  async (_, thunkAPI) => {
    try {
      const res = await authService.getUserPermission();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      }); 
    }
  }
)

export const fetchPermissionList = createAsyncThunk(
  '/auth/fetchPermissionList',
  async (_, thunkAPI) => {
    try {
      const res = await authService.getPermissionList();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      }); 
    }
  }
)

export const fetchDepartmentList = createAsyncThunk(
  '/auth/fetchDepartmentList',
  async (_, thunkAPI) => {
    try {
      const res = await authService.getDepartmentList();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      }); 
    }
  }
)

export const fetchRoleList = createAsyncThunk(
  '/auth/fetchRoleList',
  async (_, thunkAPI) => {
    try {
      const res = await authService.getRoleList();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      }); 
    }
  }
)