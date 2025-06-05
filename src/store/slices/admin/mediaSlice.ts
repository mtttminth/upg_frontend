import { MediaState } from "@/types/media";
import { createSlice } from "@reduxjs/toolkit";

const initialState: MediaState = {
  loading: false,
  mediaErrors: undefined,
  success: false,
  mediaMessage: '',
  images: [],
  uploadedfiles: [],
  policyFile: [],
  commitmentFile: [],
  organizationFile: [],
  companyProfileFile: [],
  videoUrl: '',
}

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.mediaErrors = undefined;
    },
    resetMessage: (state) => {
      state.success = false;
      state.mediaMessage = ''; 
    },
    updateFiles: (state, action) => {
      state.images = action.payload;
    },
    resetImages: (state) => {
      state.images = [];
    },
    setImages: (state, action) => {
      state.images = action.payload;
    },
    updatePageFile: (state, action) => {
      state.uploadedfiles = action.payload;
    },
    resetPageFile: (state) => {
      state.uploadedfiles = [];
    },
    setFile: (state, action) => {
      state.uploadedfiles = action.payload;
    },
    // Policy 
    updatePolicyFile: (state, action) => {
      state.policyFile = action.payload;
    },
    resetPolicyFile: (state) => {
      state.policyFile = [];
    },
    setPolicyFile: (state, action) => {
      state.policyFile = action.payload;
    },
    // Commitment 
    updateCommitmentFile: (state, action) => {
      state.commitmentFile = action.payload;
    },
    resetCommitmentFile: (state) => {
      state.commitmentFile = [];
    },
    setCommitmentFile: (state, action) => {
      state.commitmentFile = action.payload;
    },
    // Organization 
    updateOrganizationFile: (state, action) => {
      state.organizationFile = action.payload;
    },
    resetOrganizationFile: (state) => {
      state.organizationFile = [];
    },
    setOrganizationFile: (state, action) => {
      state.organizationFile = action.payload;
    },
    // CompanyProfile 
    updateCompanyProfileFile: (state, action) => {
      state.companyProfileFile = action.payload;
    },
    resetCompanyProfileFile: (state) => {
      state.companyProfileFile = [];
    },
    setCompanyProfileFile: (state, action) => {
      state.companyProfileFile = action.payload;
    }
  },
  extraReducers: builder => {
    
  }
})

export const {initialise, resetErrors, resetMessage, updateFiles, resetImages, setImages,
  updatePageFile, resetPageFile, setFile,
  updatePolicyFile, resetPolicyFile, setPolicyFile,
  updateCommitmentFile, resetCommitmentFile, setCommitmentFile,
  updateOrganizationFile, resetOrganizationFile, setOrganizationFile,
  updateCompanyProfileFile, resetCompanyProfileFile, setCompanyProfileFile,
} = mediaSlice.actions;

const {reducer: mediaReducer} = mediaSlice;
export default mediaReducer;