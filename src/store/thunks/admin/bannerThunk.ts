import bannerService from "@/services/admin/bannerService";
import { CreateBannerBody } from "@/types/banner";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDetailBanner = createAsyncThunk(
  'admin/fetchDetailBanner',
  async (_, thunkAPI) => {
    try {
      const res = await bannerService.getDetailBanner();
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

export const fetchEditBanner = createAsyncThunk(
  'admin/fetchEditBanner',
  async ({id, formData}: {id: number, formData: CreateBannerBody}, thunkAPI) => {
    try {
      const res = await bannerService.editBanner(id, formData);
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