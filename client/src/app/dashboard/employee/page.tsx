/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useEffect, useState, type ChangeEvent, useMemo } from 'react'
import { Plus, Trash2, Search, Users, Mail, Building2, Hash, ChevronDown } from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'

// Assuming these are migrated to your Next.js components folder
import { 
  PageHeader, Button, Card, Table, Th, Td, Badge, Modal, 
  Input, SelectField, EmptyState, ErrorState, Skeleton 
} from '@/components/ui'

import { DEPARTMENTS, avatarColor } from '@/app/lib/utils'
import { Employee, EmployeeCreate } from '@/@validation/EmployeeValidation'
import { useCreateEmployeeMutation, useDeleteEmployeeMutation, useGetEmployeesQuery } from '@/redux/rest-api/employeeAPI'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

/**
 * Component Constants & Types
 */
const DEPT_COLOR: Record<string, 'blue' | 'green' | 'red' | 'amber' | 'violet' | 'slate'> = {
  Engineering: 'blue', Product: 'violet', Design: 'amber', Marketing: 'green',
  Sales: 'red', 'Human Resources': 'violet', Finance: 'green',
  Operations: 'blue', Legal: 'amber', 'Customer Support': 'green',
}

const EMPTY_FORM: EmployeeCreate = { employee_id: '', full_name: '', email: '', department: '' }

export default function EmployeesPage() {
  // State Management
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [form, setForm] = useState<EmployeeCreate>(EMPTY_FORM)
  const [errors, setErrors] = useState<Partial<EmployeeCreate>>({})
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null)
  const [search, setSearch] = useState('')
  const [deptFilter, setDeptFilter] = useState('')
   const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  console.log("employees", employees);
  

const {data,isLoading ,refetch} = useGetEmployeesQuery({limit,page})
// Update local state whenever data changes
  useEffect(() => {
    if (data?.data) {
      setEmployees(data.data);
    }
  }, [data]);
  // Data Loading
    // Optional: manual refresh
  const loadEmployees = async () => {
    try {
      refetch(); // this will re-fetch the query
    } catch (err) {
      console.error("Failed to reload employees", err);
    }
  };

  useEffect(() => {
    loadEmployees()
  }, [])

  // Validation Logic
  const validate = (): boolean => {
    const newErrs: Partial<EmployeeCreate> = {}
    const id = form.employee_id.trim()
    
    if (!id) newErrs.employee_id = 'Required'
    else if (!/^[A-Za-z0-9\-_]{2,20}$/.test(id)) newErrs.employee_id = '2–20 chars: letters, numbers, - _'
    
    if (!form.full_name.trim()) newErrs.full_name = 'Required'
    
    if (!form.email.trim()) newErrs.email = 'Required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrs.email = 'Invalid email'
    
    if (!form.department) newErrs.department = 'Required'
    
    setErrors(newErrs)
    return Object.keys(newErrs).length === 0
  }

// 1. Initialize the mutation hook
const [createEmployee, { isLoading: isSubmitting }] = useCreateEmployeeMutation();

// 2. Action Handler
const handleAddEmployee = async () => {
  if (!validate()) return;
  try {
    const response = await createEmployee(form).unwrap();
    toast.success(`${response.data?.full_name ?? 'Employee'} added successfully!`);
    setAddOpen(false);
    setForm(EMPTY_FORM);
    setErrors({});
  } catch (e: any) {
    const errMsg = e.data?.details || e.error || "Could not add employee";
    toast.error(errMsg);
  }
};

const [deleteEmployee, { isLoading: deleting }] = useDeleteEmployeeMutation()
 const handleDeleteEmployee = async (emp_id:string,emp_name:string) => {
  if (!emp_id) return
  try {
    await deleteEmployee(emp_id).unwrap()
    toast.success(`${emp_name} removed`)
    setDeleteTarget(null)
  } catch (err: unknown) {
    if (typeof err === 'object' && err !== null && 'status' in err) {
      const e = err as FetchBaseQueryError
      toast.error((e.data as any)?.detail || e.data || 'Could not delete employee')
    } else {
      toast.error((err as Error).message || 'Could not delete employee')
    }
    }
}

  const handleInputChange = (field: keyof EmployeeCreate) => (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }))
  }

  // Memoized Filters
  const departmentsList = useMemo(() => 
    [...new Set(employees.map(e => e.department))].sort(), 
  [employees])

  const filteredEmployees = useMemo(() => {
    const query = search.toLowerCase()
    return employees.filter(emp => {
      const matchesSearch = !query || [
        emp.full_name, emp.employee_id, emp.email, emp.department
      ].some(v => v.toLowerCase().includes(query))
      
      const matchesDept = !deptFilter || emp.department === deptFilter
      
      return matchesSearch && matchesDept
    })
  }, [employees, search, deptFilter])



  return (
    <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <PageHeader
        title="Employees"
        subtitle={`${employees.length} team member${employees.length !== 1 ? 's' : ''}`}
        action={
          <Button 
            icon={<Plus size={16} />} 
            onClick={() => { setAddOpen(true); setForm(EMPTY_FORM); setErrors({}) }}
          >
            Add Employee
          </Button>
        }
      />

      {/* Filter Toolbar */}
      <Card className="flex flex-col sm:flex-row items-center gap-4 p-4 border-slate-800 bg-slate-900/50">
        <div className="relative w-full sm:flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-all"
            placeholder="Search by name, ID, or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button 
              onClick={() => setSearch('')} 
              className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-200"
            >
              ✕
            </button>
          )}
        </div>
        
        <div className="relative w-full sm:w-auto">
          <Building2 size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
          <select
            className="w-full sm:min-w-50 bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-10 py-2.5 text-sm text-slate-300 appearance-none cursor-pointer focus:outline-none focus:border-blue-600 transition-all"
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
          >
            <option value="">All Departments</option>
            {departmentsList.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </Card>

      {/* Main Content Area */}
      {isLoading ? (
        <EmpSkeleton />
      ) : error ? (
        <ErrorState message={error} onRetry={loadEmployees} />
      ) : filteredEmployees.length === 0 ? (
        <EmptyState
          icon={<Users size={40} className="text-slate-700" />}
          title={search || deptFilter ? 'No matches found' : 'The team is empty'}
          description={search || deptFilter ? 'Try clearing your filters' : 'Get started by adding your first employee.'}
          action={!search && !deptFilter ? <Button onClick={() => setAddOpen(true)}>Add Employee</Button> : undefined}
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/20 backdrop-blur-sm">
          <Table>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/50">
                <Th>Employee</Th>
                <Th>ID</Th>
                <Th>Email</Th>
                <Th>Department</Th>
             
                <Th>Joined</Th>
                <Th className="w-20">Remove</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredEmployees.map((emp, i) => (
                <tr 
                  key={emp.employee_id} 
                  className="group hover:bg-blue-600/5 transition-colors"
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <Td>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-inner" 
                        style={{ background: avatarColor(emp.full_name) }}
                      >
                        {emp.full_name.charAt(0)}
                      </div>
                      <span className="font-medium text-slate-200">{emp.full_name}</span>
                    </div>
                  </Td>
                  <Td>
                    <span className="font-mono text-[11px] px-2 py-1 rounded-md bg-slate-800 text-blue-400 border border-slate-700">
                      {emp.employee_id}
                    </span>
                  </Td>
                  <Td className="text-slate-400 text-sm">{emp.email}</Td>
                  <Td><Badge color={DEPT_COLOR[emp.department] ?? 'slate'}>{emp.department}</Badge></Td>
                
                  <Td className="text-slate-500 text-xs">
                    {format(new Date(emp.created_at), 'MMM dd, yyyy')}
                  </Td>
                  <Td>
                    <button
                      onClick={() => setDeleteTarget(emp)}
                      className="p-2 text-slate-600 cursor-pointer hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                      title="Delete Employee"
                    >
                      <Trash2 size={16} />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Add Modal */}
      <Modal open={addOpen} onClose={() => setAddOpen(false)} title="New Employee">
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input 
              label="Employee ID" 
              placeholder="E-12345" 
              value={form.employee_id} 
              onChange={handleInputChange('employee_id')} 
              error={errors.employee_id} 
              icon={<Hash size={14} />} 
              required 
            />
            <Input 
              label="Full Name" 
              placeholder="John Doe" 
              value={form.full_name} 
              onChange={handleInputChange('full_name')} 
              error={errors.full_name} 
              icon={<Users size={14} />} 
              required 
            />
          </div>
          <Input 
            label="Email Address" 
            type="email" 
            placeholder="john@company.com" 
            value={form.email} 
            onChange={handleInputChange('email')} 
            error={errors.email} 
            icon={<Mail size={14} />} 
            required 
          />
          <SelectField 
            label="Department" 
            value={form.department} 
            onChange={handleInputChange('department')} 
            error={errors.department} 
            required
          >
            <option value="">Select a department</option>
            {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
          </SelectField>
          
          <div className="flex justify-end gap-3 pt-6 mt-2 border-t border-slate-800">
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button loading={isSubmitting} onClick={handleAddEmployee}>
              { isSubmitting ? "Creating..." : "Create Employee"}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Removal" maxWidth="max-w-md">
        <div className="flex flex-col items-center text-center py-4">
          <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-full flex items-center justify-center mb-4 ring-8 ring-rose-500/5">
            <Trash2 size={28} />
          </div>
          <h3 className="text-lg font-semibold text-slate-100 mb-1">Remove Employee?</h3>
          <p className="text-slate-400 text-sm leading-relaxed">
            You are about to delete <span className="text-slate-100 font-bold">{deleteTarget?.full_name}</span>. 
            All associated attendance records will be permanently erased.
          </p>
        </div>
        <div className="flex justify-end gap-3 pt-6 border-t border-slate-800">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>Keep Employee</Button>
          <Button variant="danger" loading={deleting} 
            onClick={() => {
  if (deleteTarget) {
    handleDeleteEmployee(deleteTarget.id, deleteTarget.full_name)
  }
}}
          >Delete Permanently</Button>
        </div>
      </Modal>
    </div>
  )
}

// Optimized Skeleton for Next.js
function EmpSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900/20 p-1">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="flex items-center gap-4 p-4 border-b last:border-0 border-slate-800/50">
          <Skeleton className="w-10 h-10 rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="ml-auto flex gap-4">
            <Skeleton className="h-8 w-24 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}