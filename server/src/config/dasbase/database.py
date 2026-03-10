import os
from sqlalchemy  import create_engine 
from src.config.dasbase.base import Base
from sqlalchemy.orm  import sessionmaker
from dotenv import load_dotenv
from src.config.model.Attendance_Model import Attendance
from src.config.model.Employee import Employees

# load .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

engine = create_engine(DATABASE_URL, echo=True)

Sessionlocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create tables if they don't exist
Base.metadata.create_all(bind=engine)


def get_db():
    db=Sessionlocal()
    try:
        yield db
    finally:
        db.close()    
