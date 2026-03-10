from sqlalchemy.orm import Session
from src.domain.Attendance.dto.AttendanceDto import AttendanceCreate
from src.config.model.Attendance_Model import Attendance


class AttendanceRepository:

    @staticmethod
    def create_attendance(db: Session, atten: AttendanceCreate, emp_id:str):
        """Create attendance record"""

        attendance = Attendance(
            employee_id=emp_id,
            attendance_date=atten.attendance_date,
            status=atten.status
        )

        db.add(attendance)
        db.commit()
        db.refresh(attendance)

        return attendance

    @staticmethod
    def get_all_attendance(db: Session):
        """Fetch all attendance records"""
        return db.query(Attendance).all()

    @staticmethod
    def get_attendance_by_employee(employee_id: str,db: Session):
        """Fetch attendance for a specific employee"""

        return db.query(Attendance).filter(
            Attendance.employee_id == employee_id
        ).all()


    @staticmethod
    def get_attendance_by_id(db: Session, attendance_id: UUID):
        """Fetch attendance by primary ID"""

        return db.query(Attendance).filter(
            Attendance.id == attendance_id
        ).first()

    @staticmethod
    def get_attendance_by_employee_and_date(
        db: Session, employee_id: str, attendance_date: date
    ):
        """Check duplicate attendance for same date"""

        return db.query(Attendance).filter(
            Attendance.employee_id == employee_id,
            Attendance.attendance_date == attendance_date
        ).first()

    @staticmethod
    def delete_attendance(db: Session, attendance_id: UUID):
        """Delete attendance record"""

        attendance = db.query(Attendance).filter(
            Attendance.id == attendance_id
        ).first()

        if attendance:
            db.delete(attendance)
            db.commit()

        return attendance