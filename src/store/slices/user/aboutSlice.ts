
import { fetchOrganization, fetchOurCommitments, fetchPolicyMission, fetchCompanyProfileVideo } from "@/store/thunks/user/aboutThunk";
import { UserAboutState } from "@/types/user-about";
import { createSlice } from "@reduxjs/toolkit";

const initialState: UserAboutState = {
  loading: false,
  aboutErrors: undefined,
  success: false,
  aboutMessage: "",
  policy_and_mission: "",
  our_commitments: "",
  company_organization_structure: "",
  company_profile:"",
  video_url: "",
}

const userAboutSlice = createSlice({
  name: 'user-about',
  initialState,
  reducers: {
    initialise: (state) => {
      return initialState;
    },
    resetErrors: (state) => {
      state.aboutErrors = undefined;
    },
    resetMessage: (state) => {
      state.success = false;
      state.aboutMessage = ''; 
    }
  },
  extraReducers: builder => {
    builder
      // fetchPolicyMission
      .addCase(fetchPolicyMission.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchPolicyMission.fulfilled, (state, action) => {
        state.loading = false;
        state.policy_and_mission = action.payload.policy_and_mission;
      })
      .addCase(fetchPolicyMission.rejected, (state, action) => {
        state.loading = false;
        state.aboutErrors = action.payload;
      })
      // fetchOurCommitments
      .addCase(fetchOurCommitments.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOurCommitments.fulfilled, (state, action) => {
        state.loading = false;
        state.our_commitments = action.payload.our_commitments;
      })
      .addCase(fetchOurCommitments.rejected, (state, action) => {
        state.loading = false;
        state.aboutErrors = action.payload;
      })
      // fetchOrganization
      .addCase(fetchOrganization.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchOrganization.fulfilled, (state, action) => {
        state.loading = false;
        state.company_organization_structure = action.payload.company_organization_structure;
      })
      .addCase(fetchOrganization.rejected, (state, action) => {
        state.loading = false;
        state.aboutErrors = action.payload;
      })
      // fetchCompanyProfileVideo
      .addCase(fetchCompanyProfileVideo.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchCompanyProfileVideo.fulfilled, (state, action) => {
        state.loading = false;
        state.company_profile = action.payload.company_profile;
        state.video_url = action.payload.video_url;
      })
      .addCase(fetchCompanyProfileVideo.rejected, (state, action) => {
        state.loading = false;
        state.aboutErrors = action.payload;
      })
  }
})

export const {initialise, resetErrors, resetMessage} = userAboutSlice.actions;

const {reducer: userAboutReducer} = userAboutSlice;
export default userAboutReducer;