import authService from '@/services/user/authService';
import { LoginFromData } from '@/types/auth';
import {createAsyncThunk} from '@reduxjs/toolkit';
import { markNotificationAsRead } from '../../slices/user/authSlice'; // Corrected import path

export const fetchUserLogin = createAsyncThunk(
  'auth/fetchUserLogin',
  async (formData: LoginFromData, thunkAPI) => {
    try {
      const res = await authService.userLogin(formData);
      return res;
    } catch (err: any) {
      console.log('err', err)
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      })
    }
  }
)

export const fetchUserLogout = createAsyncThunk(
  '/auth/fetchUserLogout',
  async (_, thunkAPI) => {
    try {
      const res = await authService.userLogout();
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }
  }
)

export const fetchUserProfile = createAsyncThunk(
  '/auth/fetchUserProfile',
  async (_, thunkAPI) => {
    try {
      const res = await authService.userProfile();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }
  }
)

export const fetchUserNotification = createAsyncThunk(
  '/auth/fetchUserNotification',
  async (_, thunkAPI) => {
    try {
      const res = await authService.userNotification();
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue({
        status: err.response.status,
        message: err.response.data.message,
        errors: err.response.data.errors,
      });
    }
  }
)

// New thunk for removing a notification
export const removeUserNotification = createAsyncThunk(
  'auth/removeUserNotification',
  async (notificationId: string, { dispatch, rejectWithValue }) => {
    try {
      // Call the API service function
      await authService.markAsRead(notificationId);
      // On success, dispatch the action to remove it from the local state
      dispatch(markNotificationAsRead(notificationId)); // Assuming this action exists in authSlice
      // Optionally return the ID or success status if needed elsewhere
      return notificationId;
    } catch (err: any) {
      console.error('Failed to remove notification:', err);
      // Handle API errors
      return rejectWithValue({
        status: err.response?.status,
        message: err.response?.data?.message || 'Failed to mark notification as read',
        errors: err.response?.data?.errors,
      });
    }
  }
);