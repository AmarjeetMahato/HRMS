from uuid import uuid4, UUID
from datetime import datetime
from sqlalchemy import String, DateTime, ForeignKey,Date
from sqlalchemy.orm import Mapped, mapped_column, relationship
from src.config.dasbase.base import Base
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from pydantic import BaseModel, Field, ConfigDict
from typing import Literal

class Attendance(Base):
    __tablename__ = "attendance"

    id: Mapped[str] = mapped_column(PG_UUID(as_uuid=True), primary_key=True, unique=True, default=uuid4)
    employee_id: Mapped[UUID] = mapped_column(ForeignKey("employees.id"))
    attendance_date: Mapped[Date] = mapped_column(Date, nullable=False)
    status: Mapped[str] = mapped_column(String, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False )
    updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    employee: Mapped["Employees"] = relationship("Employees", back_populates="attendances")

