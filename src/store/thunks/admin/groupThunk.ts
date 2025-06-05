import groupService from "@/services/admin/groupService";
import { DepartmentFilterParam, GroupCreateBody, GroupParam } from "@/types/group";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllGroupList = createAsyncThunk(
  'admin/fetchAllGroupList',
  async (_, thunkAPI) => {
    try {
      const res = await groupService.getAllGroupList();
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

export const fetchGroupList = createAsyncThunk(
  'admin/fetchGroupList',
  async (params: GroupParam, thunkAPI) => {
    try {
      const res = await groupService.getGroupList(params);
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

export const fetchCreateGroup = createAsyncThunk(
  'admin/fetchCreateGroup',
  async (formData: GroupCreateBody, thunkAPI) => {
    try {
      const res = await groupService.createGroup(formData);
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

export const fetchDetailGroup = createAsyncThunk(
  'admin/fetchDetailGroup',
  async (id: number, thunkAPI) => {
    try {
      const res = await groupService.getDetailGroup(id);
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

export const fetchEditGroup = createAsyncThunk(
  'admin/fetchEditGroup',
  async ({id, formData}: {id: number, formData: GroupCreateBody}, thunkAPI) => {
    try {
      const res = await groupService.editGroup(id, formData);
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

export const fetchDeleteGroup = createAsyncThunk(
  'admin/fetchDeleteGroup',
  async (id: number, thunkAPI) => {
    try {
      const res = await groupService.deleteGroup(id);
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

export const fetchDepartmentUsers = createAsyncThunk(
  'admin/fetchDepartmentUsers',
  async (params: DepartmentFilterParam, thunkAPI) => {
    try {
      const res = await groupService.getDepartmentUsers(params);
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