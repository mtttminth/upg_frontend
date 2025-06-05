export type ProfileState = {
  loading: boolean;
  profileErrors: any;
  success: boolean;
  profileMessage: string;
  profileDetail: ProfileDetail;
}

export type CreateProfileBody = {
  name: string;
  password: string;
  password_confirmation: string;
}

export type ProfileDetail = {
  id: number;
  name: string;
}