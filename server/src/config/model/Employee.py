from uuid import uuid4, UUID
from sqlalchemy import String,DateTime
from datetime import datetime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.dialects.postgresql import UUID as PG_UUID
from src.config.dasbase.base import Base
from sqlalchemy.dialects.postgresql import UUID

class Employees(Base):
      __tablename__="employees"

      id:Mapped[str] = mapped_column(PG_UUID(as_uuid=True),primary_key=True,unique=True, default=uuid4)
      employee_id: Mapped[str] = mapped_column(String, unique=True, nullable=False)
      full_name: Mapped[str] = mapped_column(String, nullable=False)
      email: Mapped[str] = mapped_column(String, unique=True, nullable=False)
      department: Mapped[str] = mapped_column(String, nullable=False)
      created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, nullable=False )
      updated_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

      attendances = relationship("Attendance", back_populates="employee")