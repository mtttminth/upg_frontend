
import { fetchPolicyMission } from "@/store/thunks/user/aboutThunk";
import { fetchDepartmentList, fetchReleaseList, fetchReleaseDetail, fetchReleaseCreatedBys } from "@/store/thunks/user/releaseThunk";
import { ReleaseList, UserReleaseState, ReleaseDetail } from "@/types/user-release";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserReleaseState = {
  loading: false,
  releaseErrors: undefined,
  success: false,
  releaseMessage: "",
  releaseParams: {
    page: 1,
    perPage: 15,
    keyword: "",
    created_by_ids: []
  },
  releaseList: {} as ReleaseList,
  departmentList: [],
  releaseDetail: {} as ReleaseDetail,
  releaseCreatedBys: [],
}

const userReleaseSlice = createSlice({
  name: 'user-release',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.releaseErrors = undefined;
    },
    updateParams: (state, action) => {
      state.releaseParams = {
        ...state.releaseParams,
        ...action.payload
      };
    },
    resetMessage: (state) => {
      state.success = false;
      state.releaseMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchReleaseList
      .addCase(fetchReleaseList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchReleaseList.fulfilled, (state, action) => {
        state.loading = false;
        state.releaseList = action.payload;
      })
      .addCase(fetchReleaseList.rejected, (state, action) => {
        state.loading = false;
        state.releaseErrors = action.payload;
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
        state.releaseErrors = action.payload;
      })
      // fetchReleaseDetail
      .addCase(fetchReleaseDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchReleaseDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.releaseDetail = action.payload;
      })
      .addCase(fetchReleaseDetail.rejected, (state, action) => {
        state.loading = false;
        state.releaseErrors = action.payload;
      })
      // fetchReleaseCreatedBys
      .addCase(fetchReleaseCreatedBys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchReleaseCreatedBys.fulfilled, (state, action) => {
        state.loading = false;
        state.releaseCreatedBys = action.payload;
        console.log('action.payload', action.payload)
      })
      .addCase(fetchReleaseCreatedBys.rejected, (state, action) => {
        state.loading = false;
        state.releaseErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updateParams, resetMessage} = userReleaseSlice.actions;

const {reducer: userReleaseReducer} = userReleaseSlice;
export default userReleaseReducer;