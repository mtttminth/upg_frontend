import * as Yup from 'yup';

export const adminLogin = Yup.object().shape({
  code: Yup.string().required('Staff Code is required'),
  password: Yup.string().required('Password is required'),
})