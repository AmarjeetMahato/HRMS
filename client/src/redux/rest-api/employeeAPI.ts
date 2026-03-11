import {  CreateEmployeeRequest, CreateEmployeeResponse, DeleteEmployeeResponse, EmployeeApiResponse, EmployeeCreate, GetEmployeesResponse } from "@/@validation/EmployeeValidation";
import { baseAPI } from "./baseAPI";


export  const employeeAPI = baseAPI.injectEndpoints({
         endpoints:(builder)=>({
              
         createEmployee: builder.mutation<EmployeeApiResponse, EmployeeCreate>({
                 query:(empData)=>({
                    url:"/employee/create",
                   method:"POST",
                   body:empData
                 }),
                 invalidatesTags: ["Employee"],
             }),

                // Get all Employees
   getEmployees: builder.query<GetEmployeesResponse, { limit?: number; page?: number }>({
  query: ({ limit = 10, page = 1 } = {}) => ({
    url: `/employee/get_all_emp?limit=${limit}&page=${page}`,
    method: "GET",
  }),
  providesTags: ["Employee"],
}),
    // Delete Employee
    deleteEmployee: builder.mutation<DeleteEmployeeResponse, string>({
      query: (id) => ({
        url: `/employee/${id}/delete`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
       // Optional: Update Employee
    updateEmployee: builder.mutation<CreateEmployeeResponse, { id: string; data: Partial<CreateEmployeeRequest> }>({
      query: ({ id, data }) => ({
        url: `/employees/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Employee"],
    }),
         })
});

export const {
    useCreateEmployeeMutation,
    useUpdateEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetEmployeesQuery
} = employeeAPI;