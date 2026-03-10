from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.domain.Employee.routes.Employee_Routes import router as Employee_routes
from src.domain.Attendance.routes.Attendance_Routes import router as Attendance_routes



app = FastAPI();


origins = [
      "http://localhost:3000",  # React default port
    "http://127.0.0.1:3000",  # sometimes 127.0.0.1 is used
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"], #Be specific.
    allow_headers=["Content-Type", "Authorization"], #Be specific.
)

# Include the auth router with a specific prefix
app.include_router(Employee_routes, prefix="/api/v1/employee", tags=["Employee"])
app.include_router(Attendance_routes,prefix="/api/v1/attendance",tags=["Attendence"])


@app.get("/")
def root_app()->dict:
    return {message:"Hello World"}