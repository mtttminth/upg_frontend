
import { USER } from "@/consts/common";
import tokenService from "@/services/tokenService";
import { fetchUserLogin, fetchUserLogout, fetchUserNotification, fetchUserProfile } from "@/store/thunks/user/authThunk";
import { authUserState, UserNotification, UserProfile } from "@/types/auth";
import { createSlice } from "@reduxjs/toolkit";

const initialState: authUserState = {
  loading: false,
  userAuthErrors: undefined,
  isUserAuthenticated: !!tokenService.getAccessToken(USER),
  userProfile: {} as UserProfile,
  userNotification: [],
}

const userAuthSlice = createSlice({
  name: 'user-auth',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.userAuthErrors = undefined;
    },
    markNotificationAsRead: (state, action) => {
      const identifier = action.payload; // Could be notification ID or reference_id
      const notificationIndex = state.userNotification.findIndex(
        (noti) => noti.id === identifier || noti.reference_id === identifier
      );
      if (notificationIndex !== -1) {
        state.userNotification.splice(notificationIndex, 1);
      }
    },
  },
  extraReducers: builder => {
    builder
      // fetchUserLogin
      .addCase(fetchUserLogin.pending, (state, action) => {
        state.loading = true;
        userAuthSlice.caseReducers.resetErrors(state);
      })
      .addCase(fetchUserLogin.fulfilled, (state, action) => {
        state.loading = false;
        const accessToken = action.payload.token;
        tokenService.setToken(accessToken, USER);
        state.isUserAuthenticated = true;
      })
      .addCase(fetchUserLogin.rejected, (state, action) => {
        state.loading = false;
        state.userAuthErrors = action.payload;
      })
      // fetchUserLogout
      .addCase(fetchUserLogout.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserLogout.fulfilled, (state, action) => {
        state.loading = false;
        tokenService.resetToken(USER);
        state.isUserAuthenticated = false;
      })
      .addCase(fetchUserLogout.rejected, (state, action) => {
        state.loading = false;
        tokenService.resetToken(USER);
        state.isUserAuthenticated = false;
      })
      // fetchUserProfile
      .addCase(fetchUserProfile.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfile = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.userAuthErrors = action.payload;
      })
      // fetchUserNotification
      .addCase(fetchUserNotification.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.userNotification = action.payload;
      })
      .addCase(fetchUserNotification.rejected, (state, action) => {
        state.loading = false;
        state.userAuthErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, markNotificationAsRead} = userAuthSlice.actions;

const {reducer: userAuthReducer} = userAuthSlice;
export default userAuthReducer;