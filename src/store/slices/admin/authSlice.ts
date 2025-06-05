import { ADMIN } from '@/consts/common';
import tokenService from '@/services/tokenService';
import { fetchDepartmentList, fetchLogin, fetchLogout, fetchPermission, fetchPermissionList, fetchRoleList } from '@/store/thunks/admin/authThunk';
import { authState } from '@/types/auth';
import {createSlice} from '@reduxjs/toolkit';

const initialState: authState = {
  loading: false,
  authErrors: undefined,
  isAuthenticated: !!tokenService.getAccessToken(ADMIN),
  permissions: [],
  permissionsList: [],
  roleList: [],
  departmentList: [],
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.authErrors = undefined;
    },
  },
  extraReducers: builder => {
    builder
      // fetchLogin
      .addCase(fetchLogin.pending, (state, action) => {
        state.loading = true;
        authSlice.caseReducers.resetErrors(state);
      })
      .addCase(fetchLogin.fulfilled, (state, action) => {
        state.loading = false;
        const accessToken = action.payload.token;
        tokenService.setToken(accessToken, ADMIN);
        state.isAuthenticated = true;
      })
      .addCase(fetchLogin.rejected, (state, action) => {
        state.loading = false;
        state.authErrors = action.payload;
      })
      // fetchLogout
      .addCase(fetchLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.loading = false;
        tokenService.resetToken(ADMIN);
        state.isAuthenticated = false;
      })
      .addCase(fetchLogout.rejected, (state, action) => {
        state.loading = false;
        tokenService.resetToken(ADMIN);
        state.isAuthenticated = false;
      })
      // fetchPermission
      .addCase(fetchPermission.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPermission.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload.permissions;
      })
      .addCase(fetchPermission.rejected, (state, action) => {
        state.loading = false;
      })
      // fetchPermissionList
      .addCase(fetchPermissionList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPermissionList.fulfilled, (state, action) => {
        state.loading = false;
        state.permissionsList = action.payload.permissions;
      })
      .addCase(fetchPermissionList.rejected, (state, action) => {
        state.loading = false;
      })
      // fetchRoleList
      .addCase(fetchRoleList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchRoleList.fulfilled, (state, action) => {
        state.loading = false;
        state.roleList = action.payload;
      })
      .addCase(fetchRoleList.rejected, (state, action) => {
        state.loading = false;
      })
      // fetchDepartmentList
      .addCase(fetchDepartmentList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDepartmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentList = action.payload;
      })
      .addCase(fetchDepartmentList.rejected, (state, action) => {
        state.loading = false;
      })
  }
})

export const {initialise, resetErrors} = authSlice.actions;

const {reducer: authReducer} = authSlice;
export default authReducer;