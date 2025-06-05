import aboutService from "@/services/admin/aboutService";
import { CreateAboutBody } from "@/types/about";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDetailAbout = createAsyncThunk(
  'admin/fetchDetailAbout',
  async (_, thunkAPI) => {
    try {
      const res = await aboutService.getDetailAbout();
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

export const fetchEditAbout = createAsyncThunk(
  'admin/fetchEditAbout',
  async ({id, formData}: {id: number, formData: CreateAboutBody}, thunkAPI) => {
    try {
      const res = await aboutService.editAbout(id, formData);
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