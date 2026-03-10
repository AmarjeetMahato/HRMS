from pydantic import BaseModel, Field, ConfigDict
from typing import Literal
from uuid import UUID
from datetime import date


class AttendanceCreate(BaseModel):
    employee_id: str = Field(..., description="Employee UUID")
    attendance_date: date = Field(..., description="Attendance date")
    status: Literal["present", "absent"] = Field(..., description="Attendance status")

    model_config = ConfigDict(from_attributes=True)


class AttendanceUpdate(BaseModel):
    attendance_date: date | None = None
    status: Literal["present", "absent"] | None = None

    model_config = ConfigDict(from_attributes=True)


class AttendanceResponse(BaseModel):
    id: UUID
    employee_id: UUID
    attendance_date: date
    status: str

    model_config = ConfigDict(from_attributes=True)