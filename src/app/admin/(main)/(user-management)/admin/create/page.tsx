'use client';
import { Box, FormControl, FormHelperText, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect } from "react";
import { CreateAdminValidationSchema } from "@/validations/schema";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { LoadingButton } from "@mui/lab";
import { fetchCreateAdmin } from "@/store/thunks/admin/adminThunk";
const CreateAdmin = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, adminErrors} = useSelector((state: RootState) => state.admin);
  const {departmentList, roleList} = useSelector((state: RootState) => state.auth);
  const formik = useFormik({
    initialValues: {
      name: '',
      department_id: '',
      role: '',
      password: '',
      password_confirmation: '',
    },
    validationSchema: CreateAdminValidationSchema,
    onSubmit: (values) => {
      dispatch(fetchCreateAdmin(values));
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    success && router.push('/admin/admin');
  }, [success])

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Create Admin
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
                error={((adminErrors && adminErrors.errors && adminErrors.errors.name) && Boolean(adminErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
                helperText={((adminErrors && adminErrors.errors && adminErrors.errors.name) && adminErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Department <span className="text-red-600">*</span></p>
              <Select
                name="department_id"
                size="small"
                variant="outlined"
                value={formik.values.department_id}
                onChange={formik.handleChange}
                error={((adminErrors && adminErrors.errors && adminErrors.errors.department_id) && Boolean(adminErrors.errors.department_id[0])) || formik.touched.department_id && Boolean(formik.errors.department_id)}
              >
                {departmentList.length != 0 &&
                  departmentList.map((department) => (
                    <MenuItem value={department.id}>{department.name}</MenuItem>
                  ))
                }
              </Select>
              <FormHelperText error> {((adminErrors && adminErrors.errors && adminErrors.errors.department_id) && adminErrors.errors.department_id[0]) || (formik.touched.department_id && formik.errors.department_id)} </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Role <span className="text-red-600">*</span></p>
              <Select
                name="role"
                size="small"
                variant="outlined"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={((adminErrors && adminErrors.errors && adminErrors.errors.role) && Boolean(adminErrors.errors.role[0])) || formik.touched.role && Boolean(formik.errors.role)}
              >
                {roleList.length != 0 &&
                  roleList.map((role) => (
                    <MenuItem value={role.name}>{role.name}</MenuItem>
                  ))
                }
              </Select>
              <FormHelperText error> {((adminErrors && adminErrors.errors && adminErrors.errors.role) && adminErrors.errors.role[0]) || (formik.touched.role && formik.errors.role)} </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Password <span className="text-red-600">*</span></p>
              <TextField
                name="password"
                size="small"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={((adminErrors && adminErrors.errors && adminErrors.errors.password) && Boolean(adminErrors.errors.password[0])) || formik.touched.password && Boolean(formik.errors.password)}
                helperText={((adminErrors && adminErrors.errors && adminErrors.errors.password) && adminErrors.errors.password[0]) || (formik.touched.password && formik.errors.password)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Confirm Password <span className="text-red-600">*</span></p>
              <TextField
                name="password_confirmation"
                size="small"
                type="password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={((adminErrors && adminErrors.errors && adminErrors.errors.password_confirmation) && Boolean(adminErrors.errors.password_confirmation[0])) || formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                helperText={((adminErrors && adminErrors.errors && adminErrors.errors.password_confirmation) && adminErrors.errors.password_confirmation[0]) || (formik.touched.password_confirmation && formik.errors.password_confirmation)}
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

export default CreateAdmin;
