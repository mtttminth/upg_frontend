import formService from "@/services/user/formService";
import { FormParam } from "@/types/user-form";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchFormList = createAsyncThunk(
  'admin/fetchFormList',
  async (params: FormParam, thunkAPI) => {
    try {
      const res = await formService.getFormList(params);
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

export const fetchFormTypes = createAsyncThunk(
  'admin/fetchFormTypes',
  async (_, thunkAPI) => {
    try {
      const res = await formService.getFormTypes();
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

export const fetchFormDetail = createAsyncThunk(
  'admin/fetchFormDetail',
  async (id: number, thunkAPI) => {
    try {
      const res = await formService.getFormDetail(id);
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