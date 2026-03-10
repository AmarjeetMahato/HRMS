from pydantic import BaseModel, EmailStr, ConfigDict, Field
from uuid import UUID
from typing import Optional


class EmployeeCreate(BaseModel):
    employee_id: str = Field(..., min_length=2, max_length=20, description="Unique employee ID")
    full_name: str = Field(..., min_length=2, max_length=100, description="Employee full name")
    email: EmailStr = Field(..., description="Valid employee email address")
    department: str = Field(..., min_length=2, max_length=100, description="Department name")

    model_config = ConfigDict(from_attributes=True)


class EmployeeUpdate(BaseModel):
    full_name: Optional[str] = Field(None, min_length=2, max_length=100)
    email: Optional[EmailStr] = None
    department: Optional[str] = Field(None, min_length=2, max_length=100)

    model_config = ConfigDict(from_attributes=True)


class EmployeeResponse(BaseModel):
    id: UUID
    employee_id: str
    full_name: str
    email: EmailStr
    department: str

    model_config = ConfigDict(from_attributes=True)

class EmployeeSchema(BaseModel):
    id: UUID
    employee_id: str
    full_name: str
    email: str
    department: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True    