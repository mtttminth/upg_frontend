import { LoginFromData } from '@/types/auth';
import api from './api';

const userLogin = async (formData: LoginFromData) => {
  return api
    .post('/user-login', formData)
    .then(response => response.data);
}

const userLogout = async () => {
  return api
    .post('/logout')
    .then(response => response.data);
}

const userProfile = async () => {
  return api
    .get('/profile')
    .then(response => response.data);
}

const userNotification = async () => {
  return api
    .get('/user/notifications')
    .then(response => response.data);
}

export default {
  userLogin,
  userLogout,
  userProfile,
  userNotification,
  // Add the new function for marking notification as read
  markAsRead: async (notificationId: string) => {
    return api
      .post('/user/mark-as-read', { id: notificationId }) // Send ID in payload
      .then(response => response.data);
  },
}