'use client';
import FileUploader from '@/components/admin/FileUpload';
import { setImages } from '@/store/slices/admin/mediaSlice';
import { AppDispatch, RootState } from '@/store/store';
import { fetchDetailBanner, fetchEditBanner } from '@/store/thunks/admin/bannerThunk';
import { LoadingButton } from '@mui/lab';
import { Box, FormControl, FormHelperText, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CommonSnackbar from '@/components/Snackbar';
import { resetErrors, resetMessage } from '@/store/slices/admin/bannerSlice';

const Banner = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, bannerErrors, success, bannerDetail, bannerMessage } = useSelector((state: RootState) => state.banner);
  const {images} = useSelector((state: RootState) => state.media);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchDetailBanner());
    dispatch(resetErrors());
  }, []);

  useEffect(() => {
    if(Object.keys(bannerDetail).length != 0) {
      imageFormat(bannerDetail.image);
    }
  }, [bannerDetail])

  const imageFormat = async (file: any) => {
    const fileList: File[] = [];
    const response = await fetch(file);
    const blob = await response.blob();
    const filename = file.substring(file.lastIndexOf('/') + 1);
    const formattedFile = new File([blob], filename, { type: blob.type });
    fileList.push(formattedFile);
    dispatch(setImages(fileList));
  }

  const editBannerImage = () => {
    const id = bannerDetail.id;
    const formData = {
      image: images[0].serverId,
    }
    dispatch(fetchEditBanner({id, formData}));
  }

  useEffect(() => {
    bannerMessage && 
      SetSnackbarOpen(true); 
  }, [bannerMessage]);

  const handleSnackBarClose = () => {
    SetSnackbarOpen(false);
    setTimeout(() => {
      dispatch(resetMessage());
    }, 500);
  };
  
  return (
    <div style={{ width: "100%" }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 8 }}>
        <Typography variant="h6">Edit Banner Image</Typography>
      </Box>
      <Grid item xs={12} md={12}>
        <FormControl variant="standard" fullWidth>
          <p className="mb-1">Image</p>
          <FileUploader isMultiple={false} />
          <FormHelperText error>{bannerErrors && bannerErrors.errors && bannerErrors.message}</FormHelperText>
        </FormControl>
      </Grid>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mt: 2 }}>
        <LoadingButton
          sx={{textTransform: 'none'}}
          onClick={editBannerImage}
          loading={loading}
          variant="contained"
          color="info"
          disabled={images.length == 0}
        >
          Update
        </LoadingButton>
      </Box>
      <CommonSnackbar 
        success={success}
        message={bannerMessage}
        snackbarOpen={snackbarOpen} 
        handleSnackBarClose={handleSnackBarClose}
      />
    </div>
  );
}

export default Banner;