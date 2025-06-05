"use client";
import * as React from "react";
import LoginIcon from "@mui/icons-material/Login";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Image from "next/image";
import { useFormik } from "formik";
import { adminLogin } from "@/validations/authSchema";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { LoadingButton } from "@mui/lab";
import { redirect } from "next/navigation";
import { fetchUserLogin } from "@/store/thunks/user/authThunk";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from '@mui/icons-material/Lock';
import { IconButton, InputAdornment } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
const SignIn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showPassword, setShowPassword] = React.useState(false);
  const { loading, userAuthErrors, isUserAuthenticated } = useSelector(
    (state: RootState) => state.userAuth
  );
  const formik = useFormik({
    initialValues: { code: "", password: "" },
    validationSchema: adminLogin,
    onSubmit: (values) => {
      dispatch(fetchUserLogin(values));
    },
    enableReinitialize: true,
  });

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  React.useEffect(() => {
    isUserAuthenticated && redirect("/");
  }, [isUserAuthenticated]);
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginBottom: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Image
          src="/images/logo-blue.png"
          width={200}
          height={200}
          priority
          alt="Logo"
          style={{ width: 350 }}
        />
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            margin: "40px 0 20px 0",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#253068",
              borderRadius: 15,
              padding: 1.2,
              marginRight: 1,
            }}
          >
            <PersonIcon sx={{ color: "#ffffff" }} />
          </Box>
          <Typography component="h1" variant="h5" color="white">
            Login
          </Typography>
        </Box>
        <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
          <p className="mt-3 mb-2 text-red-600">
            {userAuthErrors && userAuthErrors.message}
          </p>
          <Box
            sx={{ display: "flex", alignItems: "flex-end", marginBottom: 2 }}
          >
            <EmailIcon sx={{ color: "#ffffff", mr: 1, my: 0.5 }} />
            <TextField
              name="code"
              label="User ID"
              variant="standard"
              className="textfield"
              value={formik.values.code}
              onChange={formik.handleChange}
              error={
                (userAuthErrors &&
                  userAuthErrors.errors &&
                  userAuthErrors.errors.code &&
                  Boolean(userAuthErrors.errors.code[0])) ||
                (formik.touched.code && Boolean(formik.errors.code))
              }
              helperText={
                (userAuthErrors &&
                  userAuthErrors.errors &&
                  userAuthErrors.errors.code &&
                  userAuthErrors.errors.code[0]) ||
                (formik.touched.code && formik.errors.code)
              }
              InputLabelProps={{
                sx: { color: "#ffffff", "&.Mui-focused": { color: "#ffffff" } },
              }}
              sx={{
                width: "100%",
                input: {
                  color: "#ffffff",
                  borderBottom: "1px solid #ffffff",
                },
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <LockIcon sx={{ color: "#ffffff", mr: 1, my: 0.5 }} />
            <TextField
              name="password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              variant="standard"
              className="textfield"
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
              error={
                (userAuthErrors &&
                  userAuthErrors.errors &&
                  userAuthErrors.errors.password &&
                  Boolean(userAuthErrors.errors.password[0])) ||
                (formik.touched.password && Boolean(formik.errors.password))
              }
              helperText={
                (userAuthErrors &&
                  userAuthErrors.errors &&
                  userAuthErrors.errors.password &&
                  userAuthErrors.errors.password[0]) ||
                (formik.touched.password && formik.errors.password)
              }
              InputLabelProps={{
                sx: { color: "#ffffff", "&.Mui-focused": { color: "#ffffff" } },
              }}
              sx={{
                width: "100%",
                input: {
                  color: "#ffffff",
                  borderBottom: "1px solid #ffffff",
                },
              }}
            />
          </Box>
          <LoadingButton
            sx={{
              textTransform: "none",
              marginTop: 5,
              height: 50,
              backgroundColor: "#253068",
            }}
            type="submit"
            loading={loading}
            loadingPosition="end"
            endIcon={<LoginIcon />}
            variant="contained"
            fullWidth
          >
            Log In
          </LoadingButton>
        </form>
      </Box>
    </Container>
  );
};

export default SignIn;
