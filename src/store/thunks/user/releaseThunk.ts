import releaseService from "@/services/user/releaseService";
import { ReleaseParam } from "@/types/user-release";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchReleaseList = createAsyncThunk(
  'admin/fetchReleaseList',
  async (params: ReleaseParam, thunkAPI) => {
    try {
      const res = await releaseService.getReleaseList(params);
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

export const fetchReleaseDetail = createAsyncThunk(
  'admin/fetchReleaseDetail',
  async (id: number, thunkAPI) => {
    try {
      const res = await releaseService.getReleaseDetail(id);
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

export const fetchDepartmentList = createAsyncThunk(
  'admin/fetchDepartmentList',
  async (_, thunkAPI) => {
    try {
      const res = await releaseService.getDepartmentList();
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

export const fetchReleaseCreatedBys = createAsyncThunk(
  'admin/fetchReleaseCreatedBys',
  async (_, thunkAPI) => {
    try {
      const res = await releaseService.getReleaseCreatedBys();
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