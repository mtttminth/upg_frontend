'use client';
import { Box, FormControl, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from 'formik';
import { Button } from '@mui/material';
import React, { useEffect, useState } from "react";
import { CreateDepartmentValidationSchema } from "@/validations/schema";
import GroupStepper from "@/components/admin/manage-group/GroupStepper";
import ConfirmMember from "@/components/admin/manage-group/ConfirmMember";
import { LoadingButton } from "@mui/lab";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchCreateGroup } from "@/store/thunks/admin/groupThunk";
import DeparmentSearchFilter from "@/components/admin/manage-group/SearchFilter";
import ChooseMember from "@/components/admin/manage-group/ChooseMember";

const CreateGroup = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const {loading, success, groupErrors, selectedDepartmentUsers} = useSelector((state: RootState) => state.group);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    success && router.push('/admin/group');
  }, [success])

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: CreateDepartmentValidationSchema,
    onSubmit: (values) => {
      const selectedDepartmentIds = selectedDepartmentUsers.map(item => item.id);
      const body = {
        name: values.name,
        user_ids: selectedDepartmentIds,
      }
      dispatch(fetchCreateGroup(body));
    },
    enableReinitialize: true,
  })

  return (
    <div style={{ width: '100%' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          Create Group
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
                error={((groupErrors && groupErrors.errors && groupErrors.errors.name) && Boolean(groupErrors.errors.name[0])) || formik.touched.name && Boolean(formik.errors.name)}
                helperText={((groupErrors && groupErrors.errors && groupErrors.errors.name) && groupErrors.errors.name[0]) || (formik.touched.name && formik.errors.name)}
              />
            </FormControl>
          </Grid>
        </Grid>
        <GroupStepper step={step} />
        <Box>
          {
            step == 0 ? (
              <>
                <DeparmentSearchFilter />
                <ChooseMember setStep={setStep}/>
              </>
            ) : (
              <>
                <ConfirmMember />
              </>
            )
          }
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'row-reverse', alignItems: 'center', justifyContent: 'space-between', mt: 2 }}>
          {
            step != 0 && (
              <>
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
                <Button sx={{textTransform: 'none'}} onClick={() => setStep(0)} variant="contained" color="info">
                  Go Back
                </Button>
              </>
            )
          }
        </Box>
      </form>
    </div>
  )
}

export default CreateGroup;
