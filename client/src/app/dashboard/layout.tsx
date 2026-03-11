"use client"
import { usePathname } from "next/navigation"
import { useState } from 'react'
import { LucideIcon, Users, CalendarCheck, Menu, X, Briefcase, ChevronRight, Dot } from 'lucide-react'
import { cn } from "../lib/utils"
import Link from "next/link"

type NavItem = {
  to: string
  icon: LucideIcon
  label: string
  sub: string
}

const NAV: NavItem[] = [
  { to: "/dashboard/employee", icon: Users, label: "Employees", sub: "Manage team" },
  { to: "/dashboard/attendance", icon: CalendarCheck, label: "Attendance", sub: "Track daily" },
]

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const currentLabel =
    NAV.find((n) => pathname.startsWith(n.to))?.label ?? "HRMS"

  
    console.log("currentLabel ", currentLabel);
    

  return (
    <div className="flex w-full min-h-screen">
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
  className={cn(
    "fixed top-0 left-0 h-screen w-64 z-50 flex flex-col",
    "bg-[#0c1220] border-r border-[#1e2d44]",
    "transition-transform duration-300 ease-[cubic-bezier(.22,1,.36,1)]",
    "lg:translate-x-0",
    open ? "translate-x-0" : "-translate-x-full"
  )}
>
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-[#1e2d44]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center">
              <Briefcase size={17} className="text-white" />
            </div>

            <div className="flex items-baseline gap-2">
              <Link href={"/"} className="text-[19px] font-extrabold text-slate-50">
                HRMS
              </Link>
              <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full">
                LITE
              </span>
            </div>
          </div>

          <button
            onClick={() => setOpen(false)}
            className="lg:hidden text-slate-500"
          >
            <X size={18} />
          </button>
        </div>

        {/* Menu */}
        <p className="text-[10px] font-bold tracking-[1.5px] uppercase text-slate-600 px-5 pt-5 pb-2">
          Menu
        </p>

        <nav className="flex flex-col gap-1 px-3 flex-1">
          {NAV.map(({ to, icon: Icon, label, sub }) => {
            const isActive = pathname === to || pathname.startsWith(to + "/")

            return (
              <Link
                key={to}
                href={to}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group",
                  isActive
                    ? "bg-blue-600/10 border border-blue-500/20 text-blue-400"
                    : "text-slate-500 hover:text-slate-200 hover:bg-[#111827]"
                )}
              >
                <div
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center",
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-[#111827] group-hover:bg-[#1a2336]"
                  )}
                >
                  <Icon size={15} />
                </div>

                <div className="flex-1">
                  <div className="text-[13px] font-semibold">{label}</div>
                  <div
                    className={cn(
                      "text-[11px]",
                      isActive ? "text-blue-400/70" : "text-slate-600"
                    )}
                  >
                    {sub}
                  </div>
                </div>

                <ChevronRight
                  size={13}
                  className={cn(
                    "transition-all",
                    isActive
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-60"
                  )}
                />
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-[#1e2d44] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-emerald-400 text-[12px] font-semibold">
            <Dot size={18} className="animate-pulse" />
            System Online
          </div>

          <span className="text-[11px] text-slate-600 font-medium">
            v1.0.0
          </span>
        </div>
      </aside>

      {/* Main */}
       <div className="flex-1 flex flex-col min-w-0 bg-[#06090f] lg:ml-64">
        {/* Topbar */}
        <header className="h-14 flex items-center justify-between px-5 bg-[#0c1220] border-b border-[#1e2d44] sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="lg:hidden text-slate-400"
            >
              <Menu size={20} />
            </button>

            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-600">Admin</span>
              <ChevronRight size={13} className="text-slate-700" />
              <span className="font-bold text-slate-200">
                {currentLabel}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 bg-[#111827] border border-[#1e2d44] rounded-full pl-1.5 pr-4 py-1.5">
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center text-[12px] font-bold text-white">
              A
            </div>

            <div className="hidden sm:block">
              <div className="text-[13px] font-semibold text-slate-200">
                Admin
              </div>
              <div className="text-[11px] text-slate-500">
                HR Manager
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
