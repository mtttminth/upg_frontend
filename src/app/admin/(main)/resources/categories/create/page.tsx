'use client';
import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect } from "react";
import { CreateCategoryValidationSchema } from "@/validations/schema";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { fetchCreateCategory } from "@/store/thunks/admin/resourcesThunk";
const CreateCategory = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, pageErrors} = useSelector((state: RootState) => state.page);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: CreateCategoryValidationSchema,
    onSubmit: (values) => {
      dispatch(fetchCreateCategory(values));
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    success && router.push('/admin/resources/categories');
  }, [success])

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Create Category
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
                error={((pageErrors && pageErrors.errors && pageErrors.errors.name) && Boolean(pageErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
                helperText={((pageErrors && pageErrors.errors && pageErrors.errors.name) && pageErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
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
            Create
          </LoadingButton>
        </Box>
      </form>
    </div>
  )
}

export default CreateCategory;
