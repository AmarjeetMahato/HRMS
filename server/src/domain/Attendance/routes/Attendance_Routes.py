from fastapi import HTTPException,APIRouter,Depends
from fastapi.encoders import jsonable_encoder
from src.domain.Attendance.service.Attendance_Service import AttendanceService
from src.domain.Attendance.dto.AttendanceDto import AttendanceCreate
from src.config.dasbase.database import get_db

router = APIRouter()

@router.post("/create")
def create_attendence(atten_data:AttendanceCreate,db:Session=Depends(get_db))->dict:
         try:
            result = AttendanceService.mark_attendance(atten_data,db)
            return {
               "success": True,
                "message": "Attendence marked successfully", 
                "data": jsonable_encoder(result)
                }
         except Exception as e:
           raise HTTPException(
                    status_code=500,
                    detail=f" {str(e)}"
           ) 


@router.get("/{emp_id}/records")
def employee_attendence_record(emp_id:str,db:Session=Depends(get_db))->dict:
         try:
              emp_attendence = AttendanceService.view_attendence_record(emp_id,db)
              return {
               "success": True, 
               "message": "Attendence record fetch successfully",
                "data": jsonable_encoder(emp_attendence)
                }
         except Exception as e:
               raise HTTPException(
                    status_code=500,
                    detail=f"An unexpected error occurred: {str(e)}"
           ) 


@router.get("/get_all")
def get_all_records(db:Session=Depends(get_db)):
     try:
         result = AttendanceService.get_all_records(db)
         return {
              "success":True,
              "message":"fetch Successfully",
              "data":result
         }  
     except Exception as e:
         raise HTTPException(
              status_code=500,
              detail=f"{str(e)}"
         )
        

