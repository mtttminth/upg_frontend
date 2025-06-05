'use client';
import { Box, FormControl, FormHelperText, Grid, MenuItem, Select, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { AppDispatch, RootState } from "@/store/store";
import { EditUserValidationSchema } from "@/validations/schema";
import { LoadingButton } from "@mui/lab";
import { fetchEditUser, fetchDetailUser } from "@/store/thunks/admin/userThunk";

type PageParams = {
  id: string;
}

const EditAdmin = ({ params }: { params: PageParams}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, userDetail, userErrors} = useSelector((state: RootState) => state.user);
  const {departmentList} = useSelector((state: RootState) => state.auth);
  const id = parseInt(params.id);
  const formik = useFormik({
    initialValues: {
      code: "",
      name: "",
      position: "",
      department_id: "",
      rank_code: "",
      rank: "",
      password: "",
      password_confirmation: "",
    },
    validationSchema: EditUserValidationSchema,
    onSubmit: (values) => {
      console.log(values, id)
      dispatch(fetchEditUser({
        id,
        formData: values
      }));
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    dispatch(fetchDetailUser(id));
  }, []);

  useEffect(() => {
    if(Object.keys(userDetail).length != 0) {
      formik.setValues({
        code: userDetail.code,
        name: userDetail.name,
        position: userDetail.position,
        department_id: userDetail.department.id+'',
        rank: userDetail.rank,
        rank_code: userDetail.rank_code,
        password: '',
        password_confirmation: '',
      })
    }
  }, [userDetail])

  useEffect(() => {
    success && router.push('/admin/user');
  }, [success])

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Edit User
        </Typography>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1"> Staff Code <span className="text-red-600">*</span></p>
              <TextField
                name="code"
                size="small"
                value={formik.values.code}
                onChange={formik.handleChange}
                error={((userErrors && userErrors.errors && userErrors.errors.code) && Boolean(userErrors.errors.code[0])) || formik.touched.code && Boolean(formik.errors.code)}
                helperText={((userErrors && userErrors.errors && userErrors.errors.code) && userErrors.errors.code[0]) || (formik.touched.code && formik.errors.code)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1">
                Name <span className="text-red-600">*</span>
              </p>
              <TextField
                name="name"
                size="small"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={((userErrors && userErrors.errors && userErrors.errors.name) && Boolean(userErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
                helperText={((userErrors && userErrors.errors && userErrors.errors.name) && userErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1">
                Position <span className="text-red-600">*</span>
              </p>
              <TextField
                name="position"
                size="small"
                value={formik.values.position}
                onChange={formik.handleChange}
                error={((userErrors && userErrors.errors && userErrors.errors.position) && Boolean(userErrors.errors.position[0])) || formik.touched.position && Boolean(formik.errors.position)}
                helperText={((userErrors && userErrors.errors && userErrors.errors.position) && userErrors.errors.position[0]) || (formik.touched.position && formik.errors.position)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1">
                Department <span className="text-red-600">*</span>
              </p>
              <Select
                name="department_id"
                size="small"
                variant="outlined"
                value={formik.values.department_id}
                onChange={formik.handleChange}
                error={((userErrors && userErrors.errors && userErrors.errors.department_id) && Boolean(userErrors.errors.department_id[0])) || formik.touched.department_id && Boolean(formik.errors.department_id)}
              >
                {departmentList.length != 0 &&
                  departmentList.map((department) => (
                    <MenuItem value={department.id}>{department.name}</MenuItem>
                  ))
                }
              </Select>
              <FormHelperText error>
                {((userErrors && userErrors.errors && userErrors.errors.department_id) && Boolean(userErrors.errors.department_id[0])) || formik.touched.department_id && Boolean(formik.errors.department_id)}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1">
                Rank Code <span className="text-red-600">*</span>
              </p>
              <TextField
                name="rank_code"
                size="small"
                value={formik.values.rank_code}
                onChange={formik.handleChange}
                error={((userErrors && userErrors.errors && userErrors.errors.rank_code) && Boolean(userErrors.errors.rank_code[0])) || formik.touched.rank_code && Boolean(formik.errors.rank_code)}
                helperText={((userErrors && userErrors.errors && userErrors.errors.rank_code) && userErrors.errors.rank_code[0]) || (formik.touched.rank_code && formik.errors.rank_code)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1">
                Rank <span className="text-red-600">*</span>
              </p>
              <TextField
                name="rank"
                size="small"
                value={formik.values.rank}
                type="number"
                onChange={formik.handleChange}
                error={((userErrors && userErrors.errors && userErrors.errors.rank) && Boolean(userErrors.errors.rank[0])) || formik.touched.rank && Boolean(formik.errors.rank)}
                helperText={((userErrors && userErrors.errors && userErrors.errors.rank) && userErrors.errors.rank[0]) || (formik.touched.rank && formik.errors.rank)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1">
                Password <span className="text-red-600">*</span>
              </p>
              <TextField
                name="password"
                size="small"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={((userErrors && userErrors.errors && userErrors.errors.password) && Boolean(userErrors.errors.password[0])) || formik.touched.password && Boolean(formik.errors.password)}
                helperText={((userErrors && userErrors.errors && userErrors.errors.password) && userErrors.errors.password[0]) || (formik.touched.password && formik.errors.password)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl variant="standard" fullWidth>
              <p className="mb-1">
                Confirm Password <span className="text-red-600">*</span>
              </p>
              <TextField
                name="password_confirmation"
                size="small"
                type="password"
                value={formik.values.password_confirmation}
                onChange={formik.handleChange}
                error={((userErrors && userErrors.errors && userErrors.errors.password_confirmation) && Boolean(userErrors.errors.password_confirmation[0])) || formik.touched.password_confirmation && Boolean(formik.errors.password_confirmation)}
                helperText={((userErrors && userErrors.errors && userErrors.errors.password_confirmation) && userErrors.errors.password_confirmation[0]) || (formik.touched.password_confirmation && formik.errors.password_confirmation)}
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

export default EditAdmin;