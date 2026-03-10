from sqlalchemy.orm import Session
from src.domain.Employee.dto.EmployeeDto import EmployeeCreate
from src.config.model.Employee import Employees
from src.config.model.Attendance_Model import Attendance

class EmployeeRepository:

    @staticmethod
    def create_employee(db:Session,employee_data:EmployeeCreate):
        """ Create Employee Data """
        employee = Employees(
           employee_id= employee_data.employee_id,
           full_name= employee_data.full_name,
           email= employee_data.email,
           department = employee_data.department
        )
        db.add(employee)
        db.commit()
        db.refresh(employee)

        return employee

    @staticmethod
    def get_employee_by_id(db:Session,emp_id:str):
          """Fetch employee using primary UUID"""
          return db.query(Employees).filter(Employees.id==emp_id).first()

    @staticmethod
    def get_employee_by_employee_id(db:Session,emp_id:str):
          """Check duplicate employee_id"""
          return db.query(Employees).filter(Employees.employee_id==emp_id).first()

    @staticmethod
    def get_employee_by_email(db: Session, email: str):
        """Check duplicate email"""

        return db.query(Employees).filter(
            Employees.email == email
        ).first()

    @staticmethod
    def fetch_all_employee(db:Session,limit:int,page:int):
         offset = (page-1)*limit
         all_emp = (
                        db.query(Employees)
                        .order_by(Employees.created_at.desc(),Employees.id.desc())
                        .limit(limit)
                        .offset(offset)
                        .all()  # ← execute query
                      )
         return all_emp            

    @staticmethod
    def update_employee(emp_id:str, db:Session):
        employee = db.query(Employees).filter(Employees.id == emp_id).first()

        if not employee:
            return None

        update_fields = update_data.model_dump(exclude_unset=True)

        for key, value in update_fields.items():
              setattr(employee, key, value)

        db.commit()
        db.refresh(employee)

        return employee
    
    @staticmethod
    def delete_employee(db: Session, employee_uuid: str):
        """Delete employee"""
        employee = db.query(Employees).filter(
            Employees.id == employee_uuid
        ).first()
        db.query(Attendance).filter(Attendance.employee_id == employee_uuid).delete(synchronize_session=False)

        if employee:
            db.delete(employee)
            db.commit()

        return employee          