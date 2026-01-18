"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/admin/authSlice";
import groupReducer from "./slices/admin/groupSlice";
import departmentReducer from "./slices/admin/departmentSlice";
import roleReducer from "./slices/admin/RoleSlice";
import adminReducer from "./slices/admin/adminSlice";
import releaseReducer from "./slices/admin/releaseSlice";
import userReducer from "./slices/admin/userSlice";
import mediaReducer from "./slices/admin/mediaSlice";
import resourcesReducer from "./slices/admin/resourcesSlice";
import formReducer from "./slices/admin/formSlice";
import contractReducer from "./slices/admin/contract";
import userAuthReducer from "./slices/user/authSlice";
import userHomeReducer from "./slices/user/homeSlice";
import userAboutReducer from "./slices/user/aboutSlice";
import userResourceReducer from "./slices/user/resourceSlice";
import userReleaseReducer from "./slices/user/releaseSlice";
import userLeaveReducer from "./slices/user/leaveSlice";
import aboutReducer from "./slices/admin/aboutSlice";
import bannerReducer from "./slices/admin/bannerSlice";
import profileReducer from "./slices/admin/profileSlice";
import userContractReducer from "./slices/user/contractSlice";
import userFormReducer from "./slices/user/formSlice";
import chatReducer from "./slices/user/chatSlice";

const rootReducer = combineReducers({
  // Admin Side
  auth: authReducer,
  group: groupReducer,
  department: departmentReducer,
  role: roleReducer,
  admin: adminReducer,
  release: releaseReducer,
  user: userReducer,
  media: mediaReducer,
  page: resourcesReducer,
  form: formReducer,
  contract: contractReducer,
  about: aboutReducer,
  banner: bannerReducer,
  profile: profileReducer,

  // User Side
  userAuth: userAuthReducer,
  userHome: userHomeReducer,
  userAbout: userAboutReducer,
  userResource: userResourceReducer,
  userContract: userContractReducer,
  userForm: userFormReducer,
  userRelease: userReleaseReducer,
  userLeave: userLeaveReducer,
  chat: chatReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
