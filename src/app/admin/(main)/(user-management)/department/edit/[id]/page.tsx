'use client';
import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect } from "react";
import { CreateDepartmentValidationSchema } from "@/validations/schema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCreateDepartment, fetchDetailDepartment, fetchEditDepartment } from "@/store/thunks/admin/departmentThunk";
import { useRouter } from 'next/navigation';
import { LoadingButton } from "@mui/lab";

type PageParams = {
  id: string;
}

const EditDepartment = ({ params }: { params: PageParams}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, departmentDetail, departmentErrors} = useSelector((state: RootState) => state.department);
  const id = parseInt(params.id);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: CreateDepartmentValidationSchema,
    onSubmit: (values) => {
      dispatch(fetchEditDepartment({
        id, 
        formData: values
      }));
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    dispatch(fetchDetailDepartment(id));
  }, []);

  useEffect(() => {
    if(Object.keys(departmentDetail).length != 0) {
      formik.setValues({
        name: departmentDetail.name
      })
    }
  }, [departmentDetail])

  useEffect(() => {
    success && router.push('/admin/department');
  }, [success])

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Edit Department
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
                error={((departmentErrors && departmentErrors.errors && departmentErrors.errors.name) && Boolean(departmentErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
                helperText={((departmentErrors && departmentErrors.errors && departmentErrors.errors.name) && departmentErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
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
            Update
          </LoadingButton>
        </Box>
      </form>
    </div>
  )
}

export default EditDepartment;
