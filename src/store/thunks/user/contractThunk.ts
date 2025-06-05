import contractService from "@/services/user/contractService";
import { ContractParam } from "@/types/user-contract";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContractList = createAsyncThunk(
  'admin/fetchContractList',
  async (params: ContractParam, thunkAPI) => {
    try {
      const res = await contractService.getContractList(params);
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

export const fetchContractTypes = createAsyncThunk(
  'admin/fetchContractTypes',
  async (_, thunkAPI) => {
    try {
      const res = await contractService.getContractTypes();
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

export const fetchContractDetail = createAsyncThunk(
  'admin/fetchContractDetail',
  async (id: number, thunkAPI) => {
    try {
      const res = await contractService.getContractDetail(id);
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