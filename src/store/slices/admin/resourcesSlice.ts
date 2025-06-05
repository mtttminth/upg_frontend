import { fetchCreatePage, fetchDeletePage, fetchPageList, fetchDetailPage, fetchEditPage, fetchDeleteCategory, fetchEditCategory, fetchDetailCategory, fetchCreateCategory, fetchCategoryList, fetchSubCategoryList, fetchCreateSubCategory, fetchDetailSubCategory, fetchEditSubCategory, fetchDeleteSubCategory, fetchAllCategoryList, fetchSubCategoryListByCategoryId } from "@/store/thunks/admin/resourcesThunk";
import { Category, CategoryList, Page, PageDetail, PageList, PageState, SubCategory, SubCategoryList } from "@/types/page";
import { createSlice } from "@reduxjs/toolkit";

const initialState: PageState = {
  loading: false,
  pageErrors: undefined,
  success: false,
  pageMessage: '',
  pageParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  pageList: {} as PageList,
  pageDetail: {} as PageDetail,
  categoryParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  categoryList: {} as CategoryList,
  categoryDetail: {} as Category,
  subCategoryParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  subCategoryList: {} as SubCategoryList,
  subCategoryDetail: {} as SubCategory,
  allCategoryList: [],
  allSubCategoryList: []
}

const resourceSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.pageErrors = undefined;
    },
    updatePageParams: (state, action) => {
      state.pageParams = action.payload;
    },
    updateCategoryParams: (state, action) => {
      state.categoryParams = action.payload;
    },
    updateSubCategoryParams: (state, action) => {
      state.subCategoryParams = action.payload;
    },
    resetMessage: (state) => {
      state.success = false;
      state.pageMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchPageList
      .addCase(fetchPageList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPageList.fulfilled, (state, action) => {
        state.loading = false;
        state.pageList = action.payload;
      })
      .addCase(fetchPageList.rejected, (state, action) => {
        state.loading = false;
        state.pageErrors = action.payload;
      })
      // fetchCreatePage
      .addCase(fetchCreatePage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreatePage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchCreatePage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })
      // fetchDetailPage
      .addCase(fetchDetailPage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailPage.fulfilled, (state, action) => {
        state.loading = false;
        state.pageDetail = action.payload;
      })
      .addCase(fetchDetailPage.rejected, (state, action) => {
        state.loading = false;
        state.pageErrors = action.payload;
      })
      // fetchEditPage
      .addCase(fetchEditPage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditPage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchEditPage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })
      // fetchDeletePage
      .addCase(fetchDeletePage.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeletePage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchDeletePage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })

    // Categories
      // fetchCategoryList
      .addCase(fetchCategoryList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.pageErrors = action.payload;
      })
      // fetchCreateCategory
      .addCase(fetchCreateCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchCreateCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })
      // fetchDetailCategory
      .addCase(fetchDetailCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryDetail = action.payload;
      })
      .addCase(fetchDetailCategory.rejected, (state, action) => {
        state.loading = false;
        state.pageErrors = action.payload;
      })
      // fetchEditCategory
      .addCase(fetchEditCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchEditCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })
      // fetchDeleteCategory
      .addCase(fetchDeleteCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchDeleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })
      // fetchAllCategoryList
      .addCase(fetchAllCategoryList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.allCategoryList = action.payload;
      })
      .addCase(fetchAllCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.pageErrors = action.payload;
      })
    // SubCategories
      // fetchSubCategoryList
      .addCase(fetchSubCategoryList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSubCategoryList.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryList = action.payload;
      })
      .addCase(fetchSubCategoryList.rejected, (state, action) => {
        state.loading = false;
        state.pageErrors = action.payload;
      })
      // fetchCreateSubCategory
      .addCase(fetchCreateSubCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchCreateSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })
      // fetchDetailSubCategory
      .addCase(fetchDetailSubCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.subCategoryDetail = action.payload;
      })
      .addCase(fetchDetailSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.pageErrors = action.payload;
      })
      // fetchEditSubCategory
      .addCase(fetchEditSubCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchEditSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })
      // fetchDeleteSubCategory
      .addCase(fetchDeleteSubCategory.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteSubCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.pageMessage = action.payload.message;
      })
      .addCase(fetchDeleteSubCategory.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.pageErrors = action.payload;
      })
      // fetchSubCategoryListByCategoryId
      .addCase(fetchSubCategoryListByCategoryId.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchSubCategoryListByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.allSubCategoryList = action.payload;
      })
      .addCase(fetchSubCategoryListByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.pageErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updatePageParams, updateCategoryParams, updateSubCategoryParams, resetMessage} = resourceSlice.actions;

const {reducer: resourcesReducer} = resourceSlice;
export default resourcesReducer;