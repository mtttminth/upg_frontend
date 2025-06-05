import { fetchAllTypeList, fetchCreateContract, fetchCreateContractType, fetchDeleteContract, fetchDeleteContractType, fetchDetailContract, fetchDetailContractType, fetchEditContract, fetchEditContractType, fetchContractList, fetchContractTypeList } from "@/store/thunks/admin/contractThunk";
import { Contract, ContractDetail, ContractList, ContractState, ContractType, ContractTypeList } from "@/types/contract";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ContractState = {
  loading: false,
  contractErrors: undefined,
  success: false,
  contractMessage: '',
  contractTypeParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  contractTypeList: {} as ContractTypeList,
  contractTypeDetail: {} as ContractType,
  allContractType: [],
  contractParams: {
    page: 0,
    perPage: 10,
    fromDate: null,
    toDate: null,
    keyword: '',
  },
  contractList: {} as ContractList,
  contractDetail: {} as ContractDetail,
}

const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.contractErrors = undefined;
    },
    updateContractTypeParams: (state, action) => {
      state.contractTypeParams = action.payload;
    },
    updateContractParams: (state, action) => {
      state.contractParams = action.payload;
    },
    resetMessage: (state) => {
      state.success = false;
      state.contractMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchContractTypeList
      .addCase(fetchContractTypeList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchContractTypeList.fulfilled, (state, action) => {
        state.loading = false;
        state.contractTypeList = action.payload;
      })
      .addCase(fetchContractTypeList.rejected, (state, action) => {
        state.loading = false;
        state.contractErrors = action.payload;
      })
      // fetchCreateContractType
      .addCase(fetchCreateContractType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateContractType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contractMessage = action.payload.message;
      })
      .addCase(fetchCreateContractType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.contractErrors = action.payload;
      })
      // fetchDetailContractType
      .addCase(fetchDetailContractType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailContractType.fulfilled, (state, action) => {
        state.loading = false;
        state.contractTypeDetail = action.payload;
      })
      .addCase(fetchDetailContractType.rejected, (state, action) => {
        state.loading = false;
        state.contractErrors = action.payload;
      })
      // fetchEditContractType
      .addCase(fetchEditContractType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditContractType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contractMessage = action.payload.message;
      })
      .addCase(fetchEditContractType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.contractErrors = action.payload;
      })
      // fetchDeleteContractType
      .addCase(fetchDeleteContractType.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteContractType.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contractMessage = action.payload.message;
      })
      .addCase(fetchDeleteContractType.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.contractErrors = action.payload;
      })
      // fetchAllTypeList
      .addCase(fetchAllTypeList.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchAllTypeList.fulfilled, (state, action) => {
        state.loading = false;
        state.allContractType = action.payload;
      })
      .addCase(fetchAllTypeList.rejected, (state, action) => {
        state.loading = false;
        state.contractErrors = action.payload;
      })
    // Contracts
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
      // fetchCreateContract
      .addCase(fetchCreateContract.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCreateContract.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contractMessage = action.payload.message;
      })
      .addCase(fetchCreateContract.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.contractErrors = action.payload;
      })
      // fetchDetailContract
      .addCase(fetchDetailContract.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDetailContract.fulfilled, (state, action) => {
        state.loading = false;
        state.contractDetail = action.payload;
      })
      .addCase(fetchDetailContract.rejected, (state, action) => {
        state.loading = false;
        state.contractErrors = action.payload;
      })
      // fetchEditContract
      .addCase(fetchEditContract.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchEditContract.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contractMessage = action.payload.message;
      })
      .addCase(fetchEditContract.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.contractErrors = action.payload;
      })
      // fetchDeleteContract
      .addCase(fetchDeleteContract.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchDeleteContract.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.contractMessage = action.payload.message;
      })
      .addCase(fetchDeleteContract.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.contractErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, updateContractTypeParams, updateContractParams, resetMessage} = contractSlice.actions;

const {reducer: contractReducer} = contractSlice;
export default contractReducer;