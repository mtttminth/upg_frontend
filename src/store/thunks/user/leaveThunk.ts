import leaveService from "@/services/user/leaveService";
import { LeaveForm } from "@/types/leave";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchDepartment = createAsyncThunk(
  'user/fetchAdminList',
  async (_, thunkAPI) => {
    try {
      const res = await leaveService.getDepartmentList();
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

export const fetchLeaveType = createAsyncThunk(
  'user/fetchLeaveType',
  async (_, thunkAPI) => {
    try {
      const res = await leaveService.getLeaveTypeList();
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

export const fetchSubmitLeaveForm = createAsyncThunk(
  'user/fetchSubmitLeaveForm',
  async (formData: LeaveForm, thunkAPI) => {
    try {
      const res = await leaveService.submitLeaveForm(formData);
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
