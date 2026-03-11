export interface DashboardStats {
  total_employees: number
  departments: { name: string; count: number }[]
  today_present: number
  today_absent: number
  total_attendance_records: number
  recent_employees: {
    employee_id: string
    full_name: string
    department: string
    created_at: string
  }[]
}
