import { LoginFromData } from '@/types/auth';
import api from './api';

const login = async (formData: LoginFromData) => {
  return api
    .post('/admin-login', formData)
    .then(response => response.data);
}

const logout = async () => {
  return api
    .post('/logout')
    .then(response => response.data);
}

const getUserPermission = async () => {
  return api
    .get('/get-user-permissions')
    .then(response => response.data);
}

const getPermissionList = async () => {
  return api
    .get('/admin/get-permissions')
    .then(response => response.data);
}

const getDepartmentList = async () => {
  return api
    .get('/admin/get-departments')
    .then(response => response.data);
}

const getRoleList = async () => {
  return api
    .get('/admin/get-roles')
    .then(response => response.data);
}

export default {
  login, 
  logout, 
  getUserPermission, 
  getPermissionList, 
  getDepartmentList,
  getRoleList,
}