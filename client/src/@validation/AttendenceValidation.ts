// src/store/attendanceTypes.ts

export type AttendanceStatus = "present" | "absent";


export interface  Attendance {
  attendance_date:string,
  created_at:Date,
  status:AttendanceStatus,
  id:string,
  employee_id:string,
  updated_at: string
}      

export interface CreateAttendanceRequest {
  employee_id: string;
  attendance_date: string;
  status: AttendanceStatus;
}

export interface CreateAttendanceResponse {
  status: string;
  message: string;
  data: Attendance;
}

export interface GetAttendanceResponse {
  status: string;
  message: string;
  data: Attendance[];
}