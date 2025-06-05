import { fetchAdminList, fetchCreateAdmin, fetchDeleteAdmin, fetchDetailAdmin, fetchEditAdmin } from "@/store/thunks/admin/adminThunk";
import { Admin, AdminList, AdminState } from "@/types/admin";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AdminState = {
  loading: false,
  adminErrors: undefined,
  success: false,
  adminMessage: '',
  adminParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  adminList: {} as AdminList,
  adminDetail: {} as Admin,
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.adminErrors = undefined;
    },
    updateParams: (state, action) => {
      state.adminParams = action.payload
    },
    resetMessage: (state) => {
      state.success = false;
      state.adminMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchAdminList
      .addCase(fetchAdminList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAdminList.fulfilled, (state, action) => {
        state.loading = false;
        state.adminList = action.payload;
      })
      .addCase(fetchAdminList.rejected, (state, action) => {
        state.loading = false;
        state.adminErrors = action.payload;
      })
      // fetchCreateAdmin
      .addCase(fetchCreateAdmin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.adminMessage = action.payload.message;
      })
      .addCase(fetchCreateAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.adminErrors = action.payload;
      })
      // fetchDetailAdmin
      .addCase(fetchDetailAdmin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.adminDetail = action.payload;
      })
      .addCase(fetchDetailAdmin.rejected, (state, action) => {
        state.loading = false;
        state.adminErrors = action.payload;
      })
      // fetchEditAdmin
      .addCase(fetchEditAdmin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.adminMessage = action.payload.message;
      })
      .addCase(fetchEditAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.adminErrors = action.payload;
      })
      // fetchDeleteAdmin
      .addCase(fetchDeleteAdmin.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.adminMessage = action.payload.message;
      })
      .addCase(fetchDeleteAdmin.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.adminErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updateParams, resetMessage} = adminSlice.actions;

const {reducer: adminReducer} = adminSlice;
export default adminReducer;