'use client';
import { Box, FormControl, FormHelperText, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect } from "react";
import { CreateSubCategoryValidationSchema } from "@/validations/schema";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { fetchAllCategoryList, fetchCreateSubCategory } from "@/store/thunks/admin/resourcesThunk";
const CreateSubCategory = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, allCategoryList, pageErrors} = useSelector((state: RootState) => state.page);
  const formik = useFormik({
    initialValues: {
      name: '',
      category_id: ''
    },
    validationSchema: CreateSubCategoryValidationSchema,
    onSubmit: (values) => {
      dispatch(fetchCreateSubCategory(values));
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    dispatch(fetchAllCategoryList());
  }, [])

  useEffect(() => {
    success && router.push('/admin/resources/sub-categories');
  }, [success])

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Create SubCategory
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
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Main Category <span className="text-red-600">*</span></p>
              <Select
                name="category_id"
                size="small"
                variant="outlined"
                value={formik.values.category_id}
                onChange={formik.handleChange}
                error={((pageErrors && pageErrors.errors && pageErrors.errors.category_id) && Boolean(pageErrors.errors.category_id[0])) || formik.touched.category_id && Boolean(formik.errors.category_id)}
              >
                {allCategoryList.length != 0 &&
                  allCategoryList.map((category: { id: string | number | readonly string[] | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))
                }
              </Select>
              <FormHelperText error> 
                {((pageErrors && pageErrors.errors && pageErrors.errors.category_id) && Boolean(pageErrors.errors.category_id[0])) || formik.touched.category_id && Boolean(formik.errors.category_id)}
              </FormHelperText>
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

export default CreateSubCategory;
