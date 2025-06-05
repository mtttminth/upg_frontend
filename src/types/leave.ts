import { Dayjs } from "dayjs";

export type LeaveState = {
  success: boolean;
  loading: boolean;
  leaveErrors: any;
  leaveMessage: string;
  departmentList: Department[];
  leaveTypeList: LeaveType[];
}

export type LeaveForm = {
  recipent_email: string;
  staff_code: string;
  staff_name: string;
  rank_name: string;
  department_id: string;
  leave_type_id: string;
  reason: string;
  from_date: string | null;
  to_date: string | null;
}

export type Department = {
  id: number;
  name: string;
}

export type LeaveType = {
  id: number;
  name: string;
}