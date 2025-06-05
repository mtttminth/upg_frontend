import * as Yup from 'yup';

export const CreateDepartmentValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})

export const CreateAdminValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  department_id: Yup.string().required('Department is required'),
  role: Yup.string().required('Role is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  password_confirmation: Yup.string()
    .required('Password confirmation is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'), // This checks if password_confirmation matches the value of the password field
})

export const EditAdminValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  code: Yup.string().required('Code is required'),
  department_id: Yup.string().required('Department is required'),
  role: Yup.string().required('Role is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match'), // This checks if password_confirmation matches the value of the password field
})

export const EditProfileValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match'), // This checks if password_confirmation matches the value of the password field
})


export const CreateUserValidationSchema = Yup.object().shape({
  code: Yup.string().required('Staff Code is required'),
  name: Yup.string().required('Name is required'),
  position: Yup.string().required('Position is required'),
  department_id: Yup.string().required('Department is required'),
  rank_code: Yup.string().required('Rank Code is required'),
  rank: Yup.number()
    .required('Rank is required'),
  password: Yup.string()
    .required('Password is required')
    .min(5, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password')], 'Passwords must match'), // This checks if password_confirmation matches the value of the password field
})

export const EditUserValidationSchema = Yup.object().shape({
  code: Yup.string().required('Staff Code is required'),
  name: Yup.string().required('Name is required'),
  position: Yup.string().required('Position is required'),
  department_id: Yup.string().required('Department is required'),
  rank_code: Yup.string().required('Rank Code is required'),
  rank: Yup.number()
    .required('Rank is required'),
  password: Yup.string()
    .min(5, 'Password must be at least 6 characters long')
    .max(20, 'Password must be at most 20 characters long'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match'), // This checks if password_confirmation matches the value of the password field
})

export const CreateReleaseValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  release_status_id: Yup.string().required('Release status is required'),
  video_url: Yup.string(),
  description: Yup.string().required('Description is required'),
})

export const CreateCategoryValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required')
})

export const CreateSubCategoryValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  category_id: Yup.string().required('Department is required'),
})

export const CreatePageValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  subcategory_id: Yup.string().required('SubCategory is required'),
  video_url: Yup.string(),
})

export const CreateFormTypeValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
})

export const CreateFormValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  form_type_id: Yup.string().required('Type is required'),
})

export const CreateContractValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  contract_type_id: Yup.string().required('Type is required'),
})

export const LeaveFormValidationSchema = Yup.object().shape({
  recipent_email: Yup.string().required('Recipent email is required'),
  staff_code: Yup.string().required('Staff code is required'),
  staff_name: Yup.string().required('Staff name is required'),
  rank_name: Yup.string().required('Rank name is required'),
  department_id: Yup.string().required('Department is required'),
  leave_type_id: Yup.string().required('Leave type is required'),
  reason: Yup.string().required('Reason is required'),
})