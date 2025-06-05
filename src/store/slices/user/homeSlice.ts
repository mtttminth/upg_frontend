
import { fetchBanner, fetchDashboardOverview, fetchRelease, fetchResources } from "@/store/thunks/user/homeThunk";
import { Banner, DashboardOverview, HomeState } from "@/types/home";
import { createSlice } from "@reduxjs/toolkit";

const initialState: HomeState = {
  loading: false,
  homeErrors: undefined,
  success: false,
  homeMessage: '',
  banner: {} as Banner,
  releaseList: [],
  resourceList: [],
  dashboardOverview: {} as DashboardOverview,
}

const userHomeSlice = createSlice({
  name: 'user-home',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.homeErrors = undefined;
    },
    resetMessage: (state) => {
      state.success = false;
      state.homeErrors = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchBanner
      .addCase(fetchBanner.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.banner = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.loading = false;
        state.homeErrors = action.payload;
      })
      // fetchRelease
      .addCase(fetchRelease.pending, (state, action) => {
        state.homeErrors = undefined;
        state.loading = true;
      })
      .addCase(fetchRelease.fulfilled, (state, action) => {
        state.loading = false;
        state.releaseList = action.payload;
      })
      .addCase(fetchRelease.rejected, (state, action) => {
        state.loading = false;
        state.homeErrors = action.payload;
      })
      // fetchResources
      .addCase(fetchResources.pending, (state, action) => {
        state.homeErrors = undefined;
        state.loading = true;
      })
      .addCase(fetchResources.fulfilled, (state, action) => {
        state.loading = false;
        state.resourceList = action.payload;
      })
      .addCase(fetchResources.rejected, (state, action) => {
        state.loading = false;
        state.homeErrors = action.payload;
      })
      // fetchDashboardOverview
      .addCase(fetchDashboardOverview.pending, (state, action) => {
        state.homeErrors = undefined;
        state.loading = true;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.dashboardOverview = action.payload;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.loading = false;
        state.homeErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage} = userHomeSlice.actions;

const {reducer: userHomeReducer} = userHomeSlice;
export default userHomeReducer;