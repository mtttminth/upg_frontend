import { fetchUserList, fetchCreateUser, fetchEditUser, fetchDeleteUser, fetchDetailUser } from "@/store/thunks/admin/userThunk";
import { User, UserList, UserState } from "@/types/user";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserState = {
  loading: false,
  userErrors: undefined,
  success: false,
  userMessage: '',
  userParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  userList: {} as UserList,
  userDetail: {} as User,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.userErrors = undefined;
    },
    updateParams: (state, action) => {
      state.userParams = action.payload
    },
    resetMessage: (state) => {
      state.success = false;
      state.userMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchUserList
      .addCase(fetchUserList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.loading = false;
        state.userErrors = action.payload;
      })
      // fetchCreateUser
      .addCase(fetchCreateUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userMessage = action.payload.message;
      })
      .addCase(fetchCreateUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userErrors = action.payload;
      })
      // fetchDetailUser
      .addCase(fetchDetailUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailUser.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetail = action.payload;
      })
      .addCase(fetchDetailUser.rejected, (state, action) => {
        state.loading = false;
        state.userErrors = action.payload;
      })
      // fetchEditUser
      .addCase(fetchEditUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userMessage = action.payload.message;
      })
      .addCase(fetchEditUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userErrors = action.payload;
      })
      // fetchDeleteUser
      .addCase(fetchDeleteUser.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.userMessage = action.payload.message;
      })
      .addCase(fetchDeleteUser.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.userErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updateParams, resetMessage} = userSlice.actions;

const {reducer: userReducer} = userSlice;
export default userReducer;