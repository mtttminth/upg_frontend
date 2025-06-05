import aboutService from "@/services/user/aboutService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchPolicyMission = createAsyncThunk(
  'admin/fetchPolicyMission',
  async (_, thunkAPI) => {
    try {
      const res = await aboutService.getPolicyMission();
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

export const fetchOurCommitments = createAsyncThunk(
  'admin/fetchOurCommitments',
  async (_, thunkAPI) => {
    try {
      const res = await aboutService.getOurCommitments();
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

export const fetchOrganization = createAsyncThunk(
  'admin/fetchOrganization',
  async (_, thunkAPI) => {
    try {
      const res = await aboutService.getOrganization();
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

export const fetchCompanyProfileVideo = createAsyncThunk(
  'admin/fetchCompanyProfileVideo',
  async (_, thunkAPI) => {
    try {
      const res = await aboutService.getCompanyProfileVideo();
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