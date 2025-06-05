import releaseService from "@/services/admin/releaseService";
import { ReleaseCreateBody, ReleaseParam } from "@/types/release";
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

export const fetchCreateRelease = createAsyncThunk(
  'admin/fetchCreateRelease',
  async (formData: ReleaseCreateBody, thunkAPI) => {
    try {
      const res = await releaseService.createRelease(formData);
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

export const fetchDetailRelease = createAsyncThunk(
  'admin/fetchDetailRelease',
  async (id: number, thunkAPI) => {
    try {
      const res = await releaseService.getDetailRelease(id);
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

export const fetchEditRelease = createAsyncThunk(
  'admin/fetchEditRelease',
  async ({id, formData}: {id: number, formData: ReleaseCreateBody}, thunkAPI) => {
    try {
      const res = await releaseService.editRelease(id, formData);
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

export const fetchDeleteRelease = createAsyncThunk(
  'admin/fetchDeleteRelease',
  async (id: number, thunkAPI) => {
    try {
      const res = await releaseService.deleteRelease(id);
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