
import { fetchFormTypes, fetchFormDetail, fetchFormList } from "@/store/thunks/user/formThunk";
import { UserFormState } from "@/types/user-form";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserFormState = {
  loading: false,
  formErrors: undefined,
  success: false,
  formMessage: "",
  formParams: {
    page: 1,
    perPage: 15,
    keyword: "",
    form_type_id: 0,
  },
  formList: {
    data: [],
    links: {
      first: "",
      last: "",
      prev: null,
      next: null
    },
    meta: {
      current_page: 0,
      from: 0,
      last_page: 0,
      links: undefined,
      path: "",
      per_page: 0,
      to: 0,
      total: 0
    }
  },
  formDetail: {
    id: 0,
    name: "",
    file: "",
    formType: ""
  },
  formTypeList: []
}

const userFormSlice = createSlice({
  name: 'user-form',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.formErrors = undefined;
    },
    updateParams: (state, action) => {
      state.formParams = {
        ...state.formParams,
        ...action.payload
      };
    },
    resetMessage: (state) => {
      state.success = false;
      state.formMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchFormTypes
      .addCase(fetchFormTypes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFormTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.formTypeList = action.payload;
      })
      .addCase(fetchFormTypes.rejected, (state, action) => {
        state.loading = false;
        state.formErrors = action.payload;
      })
      // fetchFormList
      .addCase(fetchFormList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFormList.fulfilled, (state, action) => {
        state.loading = false;
        state.formList = action.payload;
      })
      .addCase(fetchFormList.rejected, (state, action) => {
        state.loading = false;
        state.formErrors = action.payload;
      })
      // fetchFormDetail
      .addCase(fetchFormDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFormDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.formDetail = action.payload;
      })
      .addCase(fetchFormDetail.rejected, (state, action) => {
        state.loading = false;
        state.formErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage, updateParams} = userFormSlice.actions;

const {reducer: userFormReducer} = userFormSlice;
export default userFormReducer;