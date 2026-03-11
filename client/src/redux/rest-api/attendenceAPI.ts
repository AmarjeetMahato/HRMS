// src/store/attendanceAPI.ts
import { baseAPI } from "./baseAPI";
import {
  CreateAttendanceRequest,
  CreateAttendanceResponse,
  GetAttendanceResponse,
} from "@/@validation/AttendenceValidation";

export const attendanceAPI = baseAPI.injectEndpoints({
  endpoints: (builder) => ({

    // Mark attendance
    createAttendance: builder.mutation<CreateAttendanceResponse, CreateAttendanceRequest>({
      query: (body) => ({
        url: "/attendance/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Attendance"], // to refresh the list after creation
    }),

    // Get all attendance for a specific employee
    getAttendanceByEmployee: builder.query<GetAttendanceResponse, string>({
      query: (employee_id) => ({
        url: `/attendance/${employee_id}/records`,
        method: "GET",
      }),
      providesTags: ["Attendance"],
    }),

      // Get all attendance for a specific employee
    getAllAttendance: builder.query<GetAttendanceResponse, void>({
      query: () => ({
        url: `/attendance/get_all`,
        method: "GET",
      }),
      providesTags: ["Attendance"],
    }),
  }),
});

export const {
  useCreateAttendanceMutation,
  useGetAttendanceByEmployeeQuery,
  useGetAllAttendanceQuery
} = attendanceAPI;