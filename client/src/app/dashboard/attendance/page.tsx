/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, CheckCircle, XCircle, Search,} from 'lucide-react'
import { toast } from 'sonner'
import { format } from 'date-fns'

// Assuming these are your local UI components
import { PageHeader, Button, Card, Table, Th, Td, Modal, SelectField,  ErrorState, Skeleton } from '@/components/ui'
import { avatarColor, today } from '@/app/lib/utils'
import { cn } from '@/app/lib/utils'
import { useCreateAttendanceMutation, useGetAllAttendanceQuery } from '@/redux/rest-api/attendenceAPI'
import { useGetEmployeesQuery } from '@/redux/rest-api/employeeAPI'
import { Employee } from '@/@validation/EmployeeValidation'
import { Attendance } from '@/@validation/AttendenceValidation'

// Types adjusted for your Backend model
const EMPTY_FORM = { 
  employee_id: '', 
  attendance_date: today(), 
  status: 'present' as 'present' | 'absent' 
}

export default function AttendancePage() {
  const [records, setRecords] = useState<Attendance[]>([])
  const [employees, setEmployees] = useState<Employee[]>([])
  const [error, setError] = useState<string | null>(null)

  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState(EMPTY_FORM)
  const [formErrors, setFormErrors] = useState<Partial<typeof EMPTY_FORM>>({})

  // Filtering State
  const [search, setSearch] = useState('')
  const [filterEmp, setFilterEmp] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterFrom, setFilterFrom] = useState('')
  const [filterTo, setFilterTo] = useState('')
   const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);

  const {data,isLoading:empLoading ,refetch} = useGetEmployeesQuery({limit,page})
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

  const loadData = useCallback(async () => {
    // try {
    //   setLoading(true)
    //   setError(null)
    //   const [recs, emps] = await Promise.all([
    //     attendanceApi.getAll(), 
    //     employeeApi.getAll()
    //   ])
    //   setRecords(recs)
    //   setEmployees(emps)
    // } catch (e: any) {
    //   setError(e.message || 'Failed to load data')
    // } finally {
    //   setLoading(false)
    // }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  const validate = () => {
    const errs: Partial<typeof EMPTY_FORM> = {}
    if (!form.employee_id) errs.employee_id = 'Select an employee'
    if (!form.attendance_date) errs.attendance_date = 'Date is required'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const [markAttendence, {isLoading}] = useCreateAttendanceMutation();
const handleMarkAttendance = async () => {
  if (!form.employee_id || !form.status) {
    toast.error("Please select an employee and status")
    return
  }

  try {
    // Trigger the mutation
    const response = await markAttendence(form).unwrap() // unwrap to catch errors
        // Extract actual attendance data
    const attendanceRecord: Attendance = {
      ...response.data, // spread the data object
      created_at: new Date(response.data.created_at),
      updated_at: response.data.updated_at ? new Date(response.data.updated_at).toISOString() : '',
    }

    setRecords(prev => [attendanceRecord, ...prev])
    toast.success(`Attendance marked successfully`)
    // Reset form and close modal
    setModalOpen(false)
    setForm(EMPTY_FORM)
  } catch (err: any) {
    // Handle error from backend or network
    toast.error(err?.data?.detail || err?.message || "Could not save attendance")
  }
}

const {data:allAttendenceData,isLoading:attendenceLoading} = useGetAllAttendanceQuery()
useEffect(()=>{
    if(allAttendenceData?.data){
      setRecords(allAttendenceData?.data)
    }
})
  // Helpers
  const empMap = Object.fromEntries(employees.map(e => [e.id, e]))
  const hasFilters = !!(search || filterEmp || filterStatus || filterFrom || filterTo)
  
const filtered = records.filter(r => {
  const emp = empMap[r.employee_id];
  const q = search.toLowerCase();
  const recordDateStr = format(new Date(r.attendance_date), 'yyyy-MM-dd');
  return (
    (!q || (emp?.full_name.toLowerCase().includes(q) || emp?.employee_id.toLowerCase().includes(q))) &&
    (!filterEmp || r.employee_id === filterEmp) &&
    (!filterStatus || r.status === filterStatus) &&
    // Compare string vs string (e.g., "2026-03-10" >= "2026-03-01")
    (!filterFrom || recordDateStr >= filterFrom) &&
    (!filterTo || recordDateStr <= filterTo)
  );
});
  console.log("filter Map ", filtered);
  
  return (
    <main className="container mx-auto p-4 lg:p-8 space-y-6">
      <PageHeader
        title="Attendance Tracking"
        subtitle={`${filtered.length} visible records`}
        action={
          <Button icon={<Plus className="w-4 h-4" />} onClick={() => setModalOpen(true)}>
            Mark Attendance
          </Button>
        }
      />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard label="Present Today" value={filtered.filter(r => r.status === 'present').length} color="emerald" icon={<CheckCircle />} />
        <StatsCard label="Absent Today" value={filtered.filter(r => r.status === 'absent').length} color="rose" icon={<XCircle />} />
        {hasFilters && (
          <Button variant="ghost" className="h-full border-dashed border-2" onClick={() => { setSearch(''); setFilterEmp(''); setFilterStatus(''); setFilterFrom(''); setFilterTo('') }}>
            Reset All Filters
          </Button>
        )}
      </div>

      {/* Modern Filter Bar */}
      <Card className="p-4 bg-slate-900/50 border-slate-800 backdrop-blur-md">
        <div className="flex flex-wrap gap-3">
          <div className="relative grow max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by name or ID..."
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none"
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="present">Present</option>
            <option value="absent">Absent</option>
          </select>

          <input 
            type="date" 
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm outline-none text-slate-400"
            value={filterFrom}
            onChange={e => setFilterFrom(e.target.value)}
          />
        </div>
      </Card>

      {/* Data Table */}
      <Card className="overflow-hidden border-slate-800">
        {empLoading ? (
          <AttSkeleton />
        ) : error ? (
          <ErrorState message={error} onRetry={loadData} />
        ) : (
          <Table>
            <thead className="bg-slate-950/50">
              <tr>
                <Th>Employee</Th>
                <Th>System ID</Th>
                <Th>Date</Th>
                <Th>Status</Th>
                <Th className="text-right">Logged Time</Th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filtered.map((rec) => (
                <tr key={rec.id} className="group hover:bg-slate-900/40 transition-colors">
                  <Td>
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border border-white/10"
                        style={{ backgroundColor: avatarColor(empMap[rec.employee_id]?.full_name || 'U') }}
                      >
                        {empMap[rec.employee_id]?.full_name[0] || '?'}
                      </div>
                      <div>
                        <p className="font-medium text-slate-200">{empMap[rec.employee_id]?.full_name || 'Unknown'}</p>
                        <p className="text-xs text-slate-500">{empMap[rec.employee_id]?.department}</p>
                      </div>
                    </div>
                  </Td>
                  <Td><span className="font-mono text-xs text-blue-400">{empMap[rec.employee_id]?.employee_id}</span></Td>
                  <Td className="text-slate-300">{(rec.attendance_date)}</Td>
                  <Td>
                    <StatusBadge status={rec.status} />
                  </Td>
                  <Td className="text-right text-xs text-slate-500">
                    {format(new Date(rec.created_at), 'hh:mm a')}
                  </Td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Card>

      {/* Mark Attendance Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="New Attendance Entry">
        <div className="space-y-4 py-4">
          <SelectField 
            label="Select Employee" 
            value={form.employee_id} 
            onChange={e => setForm({...form, employee_id: e.target.value})}
            error={formErrors.employee_id}
          >
            <option value="">-- Choose Employee --</option>
            {employees.map(e => (
              <option key={e.id} value={e.id}>{e.full_name} ({e.employee_id})</option>
            ))}
          </SelectField>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Date</label>
            <input 
              type="date" 
              max={today()}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white"
              value={form.attendance_date}
              onChange={e => setForm({...form, attendance_date: e.target.value})}
            />
          </div>

          <div className="flex gap-4">
             {['present', 'absent'].map((s) => (
               <button
                key={s}
                type="button"
                onClick={() => setForm({...form, status: s as any})}
                className={cn(
                  "flex-1 py-3 rounded-xl border-2 transition-all capitalize font-bold",
                  form.status === s 
                    ? (s === 'present' ? "bg-emerald-500/10 border-emerald-500 text-emerald-500" : "bg-rose-500/10 border-rose-500 text-rose-500")
                    : "bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700"
                )}
               >
                 {s}
               </button>
             ))}
          </div>

          <Button 
            className="w-full h-12 text-lg" 
            loading={isLoading} 
            onClick={handleMarkAttendance}
          >
           {isLoading ? "Updating..." : "Confirm Entry"} 
          </Button>
        </div>
      </Modal>
    </main>
  )
}

// Sub-components for cleaner code
function StatsCard({ label, value, color, icon }: any) {
  const colors: any = {
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  }
  return (
    <div className={cn("p-4 rounded-2xl border flex items-center justify-between", colors[color])}>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider opacity-70">{label}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="opacity-20">{icon}</div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const isPresent = status.toLowerCase() === 'present'
  return (
    <span className={cn(
      "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-tight",
      isPresent ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/30" : "bg-rose-500/20 text-rose-400 ring-1 ring-rose-500/30"
    )}>
      {isPresent ? <CheckCircle size={10} /> : <XCircle size={10} />}
      {status}
    </span>
  )
}

const AttSkeleton = () => (
  <div className="space-y-4 p-4">
    {[...Array(5)].map((_, i) => (
      <div key={i} className="flex gap-4 items-center">
        <Skeleton className="w-10 h-10 rounded-full" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
        <Skeleton className="h-6 w-1/4" />
      </div>
    ))}
  </div>
)