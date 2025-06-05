import homeService from "@/services/user/homeService";
import { CreateAboutBody } from "@/types/about";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBanner = createAsyncThunk(
  'user/fetchBanner',
  async (_, thunkAPI) => {
    try {
      const res = await homeService.getBanner();
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

export const fetchRelease = createAsyncThunk(
  'user/fetchRelease',
  async (_, thunkAPI) => {
    try {
      const res = await homeService.getRelease();
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

export const fetchResources = createAsyncThunk(
  'user/fetchResources',
  async (_, thunkAPI) => {
    try {
      const res = await homeService.getResources();
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

export const fetchDashboardOverview = createAsyncThunk(
  'user/fetchDashboardOverview',
  async (_, thunkAPI) => {
    try {
      const res = await homeService.getDashboardOverview();
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
