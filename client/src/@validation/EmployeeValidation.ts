export interface Employee {
  id: string;
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  created_at:Date,
}


// src/types/employee.ts
export interface EmployeeCreate {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}

export interface EmployeeResponse {
  id: string; // UUID from backend
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
  created_at:Date
}

// API wrapper response
export interface EmployeeApiResponse {
  status: "success" | "error";
  message: string;
  data?: EmployeeResponse;
}

export interface CreateEmployeeResponse {
  status: string;
  message: string;
  data: Employee;
}

export interface CreateEmployeeRequest {
  employee_id: string;
  full_name: string;
  email: string;
  department: string;
}


export interface GetEmployeesResponse {
  status: string;
  message: string;
  data: Employee[];
}

export interface DeleteEmployeeResponse {
  status: string;
  message: string;
}