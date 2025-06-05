import { fetchCreateRole, fetchDeleteRole, fetchDetailRole, fetchEditRole, fetchRoleList } from "@/store/thunks/admin/roleThunk";
import { Role, RoleDetail, RoleList, RoleState } from "@/types/role";
import { createSlice } from "@reduxjs/toolkit";

const initialState: RoleState = {
  loading: false,
  roleErrors: undefined,
  success: false,
  roleMessage: '',
  roleParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  roleList: {} as RoleList,
  roleDetail: {} as RoleDetail,
}

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.roleErrors = undefined;
    },
    updateParams: (state, action) => {
      state.roleParams = action.payload
    },
    resetMessage: (state) => {
      state.success = false;
      state.roleMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
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
        state.roleErrors = action.payload;
      })
      // fetchCreateRole
      .addCase(fetchCreateRole.pending, (state, action) => {
        state.loading = true;
        state.roleErrors = undefined;
      })
      .addCase(fetchCreateRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.roleMessage = action.payload.message;
      })
      .addCase(fetchCreateRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.roleErrors = action.payload;
      })
      // fetchDetailRole
      .addCase(fetchDetailRole.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailRole.fulfilled, (state, action) => {
        state.loading = false;
        state.roleDetail = action.payload;
      })
      .addCase(fetchDetailRole.rejected, (state, action) => {
        state.loading = false;
        state.roleErrors = action.payload;
      })
      // fetchEditRole
      .addCase(fetchEditRole.pending, (state, action) => {
        state.loading = true;
        state.roleErrors = undefined;
      })
      .addCase(fetchEditRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.roleMessage = action.payload.message;
      })
      .addCase(fetchEditRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.roleErrors = action.payload;
      })
      // fetchDeleteRole
      .addCase(fetchDeleteRole.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteRole.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.roleMessage = action.payload.message;
      })
      .addCase(fetchDeleteRole.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.roleErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updateParams, resetMessage} = roleSlice.actions;

const {reducer: roleReducer} = roleSlice;
export default roleReducer;