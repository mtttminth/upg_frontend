'use client';
import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import { EditProfileValidationSchema } from "@/validations/schema";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { fetchDetailProfile, fetchEditProfile } from "@/store/thunks/admin/profileThunk";
import CommonSnackbar from "@/components/Snackbar";
import { resetMessage } from "@/store/slices/admin/profileSlice";

const EditProfile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, profileDetail, profileMessage, profileErrors} = useSelector((state: RootState) => state.profile);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: EditProfileValidationSchema,
    onSubmit: (values) => {
      dispatch(fetchEditProfile(values));
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    dispatch(fetchDetailProfile());
  }, []);

  useEffect(() => {
    if(Object.keys(profileDetail).length != 0) {
      formik.setValues({
        name: profileDetail.name,
        password: '',
        password_confirmation: '',
      })
    }
  }, [profileDetail])

  useEffect(() => {
    profileMessage && 
      SetSnackbarOpen(true); 
  }, [profileMessage]);

  const handleSnackBarClose = () => {
    SetSnackbarOpen(false);
    setTimeout(() => {
      dispatch(resetMessage());
    }, 500);
  };

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Profile
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Name <span className="text-red-600">*</span></p>
              <TextField
                name="name"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={((profileErrors && profileErrors.errors && profileErrors.errors.name) && Boolean(profileErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
                helperText={((profileErrors && profileErrors.errors && profileErrors.errors.name) && profileErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> New Password </p>
              <TextField
                name="password"
                size="small"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={((profileErrors && profileErrors.errors && profileErrors.errors.password) && Boolean(profileErrors.errors.password[0])) || formik.touched.password && Boolean(formik.errors.password)}
                helperText={((profileErrors && profileErrors.errors && profileErrors.errors.password) && profileErrors.errors.password[0]) || (formik.touched.password && formik.errors.password)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Confirm Password </p>
              <TextField
                name="password_confirmation"
                size="small"
                type="password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={((profileErrors && profileErrors.errors && profileErrors.errors.password_confirmation) && Boolean(profileErrors.errors.password_confirmation[0])) || formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                helperText={((profileErrors && profileErrors.errors && profileErrors.errors.password_confirmation) && profileErrors.errors.password_confirmation[0]) || (formik.touched.password_confirmation && formik.errors.password_confirmation)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'start', mt: 2 }}>
          <LoadingButton
            sx={{textTransform: 'none'}}
            type="submit" 
            loading={loading}
            variant="contained"
            color="info"
          >
            Edit
          </LoadingButton>
        </Box>
        <CommonSnackbar 
          success={success}
          message={profileMessage}
          snackbarOpen={snackbarOpen} 
          handleSnackBarClose={handleSnackBarClose}
        />
      </form>
    </div>
  )
}

export default EditProfile;
