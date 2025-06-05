
import { fetchDetailBanner, fetchEditBanner } from "@/store/thunks/admin/bannerThunk";
import { BannerDetail, BannerState } from "@/types/banner";
import { createSlice } from "@reduxjs/toolkit";

const initialState: BannerState = {
  loading: false,
  bannerErrors: undefined,
  success: false,
  bannerMessage: '',
  bannerDetail: {} as BannerDetail,
}

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.bannerErrors = undefined;
    },
    resetMessage: (state) => {
      state.success = false;
      state.bannerMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchDetailBanner
      .addCase(fetchDetailBanner.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.bannerDetail = action.payload;
      })
      .addCase(fetchDetailBanner.rejected, (state, action) => {
        state.loading = false;
        state.bannerErrors = action.payload;
      })
      // fetchEditBanner
      .addCase(fetchEditBanner.pending, (state, action) => {
        state.bannerErrors = undefined;
        state.loading = true;
      })
      .addCase(fetchEditBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.bannerMessage = action.payload.message;
      })
      .addCase(fetchEditBanner.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.bannerErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage} = bannerSlice.actions;

const {reducer: bannerReducer} = bannerSlice;
export default bannerReducer;