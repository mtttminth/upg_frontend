import resourceService from "@/services/user/resourceService";
import { ResourceParam } from "@/types/user-resource";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchResourceList = createAsyncThunk(
  'admin/fetchResourceList',
  async (params: ResourceParam, thunkAPI) => {
    try {
      const res = await resourceService.getResourceList(params);
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

export const fetchResourceCategories = createAsyncThunk(
  'admin/fetchResourceCategories',
  async (_, thunkAPI) => {
    try {
      const res = await resourceService.getResourceCategories();
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

export const fetchResourceDetail = createAsyncThunk(
  'admin/fetchResourceDetail',
  async (id: number, thunkAPI) => {
    try {
      const res = await resourceService.getResourceDetail(id);
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

export const fetchResourceCreatedBys = createAsyncThunk(
  'admin/fetchResourceCreatedBys',
  async (_, thunkAPI) => {
    try {
      const res = await resourceService.getResourceCreatedBys();
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