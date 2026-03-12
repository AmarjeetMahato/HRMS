from typing import List,Optional
from fastapi import APIRouter,Depends,HTTPException,Response,Query
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder
from  src.config.dasbase.database import get_db
from src.domain.Employee.service.Employee_Service import EmployeeService
from src.domain.Employee.dto.EmployeeDto import EmployeeCreate,EmployeeUpdate,EmployeeSchema

router = APIRouter()

@router.get("/get_all_emp")
def fetch_all_emp(db:Session=Depends(get_db),limit: int = Query(10, gt=0, le=100),page: int = Query(1, gt=0)):
    try:
         employees = EmployeeService.get_all_employees(db, limit, page)
         return {
               "success": True,
               "page": page,
               "limit": limit,
               "count": len(employees),
               "data": jsonable_encoder(employees)
    }
    except Exception as e:
            raise HTTPException(
             status_code=500,
             detail=f"An unexpected error occurred: {str(e)}"
        ) 

@router.post("/create")
def create_employee(emp_data:EmployeeCreate, db:Session=Depends(get_db)):

    try:
        result = EmployeeService.create_employee(emp_data,db)
        return {
            "status": "success", 
            "message": "Employee created successfully", 
            "data": jsonable_encoder(result)}
    except HTTPException as e:
        # Let FastAPI handle it with its proper status code
        raise e     
    except Exception as e:
        raise HTTPException(
             status_code=500,
             detail=f" {str(e)}"
        )

@router.get("/{emp_id}")
def fetch_emp_by_Id(emp_id:str,db:Session=Depends(get_db)):
    try:
        employee = EmployeeService.fetch_employee_by_id(db,emp_id) 
        return {
            "success":True,
            "message":"Employee fetch successfully",
            "data":jsonable_encoder(employee)
        }
    except Exception as e:
            raise HTTPException(
             status_code=500,
             detail=f"An unexpected error occurred: {str(e)}"
        )  

@router.patch("/{emp_id}/update")
def  update_employee(emp_id:UUID,emp_data:EmployeeUpdate,db:Session=Depends(get_db)):
    try:
          result = EmployeeService.employee_update(emp_id,data,db)
          return {"success":True, "message": "Employee update successfully", "data": result}
    except Exception as e:
            raise HTTPException(
             status_code=500,
             detail=f"An unexpected error occurred: {str(e)}"
        )


@router.delete("/{emp_id}/delete")
def delete_employee(emp_id: str, db: Session = Depends(get_db)):
    try:

        employee = EmployeeService.delete_emp_by_id(emp_id, db)

        return {
            "success": True,
            "message": "Employee deleted successfully",
        }

    except HTTPException as e:
        raise e

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"{str(e)}"
        )