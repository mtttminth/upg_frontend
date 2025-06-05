import profileService from "@/services/admin/profileService";
import { CreateProfileBody } from "@/types/profile";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDetailProfile = createAsyncThunk(
  'admin/fetchDetailProfile',
  async (_, thunkAPI) => {
    try {
      const res = await profileService.getDetailProfile();
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

export const fetchEditProfile = createAsyncThunk(
  'admin/fetchEditProfile',
  async (formData: CreateProfileBody, thunkAPI) => {
    try {
      const res = await profileService.editProfile(formData);
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