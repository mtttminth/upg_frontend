'use client';
import * as React from 'react';
import LoginIcon from '@mui/icons-material/Login';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';
import { useFormik } from 'formik';
import { adminLogin } from '@/validations/authSchema';
import { FormControl, IconButton, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { LoadingButton } from '@mui/lab';
import { redirect } from 'next/navigation';
import { fetchLogin } from '@/store/thunks/admin/authThunk';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = React.useState(false);
  const {loading, authErrors, isAuthenticated} = useSelector((state: RootState) => state.auth);
  const formik = useFormik({
    initialValues: {code: '', password: ''},
    validationSchema: adminLogin,
    onSubmit: (values) => {
      dispatch(fetchLogin(values));
    },
    enableReinitialize: true,
  })

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  React.useEffect(() => {
    isAuthenticated && redirect('/admin/profile');
  }, [isAuthenticated])

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box sx={{
        marginBottom: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }} >
        <Image
          src="/images/logo.png"
          width={160}
          height={160}
          priority
          alt="Logo"
          className='logo'
        />
        <Typography component="h1" variant="h5" color="white" mt={5}>Admin Sign in</Typography>
        <form onSubmit={formik.handleSubmit}>
          <p className='mt-3 mb-2 text-red-600'>{authErrors && authErrors.message}</p>
          <FormControl variant="standard" fullWidth>
            <p className="mb-1 form-label"> Code <span className="text-red-600">*</span></p>
            <TextField
              name="code"
              className='textfield'
              variant="filled" color="info" focused
              value={formik.values.code}
              onChange={formik.handleChange}
              error={((authErrors && authErrors.errors && authErrors.errors.code) && Boolean(authErrors.errors.code[0])) || formik.touched.code && Boolean(formik.errors.code)}
              helperText={((authErrors && authErrors.errors && authErrors.errors.code) && authErrors.errors.code[0]) || (formik.touched.code && formik.errors.code)}
            />
          </FormControl>
          <FormControl variant="standard" fullWidth sx={{marginTop: 3}}>
            <p className="mb-1 form-label"> Password <span className="text-red-600">*</span></p>
            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              className='textfield'
              variant="filled" color="info" focused
              value={formik.values.password}
              onChange={formik.handleChange}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility sx={{color: 'white'}} /> : <VisibilityOff sx={{color: 'white'}} />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              error={((authErrors && authErrors.errors && authErrors.errors.password) && Boolean(authErrors.errors.password[0])) || formik.touched.password && Boolean(formik.errors.password)}
              helperText={((authErrors && authErrors.errors && authErrors.errors.password) && authErrors.errors.password[0]) || (formik.touched.password && formik.errors.password)}
            />
          </FormControl>
          <LoadingButton
            sx={{textTransform: 'none', marginTop: 5, height: 50}}
            type="submit" 
            loading={loading}
            loadingPosition="end"
            endIcon={<LoginIcon />}
            variant="contained"
            color="secondary"
            fullWidth 
          >
            Log In
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
}

export default SignIn;