import { fetchCreateDepartment, fetchDeleteDepartment, fetchDepartmentList, fetchDetailDepartment, fetchEditDepartment } from "@/store/thunks/admin/departmentThunk";
import { Department, DepartmentList, DepartmentState } from "@/types/department";
import { createSlice } from "@reduxjs/toolkit";

const initialState: DepartmentState = {
  loading: false,
  departmentErrors: undefined,
  success: false,
  departmentMessage: '',
  departmentParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  departmentList: {} as DepartmentList,
  departmentDetail: {} as Department,
}

const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.departmentErrors = undefined;
    },
    updateParams: (state, action) => {
      state.departmentParams = action.payload;
    },
    resetMessage: (state) => {
      state.success = false;
      state.departmentMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
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
        state.departmentErrors = action.payload;
      })
      // fetchCreateDepartment
      .addCase(fetchCreateDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.departmentMessage = action.payload.message;
      })
      .addCase(fetchCreateDepartment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.departmentErrors = action.payload;
      })
      // fetchDetailDepartment
      .addCase(fetchDetailDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentDetail = action.payload;
      })
      .addCase(fetchDetailDepartment.rejected, (state, action) => {
        state.loading = false;
        state.departmentErrors = action.payload;
      })
      // fetchEditDepartment
      .addCase(fetchEditDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.departmentMessage = action.payload.message;
      })
      .addCase(fetchEditDepartment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.departmentErrors = action.payload;
      })
      // fetchDeleteDepartment
      .addCase(fetchDeleteDepartment.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.departmentMessage = action.payload.message;
      })
      .addCase(fetchDeleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.departmentErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updateParams, resetMessage} = departmentSlice.actions;

const {reducer: departmentReducer} = departmentSlice;
export default departmentReducer;