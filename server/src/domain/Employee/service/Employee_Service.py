from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.domain.Employee.repository.Employee_Repository import EmployeeRepository

class EmployeeService:

    @staticmethod
    def create_employee(employee_data:EmployeeCreate,db:Session):
        existing_employee = EmployeeRepository.get_employee_by_employee_id(
            db, employee_data.employee_id
             )

        if existing_employee:
            raise HTTPException(
                status_code=409,
                detail="Employee with this ID already exists"
            )

        existing_email = EmployeeRepository.get_employee_by_email(
            db, employee_data.email
        )

        if existing_email:
            raise HTTPException(
                status_code=409,
                detail="Email already registered"
            )
        result = EmployeeRepository.create_employee(db,employee_data);
        if result is None:
               raise HTTPException(
                status_code=500,
                detail="Failed to create Employee")

        return   result;      


    @staticmethod
    def fetch_employee_by_id(db:Session,emp_id:str):
        if emp_id is None:
            raise HTTPException(
                status_code=400,
                detail="Employee should not be Empty"
            )  
        result = EmployeeRepository.get_employee_by_id(db,emp_id)
        if result is None:
               raise HTTPException(
                status_code=500,
                detail="Failed to create Employee")

        return   result;           
    
    @staticmethod
    def fetch_emp_by_email(db:Session,emp_email=str):

        if emp_email is None:
            raise HTTPException(
                status_code=400,
                detail="Employee email is required"
            )

        result = EmployeeRepository.get_employee_by_email(emp_email)
        if result is None:
              raise HTTPException(
                status_code=500,
                detail="Failed to fetch Employee") 
        return result 

    @staticmethod 
    def employee_update(emp_id:UUID,data:EmployeeUpdate,db:Session):
           if emp_id is None:
               raise HTTPException(
                 status_code=400,
                 detail=f"Employee should not be Empty !"
               ) 
           emp_details = EmployeeRepository.get_employee_by_id(emp_id,db)
           if emp_details is None:
               raise HTTPException(
                   status_code=404,
                   detail="User not found"
               )
           update_emp = EmployeeRepository.update_employee(emp_id,data,db)
           return update_emp     
    
    @staticmethod
    def get_all_employees(db:Session,limit:int, page:int):
        if page < 1:
            raise HTTPException(status_code=400,detail=f"Page must be greater then 1")   
        emps = EmployeeRepository.fetch_all_employee(db,limit,page)
        if emps is None:
            raise HTTPException(status_code=500, detail="Failed to fetch employees")
        return emps 

    @staticmethod
    def delete_emp_by_id(emp_id:str,db:Session):
        if emp_id is None:
            raise HTTPException(
                  status_code=400,
                  detail=f"Employee Id should not be empty"
            )  
        employee = EmployeeRepository.delete_employee(db, emp_id)

        if not employee:
            raise HTTPException(
            status_code=404,
            detail="Employee not found"
          )

        return employee
