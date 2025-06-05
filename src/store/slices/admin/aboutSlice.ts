
import { fetchDetailAbout, fetchEditAbout } from "@/store/thunks/admin/aboutThunk";
import { AboutDetail, AboutState } from "@/types/about";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AboutState = {
  loading: false,
  aboutErrors: undefined,
  success: false,
  aboutMessage: '',
  aboutDetail: {} as AboutDetail,
}

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.aboutErrors = undefined;
    },
    resetMessage: (state) => {
      state.success = false;
      state.aboutMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchDetailAbout
      .addCase(fetchDetailAbout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.aboutDetail = action.payload;
      })
      .addCase(fetchDetailAbout.rejected, (state, action) => {
        state.loading = false;
        state.aboutErrors = action.payload;
      })
      // fetchEditAbout
      .addCase(fetchEditAbout.pending, (state, action) => {
        state.aboutErrors = undefined;
        state.loading = true;
      })
      .addCase(fetchEditAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.aboutMessage = action.payload.message;
      })
      .addCase(fetchEditAbout.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.aboutErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage} = aboutSlice.actions;

const {reducer: aboutReducer} = aboutSlice;
export default aboutReducer;