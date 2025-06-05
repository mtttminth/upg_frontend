'use client';
import { setCommitmentFile, setCompanyProfileFile, setImages, setOrganizationFile, setPolicyFile } from '@/store/slices/admin/mediaSlice';
import { AppDispatch, RootState } from '@/store/store';
import { fetchDetailAbout, fetchEditAbout } from '@/store/thunks/admin/aboutThunk';
import { LoadingButton } from '@mui/lab';
import { Box, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonSnackbar from '@/components/Snackbar';
import { resetErrors, resetMessage } from '@/store/slices/admin/aboutSlice';
import PolicyFileUpload from '@/components/admin/about/PolicyFileUpload';
import CommitmentFileUpload from '@/components/admin/about/CommitmentFileUpload';
import OrganizationFileUpload from '@/components/admin/about/OrganizationFileUpload';
import CompanyProfileUpload from '@/components/admin/about/CompanyProfileUpload';

const About = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, aboutErrors, success, aboutDetail, aboutMessage } = useSelector((state: RootState) => state.about);
  const {policyFile, commitmentFile, organizationFile, companyProfileFile, videoUrl} = useSelector((state: RootState) => state.media);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);
  const [video, setVideoUrl] = useState('');
  useEffect(() => {
    dispatch(fetchDetailAbout());
    dispatch(resetErrors());
  }, []);

  useEffect(() => {
    if(Object.keys(aboutDetail).length != 0) {
      imageFormat(aboutDetail.policy_and_mission, 'policy');
      imageFormat(aboutDetail.our_commitments, 'commitment');
      imageFormat(aboutDetail.company_organization_structure, 'organization');
      imageFormat(aboutDetail.company_profile, 'profile');
      setVideoUrl(aboutDetail.video_url)
    }
  }, [aboutDetail])
  const imageFormat = async (file: any, type: string) => {
    const fileList: File[] = [];
    const response = await fetch(file);
    const blob = await response.blob();
    const filename = file.substring(file.lastIndexOf('/') + 1);
    const formattedFile = new File([blob], filename, { type: blob.type });
    fileList.push(formattedFile);
    switch (type) {
      case 'policy':
        dispatch(setPolicyFile(fileList));
        break;
      case 'commitment':
        dispatch(setCommitmentFile(fileList));
        break;
      case 'organization':
        dispatch(setOrganizationFile(fileList));
        break;
      case 'profile':
        dispatch(setCompanyProfileFile(fileList));
        break;
      default:
        break;
    }
    dispatch(setImages(fileList));
  }

  const editAboutImage = () => {
    const id = aboutDetail.id;
    const formData = {
      policy_and_mission: policyFile[0].serverId,
      our_commitments: commitmentFile[0].serverId,
      company_organization_structure: organizationFile[0].serverId,
      company_profile: companyProfileFile[0].serverId,
      video_url: video,
    }
    dispatch(fetchEditAbout({id, formData}));
  }

  useEffect(() => {
    aboutMessage && 
      SetSnackbarOpen(true); 
  }, [aboutMessage]);

  const handleSnackBarClose = () => {
    SetSnackbarOpen(false);
    setTimeout(() => {
      dispatch(resetMessage());
    }, 500);
  };
  
  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 8 }}>
        <Typography variant="h6">Edit About Us</Typography>
      </Box>
      <Grid item xs={12} md={12}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Policy & Mission</p>
          <PolicyFileUpload />
          <p className="mb-1">Our Commitments</p>
          <CommitmentFileUpload />
          <p className="mb-1">Company Organization Structure</p>
          <OrganizationFileUpload />
          <p className="mb-1">Company Profile, Video</p>
          <CompanyProfileUpload />
          <p className="mb-1">Video URL</p>
          <TextField
            name="video_url"
            size="small"
            value={video}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setVideoUrl(event.target.value);
            }}
          />
          <FormHelperText error>{aboutErrors && aboutErrors.errors && aboutErrors.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mt: 2 }}>
        <LoadingButton
          sx={{textTransform: 'none'}}
          onClick={editAboutImage}
          loading={loading}
          variant="contained"
          color="info"
          disabled={policyFile.length == 0 || commitmentFile.length == 0 || organizationFile.length == 0}
        >
          Update
        </LoadingButton>
      </Box>
      <CommonSnackbar 
        success={success}
        message={aboutMessage}
        snackbarOpen={snackbarOpen} 
        handleSnackBarClose={handleSnackBarClose}
      />
    </div>
  );
}

export default About;