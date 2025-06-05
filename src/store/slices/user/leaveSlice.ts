
import { fetchDepartment, fetchLeaveType, fetchSubmitLeaveForm } from "@/store/thunks/user/leaveThunk";
import { LeaveState } from "@/types/leave";
import { createSlice } from "@reduxjs/toolkit";

const initialState: LeaveState = {
  success: false,
  loading: false,
  leaveErrors: undefined,
  departmentList: [],
  leaveTypeList: [],
  leaveMessage: ""
}

const userLeaveSlice = createSlice({
  name: 'user-leave',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.leaveErrors = undefined;
    },
    resetMessage: (state) => {
      state.success = false;
      state.leaveMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchDepartment
      .addCase(fetchDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentList = action.payload;
      })
      .addCase(fetchDepartment.rejected, (state, action) => {
        state.loading = false;
      })
      // fetchLeaveType
      .addCase(fetchLeaveType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchLeaveType.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveTypeList = action.payload;
      })
      .addCase(fetchLeaveType.rejected, (state, action) => {
        state.loading = false;
      })
      // fetchSubmitLeaveForm
      .addCase(fetchSubmitLeaveForm.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSubmitLeaveForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.leaveMessage = action.payload.message;
      })
      .addCase(fetchSubmitLeaveForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.leaveErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage} = userLeaveSlice.actions;

const {reducer: userLeaveReducer} = userLeaveSlice;
export default userLeaveReducer;