import { fetchReleaseList, fetchCreateRelease, fetchDeleteRelease, fetchDetailRelease, fetchEditRelease } from "@/store/thunks/admin/releaseThunk";
import { Release, ReleaseDetail, ReleaseList, ReleaseState } from "@/types/release";
import { GroupList } from "@/types/group";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ReleaseState = {
  loading: false,
  releaseErrors: undefined,
  success: false,
  releaseMessage: '',
  releaseParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  releaseList: {} as ReleaseList,
  releaseDetail: {} as ReleaseDetail,
  departmentKeywordSearch: '',
  groupList: {} as GroupList,
  selectedGroupDraft: [],
}

const releaseSlice = createSlice({
  name: 'release',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.releaseErrors = undefined;
    },
    updateParams: (state, action) => {
      state.releaseParams = action.payload;
    },
    resetMessage: (state) => {
      state.success = false;
      state.releaseMessage = ''; 
    },
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
      // fetchCreateRelease
      .addCase(fetchCreateRelease.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateRelease.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.releaseMessage = action.payload.message;
      })
      .addCase(fetchCreateRelease.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.releaseErrors = action.payload;
      })
      // fetchDetailRelease
      .addCase(fetchDetailRelease.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailRelease.fulfilled, (state, action) => {
        state.loading = false;
        state.releaseDetail = action.payload;
      })
      .addCase(fetchDetailRelease.rejected, (state, action) => {
        state.loading = false;
        state.releaseErrors = action.payload;
      })
      // fetchEditRelease
      .addCase(fetchEditRelease.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditRelease.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.releaseMessage = action.payload.message;
      })
      .addCase(fetchEditRelease.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.releaseErrors = action.payload;
      })
      // fetchDeleteRelease
      .addCase(fetchDeleteRelease.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteRelease.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.releaseMessage = action.payload.message;
      })
      .addCase(fetchDeleteRelease.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.releaseErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updateParams, resetMessage} = releaseSlice.actions;

const {reducer: releaseReducer} = releaseSlice;
export default releaseReducer;