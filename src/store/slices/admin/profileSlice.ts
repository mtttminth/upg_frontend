
import { fetchDetailProfile, fetchEditProfile } from "@/store/thunks/admin/profileThunk";
import { ProfileDetail, ProfileState } from "@/types/profile";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ProfileState = {
  loading: false,
  profileErrors: undefined,
  success: false,
  profileMessage: '',
  profileDetail: {} as ProfileDetail,
}

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.profileErrors = undefined;
    },
    resetMessage: (state) => {
      state.success = false;
      state.profileMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchDetailProfile
      .addCase(fetchDetailProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileDetail = action.payload;
      })
      .addCase(fetchDetailProfile.rejected, (state, action) => {
        state.loading = false;
        state.profileErrors = action.payload;
      })
      // fetchEditProfile
      .addCase(fetchEditProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.profileMessage = action.payload.message;
      })
      .addCase(fetchEditProfile.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.profileErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage} = profileSlice.actions;

const {reducer: profileReducer} = profileSlice;
export default profileReducer;