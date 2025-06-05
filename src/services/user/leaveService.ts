import { LeaveForm } from '@/types/leave';
import api from './api';

const getDepartmentList = async () => {
  return api
    .get('/user/get-departments')
    .then(response => response.data);
}

const getLeaveTypeList = async () => {
  return api
    .get('/user/leave-page/get-leave-types')
    .then(response => response.data);
}

const submitLeaveForm = async (formData: LeaveForm) => {
  return api
    .post('/user/leave-page/submit', formData)
    .then(response => response.data);
}


export default {
  getDepartmentList,
  getLeaveTypeList,
  submitLeaveForm,
}