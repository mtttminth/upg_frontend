
import { fetchDepartmentList } from "@/store/thunks/user/releaseThunk";
import { fetchResourceCategories, fetchResourceCreatedBys, fetchResourceDetail, fetchResourceList } from "@/store/thunks/user/resourceThunk";
import { UserResourceState } from "@/types/user-resource";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserResourceState = {
  loading: false,
  resourceErrors: undefined,
  success: false,
  resourceMessage: "",
  resourceParams: {
    page: 1,
    perPage: 15,
    keyword: "",
    created_by_ids: [],
    subcategory_id: 0,
  },
  resourceList: {
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
  resourceDetail: {
    id: 0,
    name: "",
    video_url: "",
    file: "",
    subcategory: "",
    created_by: ""
  },
  categoryList: [],
  departmentList: [],
  resourceCreatedBys: [],
}

const userResourceSlice = createSlice({
  name: 'user-resource',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.resourceErrors = undefined;
    },
    updateParams: (state, action) => {
      state.resourceParams = {
        ...state.resourceParams,
        ...action.payload
      };
    },
    resetMessage: (state) => {
      state.success = false;
      state.resourceMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchResourceCategories
      .addCase(fetchResourceCategories.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchResourceCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryList = action.payload;
      })
      .addCase(fetchResourceCategories.rejected, (state, action) => {
        state.loading = false;
        state.resourceErrors = action.payload;
      })
      // fetchResourceList
      .addCase(fetchResourceList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchResourceList.fulfilled, (state, action) => {
        state.loading = false;
        state.resourceList = action.payload;
      })
      .addCase(fetchResourceList.rejected, (state, action) => {
        state.loading = false;
        state.resourceErrors = action.payload;
      })
      // fetchResourceDetail
      .addCase(fetchResourceDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchResourceDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.resourceDetail = action.payload;
      })
      .addCase(fetchResourceDetail.rejected, (state, action) => {
        state.loading = false;
        state.resourceErrors = action.payload;
      })
      // fetchDepartmentList
      .addCase(fetchDepartmentList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDepartmentList.fulfilled, (state, action) => {
        state.loading = false;
        state.departmentList = action.payload;
      })
      .addCase(fetchDepartmentList.rejected, (state, action) => {
        state.loading = false;
        state.resourceErrors = action.payload;
      })
      // fetchResourceCreatedBys
      .addCase(fetchResourceCreatedBys.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchResourceCreatedBys.fulfilled, (state, action) => {
        state.loading = false;
        state.resourceCreatedBys = action.payload;
      })
      .addCase(fetchResourceCreatedBys.rejected, (state, action) => {
        state.loading = false;
        state.resourceErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage, updateParams} = userResourceSlice.actions;

const {reducer: userResourceReducer} = userResourceSlice;
export default userResourceReducer;