
import { fetchContractTypes, fetchContractDetail, fetchContractList } from "@/store/thunks/user/contractThunk";
import { UserContractState } from "@/types/user-contract";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserContractState = {
  loading: false,
  contractErrors: undefined,
  success: false,
  contractMessage: "",
  contractParams: {
    page: 1,
    perPage: 15,
    keyword: "",
    contract_type_id: 0,
  },
  contractList: {
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
  contractDetail: {
    id: 0,
    name: "",
    file: "",
    contractType: ""
  },
  contractTypeList: []
}

const userContractSlice = createSlice({
  name: 'user-contract',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.contractErrors = undefined;
    },
    updateParams: (state, action) => {
      state.contractParams = {
        ...state.contractParams,
        ...action.payload
      };
    },
    resetMessage: (state) => {
      state.success = false;
      state.contractMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchContractTypes
      .addCase(fetchContractTypes.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContractTypes.fulfilled, (state, action) => {
        state.loading = false;
        state.contractTypeList = action.payload;
      })
      .addCase(fetchContractTypes.rejected, (state, action) => {
        state.loading = false;
        state.contractErrors = action.payload;
      })
      // fetchContractList
      .addCase(fetchContractList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContractList.fulfilled, (state, action) => {
        state.loading = false;
        state.contractList = action.payload;
      })
      .addCase(fetchContractList.rejected, (state, action) => {
        state.loading = false;
        state.contractErrors = action.payload;
      })
      // fetchContractDetail
      .addCase(fetchContractDetail.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContractDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.contractDetail = action.payload;
      })
      .addCase(fetchContractDetail.rejected, (state, action) => {
        state.loading = false;
        state.contractErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage, updateParams} = userContractSlice.actions;

const {reducer: userContractReducer} = userContractSlice;
export default userContractReducer;