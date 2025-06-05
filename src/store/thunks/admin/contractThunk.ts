import contractService from "@/services/admin/contractService";
import { ContractCreateBody, ContractParam, ContractTypeCreateBody, ContractTypeParam } from "@/types/contract";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchContractTypeList = createAsyncThunk(
  'admin/fetchContractTypeList',
  async (params: ContractTypeParam, thunkAPI) => {
    try {
      const res = await contractService.getContractTypeList(params);
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

export const fetchCreateContractType = createAsyncThunk(
  'admin/fetchCreateContractType',
  async (formData: ContractTypeCreateBody, thunkAPI) => {
    try {
      const res = await contractService.createContractType(formData);
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

export const fetchDetailContractType = createAsyncThunk(
  'admin/fetchDetailContractType',
  async (id: number, thunkAPI) => {
    try {
      const res = await contractService.getDetailContractType(id);
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

export const fetchEditContractType = createAsyncThunk(
  'admin/fetchEditContractType',
  async ({id, formData}: {id: number, formData: ContractTypeCreateBody}, thunkAPI) => {
    try {
      const res = await contractService.editContractType(id, formData);
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

export const fetchDeleteContractType = createAsyncThunk(
  'admin/fetchDeleteContractType',
  async (id: number, thunkAPI) => {
    try {
      const res = await contractService.deleteContractType(id);
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

// Contracts
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

export const fetchCreateContract = createAsyncThunk(
  'admin/fetchCreateContract',
  async (formData: ContractCreateBody, thunkAPI) => {
    try {
      const res = await contractService.createContract(formData);
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

export const fetchDetailContract = createAsyncThunk(
  'admin/fetchDetailContract',
  async (id: number, thunkAPI) => {
    try {
      const res = await contractService.getDetailContract(id);
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

export const fetchEditContract = createAsyncThunk(
  'admin/fetchEditContract',
  async ({id, formData}: {id: number, formData: ContractCreateBody}, thunkAPI) => {
    try {
      const res = await contractService.editContract(id, formData);
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

export const fetchDeleteContract = createAsyncThunk(
  'admin/fetchDeleteContract',
  async (id: number, thunkAPI) => {
    try {
      const res = await contractService.deleteContract(id);
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

export const fetchAllTypeList = createAsyncThunk(
  'admin/fetchAllTypeList',
  async (_, thunkAPI) => {
    try {
      const res = await contractService.getAllTypeList();
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