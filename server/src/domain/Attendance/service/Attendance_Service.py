from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.domain.Attendance.dto.AttendanceDto import AttendanceCreate
from src.domain.Attendance.repository.Attendance_Repository import AttendanceRepository
from src.domain.Employee.repository.Employee_Repository import EmployeeRepository


class AttendanceService:

    @staticmethod
    def mark_attendance( data: AttendanceCreate, db: Session):

        employee = EmployeeRepository.get_employee_by_id(db, data.employee_id)
        print("employee ", employee)
        if not employee:
         raise HTTPException(status_code=404, detail="Employee not found")

        existing = AttendanceRepository.get_attendance_by_employee_and_date(
            db,
            employee.id,
            data.attendance_date
        )

        if existing:
            # Update the status if already exists
            existing.status = data.status  # e.g., "present" or "absent"
            db.commit()
            db.refresh(existing)
            return existing

        return AttendanceRepository.create_attendance(db, data,employee.id)

    @staticmethod
    def view_attendence_record(emp_id:str,db:Session):
        if emp_id is None:
             raise HTTPException(
                  status_code=400,
                  detail="Employee Id should not be empty !"
             )  
        result = AttendanceRepository.get_attendance_by_employee(emp_id,db) 
        if result is None:
            raise HTTPException(
                 status_code=500,
                 detail=f"failed to fetch attendence of Employee"
            ) 
        return result    


    @staticmethod
    def get_all_records(db:Session):
        result = AttendanceRepository.get_all_attendance(db)
        return result

                 