import { fetchAllTypeList, fetchCreateForm, fetchCreateFormType, fetchDeleteForm, fetchDeleteFormType, fetchDetailForm, fetchDetailFormType, fetchEditForm, fetchEditFormType, fetchFormList, fetchFormTypeList } from "@/store/thunks/admin/formThunk";
import { Form, FormDetail, FormList, FormState, FormType, FormTypeList } from "@/types/form";
import { createSlice } from "@reduxjs/toolkit";

const initialState: FormState = {
  loading: false,
  formErrors: undefined,
  success: false,
  formMessage: '',
  formTypeParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  formTypeList: {} as FormTypeList,
  formTypeDetail: {} as FormType,
  allFormType: [],
  formParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  formList: {} as FormList,
  formDetail: {} as FormDetail,
}

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.formErrors = undefined;
    },
    updateFormTypeParams: (state, action) => {
      state.formTypeParams = action.payload;
    },
    updateFormParams: (state, action) => {
      state.formParams = action.payload;
    },
    resetMessage: (state) => {
      state.success = false;
      state.formMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchFormTypeList
      .addCase(fetchFormTypeList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchFormTypeList.fulfilled, (state, action) => {
        state.loading = false;
        state.formTypeList = action.payload;
      })
      .addCase(fetchFormTypeList.rejected, (state, action) => {
        state.loading = false;
        state.formErrors = action.payload;
      })
      // fetchCreateFormType
      .addCase(fetchCreateFormType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateFormType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formMessage = action.payload.message;
      })
      .addCase(fetchCreateFormType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.formErrors = action.payload;
      })
      // fetchDetailFormType
      .addCase(fetchDetailFormType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailFormType.fulfilled, (state, action) => {
        state.loading = false;
        state.formTypeDetail = action.payload;
      })
      .addCase(fetchDetailFormType.rejected, (state, action) => {
        state.loading = false;
        state.formErrors = action.payload;
      })
      // fetchEditFormType
      .addCase(fetchEditFormType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditFormType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formMessage = action.payload.message;
      })
      .addCase(fetchEditFormType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.formErrors = action.payload;
      })
      // fetchDeleteFormType
      .addCase(fetchDeleteFormType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteFormType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formMessage = action.payload.message;
      })
      .addCase(fetchDeleteFormType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.formErrors = action.payload;
      })
      // fetchAllTypeList
      .addCase(fetchAllTypeList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllTypeList.fulfilled, (state, action) => {
        state.loading = false;
        state.allFormType = action.payload;
      })
      .addCase(fetchAllTypeList.rejected, (state, action) => {
        state.loading = false;
        state.formErrors = action.payload;
      })
    // Forms
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
      // fetchCreateForm
      .addCase(fetchCreateForm.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formMessage = action.payload.message;
      })
      .addCase(fetchCreateForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.formErrors = action.payload;
      })
      // fetchDetailForm
      .addCase(fetchDetailForm.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailForm.fulfilled, (state, action) => {
        state.loading = false;
        state.formDetail = action.payload;
      })
      .addCase(fetchDetailForm.rejected, (state, action) => {
        state.loading = false;
        state.formErrors = action.payload;
      })
      // fetchEditForm
      .addCase(fetchEditForm.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formMessage = action.payload.message;
      })
      .addCase(fetchEditForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.formErrors = action.payload;
      })
      // fetchDeleteForm
      .addCase(fetchDeleteForm.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteForm.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.formMessage = action.payload.message;
      })
      .addCase(fetchDeleteForm.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.formErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updateFormTypeParams, updateFormParams, resetMessage} = formSlice.actions;

const {reducer: formReducer} = formSlice;
export default formReducer;