export type authState = {
  loading: boolean;
  authErrors: any;
  isAuthenticated: boolean;
  permissions: string[];
  permissionsList: string[];
  roleList: Role[];
  departmentList: Department[];
};

export type authUserState = {
  loading: boolean;
  userAuthErrors: any;
  isUserAuthenticated: boolean;
  userProfile: UserProfile;
  userNotification: UserNotification[];
};

export type UserNotification = {
  id: string;
  reference_id: string;
  type: string;
  message: string;
};

export type UserProfile = {
  id: number;
  name: string;
  code: string;
  position: string;
  rank_code: string;
  rank: string;
};

export type Role = {
  id: number;
  name: string;
  created_at: string;
  updated_at?: string | null;
};

export type Department = {
  id: number;
  name: string;
  created_at: string;
  updated_at?: string | null;
};

export type LoginFromData = {
  code: string;
  password: string;
};
