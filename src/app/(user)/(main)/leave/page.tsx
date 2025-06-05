'use client';
import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { FormikState, useFormik } from "formik";
import dayjs, { Dayjs } from 'dayjs';
import { LoadingButton } from "@mui/lab";
import { DatePicker } from "@mui/x-date-pickers";
import { LeaveFormValidationSchema } from "@/validations/schema";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchDepartment, fetchLeaveType, fetchSubmitLeaveForm } from "@/store/thunks/user/leaveThunk";
import { formatDate } from "@/utils/common";
import CommonSnackbar from "@/components/Snackbar";
import { resetMessage } from "@/store/slices/user/leaveSlice";
const UserLeave = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {loading, departmentList, leaveTypeList, leaveErrors, leaveMessage, success} = useSelector((state: RootState) => state.userLeave);
  const [fromDate, setFromDate] = useState<Dayjs | null>(null);
  const [toDate, setToDate] = useState<Dayjs | null>(null);
  const [snackbarOpen, SetSnackbarOpen] = useState(false);
  const formik = useFormik({
    initialValues: {
      recipent_email: '',
      staff_code: '',
      staff_name: '',
      rank_name: '',
      department_id: '',
      leave_type_id: '',
      reason: '',
    },
    validationSchema: LeaveFormValidationSchema,
    onSubmit: (values, {resetForm}) => {
      const formData = {
        ...values,
        from_date: fromDate && formatDate(fromDate),
        to_date: toDate && formatDate(toDate),
      }
      dispatch(fetchSubmitLeaveForm(formData));
    },
    enableReinitialize: true,
  })
  useEffect(() => {
    dispatch(fetchDepartment());
    dispatch(fetchLeaveType());
  }, [])
  useEffect(() => {
    leaveMessage && 
      formik.resetForm();
      SetSnackbarOpen(true); 
  }, [leaveMessage]);
  
  const handleSnackBarClose = () => {
    SetSnackbarOpen(false);
    setTimeout(() => {
      setFromDate(null);
      setToDate(null);
      dispatch(resetMessage());
    }, 500);
  };

  return (
    <>
      <Box className="subtitle-container">
        <Typography variant="h6" sx={{ pt: 4, mx: { xs: 2, md: 10 }, mb: 8 }}>
          Leave Form
        </Typography>
      </Box>
      <div style={{ width: "100%" }}>
        <Box sx={{mx: {xs: 5, md: 15}, my: 5}}>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> Recipent Email <span className="text-red-600">*</span></p>
                  <TextField
                    name="recipent_email"
                    size="small"
                    value={formik.values.recipent_email}
                    onChange={formik.handleChange}
                    error={((leaveErrors && leaveErrors.errors && leaveErrors.errors.recipent_email) && Boolean(leaveErrors.errors.recipent_email[0])) || formik.touched.recipent_email && Boolean(formik.errors.recipent_email)}
                    helperText={((leaveErrors && leaveErrors.errors && leaveErrors.errors.recipent_email) && leaveErrors.errors.recipent_email[0]) || (formik.touched.recipent_email && formik.errors.recipent_email)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> Staff Code <span className="text-red-600">*</span></p>
                  <TextField
                    name="staff_code"
                    size="small"
                    value={formik.values.staff_code}
                    onChange={formik.handleChange}
                    error={((leaveErrors && leaveErrors.errors && leaveErrors.errors.staff_code) && Boolean(leaveErrors.errors.staff_code[0])) || formik.touched.staff_code && Boolean(formik.errors.staff_code)}
                    helperText={((leaveErrors && leaveErrors.errors && leaveErrors.errors.staff_code) && leaveErrors.errors.staff_code[0]) || (formik.touched.staff_code && formik.errors.staff_code)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> Staff Name <span className="text-red-600">*</span></p>
                  <TextField
                    name="staff_name"
                    size="small"
                    value={formik.values.staff_name}
                    onChange={formik.handleChange}
                    error={((leaveErrors && leaveErrors.errors && leaveErrors.errors.staff_name) && Boolean(leaveErrors.errors.staff_name[0])) || formik.touched.staff_name && Boolean(formik.errors.staff_name)}
                    helperText={((leaveErrors && leaveErrors.errors && leaveErrors.errors.staff_name) && leaveErrors.errors.staff_name[0]) || (formik.touched.staff_name && formik.errors.staff_name)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> Rank Name <span className="text-red-600">*</span></p>
                  <TextField
                    name="rank_name"
                    size="small"
                    value={formik.values.rank_name}
                    onChange={formik.handleChange}
                    error={((leaveErrors && leaveErrors.errors && leaveErrors.errors.rank_name) && Boolean(leaveErrors.errors.rank_name[0])) || formik.touched.rank_name && Boolean(formik.errors.rank_name)}
                    helperText={((leaveErrors && leaveErrors.errors && leaveErrors.errors.rank_name) && leaveErrors.errors.rank_name[0]) || (formik.touched.rank_name && formik.errors.rank_name)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> Department <span className="text-red-600">*</span></p>
                  <Select
                    name="department_id"
                    size="small"
                    variant="outlined"
                    value={formik.values.department_id}
                    onChange={formik.handleChange}
                    error={((leaveErrors && leaveErrors.errors && leaveErrors.errors.department_id) && Boolean(leaveErrors.errors.department_id[0])) || formik.touched.department_id && Boolean(formik.errors.department_id)}
                  >
                    {departmentList.length != 0 &&
                      departmentList.map((department) => (
                        <MenuItem value={department.id}>{department.name}</MenuItem>
                      ))
                    }
                  </Select>
                  <FormHelperText error> {((leaveErrors && leaveErrors.errors && leaveErrors.errors.department_id) && leaveErrors.errors.department_id[0]) || (formik.touched.department_id && formik.errors.department_id)} </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> Leave Type <span className="text-red-600">*</span></p>
                  <Select
                    name="leave_type_id"
                    size="small"
                    variant="outlined"
                    value={formik.values.leave_type_id}
                    onChange={formik.handleChange}
                    error={((leaveErrors && leaveErrors.errors && leaveErrors.errors.leave_type_id) && Boolean(leaveErrors.errors.leave_type_id[0])) || formik.touched.leave_type_id && Boolean(formik.errors.leave_type_id)}
                  >
                    {leaveTypeList.length != 0 &&
                      leaveTypeList.map((leaveType) => (
                        <MenuItem value={leaveType.id}>{leaveType.name}</MenuItem>
                      ))
                    }
                  </Select>
                  <FormHelperText error> {((leaveErrors && leaveErrors.errors && leaveErrors.errors.leave_type_id) && leaveErrors.errors.leave_type_id[0]) || (formik.touched.leave_type_id && formik.errors.leave_type_id)} </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> From Date <span className="text-red-600">*</span></p>
                  <DatePicker
                    value={fromDate}
                    onChange={(newValue) => setFromDate(newValue)} 
                    slotProps={{
                      textField: { size: 'small' }, 
                      actionBar: {
                        actions: ['clear'],
                      },
                    }}
                  />
                  <FormHelperText error> {((leaveErrors && leaveErrors.errors && leaveErrors.errors.from_date) && leaveErrors.errors.from_date[0])} </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> To Date <span className="text-red-600">*</span></p>
                  <DatePicker
                    value={toDate}
                    onChange={(newValue) => setToDate(newValue)}
                    slotProps={{
                      textField: { size: 'small' }, 
                      actionBar: {
                        actions: ['clear'],
                      },
                    }}
                  />
                  <FormHelperText error> {((leaveErrors && leaveErrors.errors && leaveErrors.errors.to_date) && leaveErrors.errors.to_date[0])} </FormHelperText>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl variant="standard" fullWidth>
                  <p className="mb-1"> Reason <span className="text-red-600">*</span></p>
                  <TextField
                    name="reason"
                    size="small"
                    value={formik.values.reason}
                    onChange={formik.handleChange}
                    error={((leaveErrors && leaveErrors.errors && leaveErrors.errors.reason) && Boolean(leaveErrors.errors.reason[0])) || formik.touched.reason && Boolean(formik.errors.reason)}
                    helperText={((leaveErrors && leaveErrors.errors && leaveErrors.errors.reason) && leaveErrors.errors.reason[0]) || (formik.touched.reason && formik.errors.reason)}
                  />
                </FormControl>
              </Grid>
            </Grid>
            
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", mt: 2, }}>
              <LoadingButton
                sx={{ textTransform: "none" }}
                type="submit"
                loading={loading}
                variant="contained"
                color="info"
              >
                Submit
              </LoadingButton>
            </Box>
          </form>
        </Box>
      </div>
      <CommonSnackbar 
        success={success}
        message={leaveMessage}
        snackbarOpen={snackbarOpen} 
        handleSnackBarClose={handleSnackBarClose}
      />
    </>
  );
};

export default UserLeave;
