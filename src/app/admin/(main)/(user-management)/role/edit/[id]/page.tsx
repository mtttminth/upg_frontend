'use client';
import { Box, Checkbox, FormControl, FormControlLabel, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import React, { useEffect, useState } from "react";
import { CreateDepartmentValidationSchema } from "@/validations/schema";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { managementSections } from '@/consts/common';
import { fetchDetailRole, fetchEditRole } from "@/store/thunks/admin/roleThunk";
import { LoadingButton } from "@mui/lab";

type PageParams = {
  id: string;
}

const EditRole = ({ params }: { params: PageParams}) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, roleErrors, roleDetail} = useSelector((state: RootState) => state.role);
  const [checkedPermissions, setCheckedPermissions] = useState<string[]>([]);
  const id = parseInt(params.id);
  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: CreateDepartmentValidationSchema,
    onSubmit: (values) => {
      const body = {
        name: values.name,
        permissions: checkedPermissions,
      }
      dispatch(fetchEditRole({
        id,
        formData: body
      }));
    },
    enableReinitialize: true,
  })

  useEffect(() => {
    dispatch(fetchDetailRole(id));
  }, []);

  useEffect(() => {
    if(Object.keys(roleDetail).length != 0) {
      formik.setValues({
        name: roleDetail.name
      })
      setCheckedPermissions(roleDetail.permissions)
    }
  }, [roleDetail])

  useEffect(() => {
    success && router.push('/admin/role');
  }, [success])

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setCheckedPermissions(prevState => [...prevState, value]);
    } else {
      setCheckedPermissions(prevState => prevState.filter(permission => permission !== value));
    }
  };

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Edit Role
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
                error={((roleErrors && roleErrors.errors && roleErrors.errors.name) && Boolean(roleErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
                helperText={((roleErrors && roleErrors.errors && roleErrors.errors.name) && roleErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <>
          {managementSections.map((section, sectionIndex) => (
            <Box key={sectionIndex} sx={{ my: 4 }}>
              <Typography variant="subtitle1">{section.title}</Typography>
              <hr className="subtitle-underline" />
              <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', columnGap: 4, flexWrap: 'wrap' }}>
                {section.permissions.map((permission, permissionIndex) => (
                  <FormControlLabel
                    key={permissionIndex}
                    control={
                      <Checkbox
                        size="small"
                        color="secondary"
                        checked={checkedPermissions.includes(permission.value)}
                        onChange={(event) => handleCheckboxChange(permission.value, event.target.checked)}
                      />
                    }
                    label={permission.label}
                  />
                ))}
              </Box>
            </Box>
          ))}
        </>
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

export default EditRole;
