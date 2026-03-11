# 🚀 HRMS – Human Resource Management System

A **full-stack HRMS application** built with a modern architecture.

The system allows organizations to manage **employees and attendance records** with a scalable backend and a performant frontend.

This project demonstrates a **production-style architecture** using:

* ⚡ Fast backend APIs
* ⚡ Modern React-based frontend
* ⚡ Efficient state management
* ⚡ Clean API structure
* ⚡ Cloud deployment

---

# 🧰 Tech Stack

## Backend

* **Python**
* **FastAPI**
* **PostgreSQL**
* **SQLAlchemy**
* **Pydantic**
* **CORS Middleware**

## Frontend

* **Next.js (TypeScript)**
* **Redux Toolkit**
* **RTK Query**
* **Tailwind CSS**

## Deployment

* Backend → Render
* Frontend → Vercel
* Database → PostgreSQL

---

# 📂 Project Structure

```
HRMS
│
├── server
│   ├── app
│   │   ├── routes
│   │   │   ├── employee_routes.py
│   │   │   └── attendance_routes.py
│   │   │
│   │   ├── models
│   │   ├── schemas
│   │   ├── services
│   │   └── database
│   │
│   └── main.py
│
└── client
    ├── src
    │   ├── app
    │   ├── components
    │   ├── redux
    │   │   ├── store.ts
    │   │   └── api
    │   │
    │   └── pages
    │
    └── package.json
```

---

# ⚙️ Backend API

Base URL

```
/api/v1
```

---

# 👨‍💼 Employee Routes

Prefix

```
/api/v1/employee
```

### Create Employee

```
POST /api/v1/employee/create
```

Creates a new employee record.

---

### Get All Employees

```
GET /api/v1/employee/get_all_emp
```

Returns all employees.

---

### Get Employee by ID

```
GET /api/v1/employee/{emp_id}
```

Returns details of a specific employee.

---

### Delete Employee

```
DELETE /api/v1/employee/{emp_id}/delete
```

Deletes a specific employee.

---

# 📅 Attendance Routes

Prefix

```
/api/v1/attendance
```

---

### Create Attendance

```
POST /api/v1/attendance/create
```

Adds a new attendance record.

---

### Get Attendance Records

```
GET /api/v1/attendance/{emp_id}/records
```

Fetches attendance history for an employee.

---

### Get All Attendance

```
GET /api/v1/attendance/get_all
```

Returns all attendance records.

---

# 🔧 FastAPI Router Setup

Example router configuration inside `main.py`.

```python
from fastapi import FastAPI
from routes.employee_routes import router as Employee_routes
from routes.attendance_routes import router as Attendance_routes

app = FastAPI()

app.include_router(
    Employee_routes,
    prefix="/api/v1/employee",
    tags=["Employee"]
)

app.include_router(
    Attendance_routes,
    prefix="/api/v1/attendance",
    tags=["Attendance"]
)
```

---

# 🌐 CORS Configuration

```python
from fastapi.middleware.cors import CORSMiddleware

origins = [
    "http://localhost:3000",
    "https://hrms-gamma-three.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

# 🎨 Frontend

Frontend built with **Next.js (TypeScript)**.

State management uses:

* Redux Toolkit
* RTK Query

---

# 📡 API Integration using RTK Query

Example API service.

```typescript
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const employeeAPI = createApi({
  reducerPath: "employeeAPI",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL
  }),

  endpoints: (builder) => ({

    getEmployees: builder.query({
      query: () => "/api/v1/employee/get_all_emp"
    }),

    createEmployee: builder.mutation({
      query: (data) => ({
        url: "/api/v1/employee/create",
        method: "POST",
        body: data
      })
    })

  })
})

export const {
  useGetEmployeesQuery,
  useCreateEmployeeMutation
} = employeeAPI
```

---

# 🚀 Local Development

## Backend

```
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```

Server runs at:

```
http://localhost:8000
```

---

## Frontend

```
cd client
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:3000
```

---

# 🌍 Production Deployment

## Backend

Deployed on Render.

Example API URL

```
https://hrms-xj6h.onrender.com
```

---

## Frontend

Deployed on Vercel.

Example Frontend URL

```
https://hrms-gamma-three.vercel.app
```

---

# 🔑 Environment Variables

Frontend `.env`

```
NEXT_PUBLIC_API_URL=https://hrms-xj6h.onrender.com
```

---

# 📌 Features

* Employee management
* Attendance tracking
* Clean REST APIs
* Scalable architecture
* Redux state management
* RTK Query data fetching
* Fast deployment

---

# 📈 Future Improvements

* Authentication system
* Role-based access control
* Leave management
* Payroll system
* Analytics dashboard

---

# 👨‍💻 Author

Developed by **Amarjeet Mahato**

Full Stack Developer

---
