import React, { type ButtonHTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes, type ReactNode } from 'react'
import {cn} from "../app/lib/utils"
// ─── Button ───────────────────────────────────────────────────────────────────

type BtnVariant = 'primary' | 'danger' | 'outline' | 'ghost'
type BtnSize = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BtnVariant
  size?: BtnSize
  loading?: boolean
  icon?: ReactNode
}

const btnVariants: Record<BtnVariant, string> = {
  primary: 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_2px_12px_rgba(37,99,235,0.4)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.55)] hover:-translate-y-px active:translate-y-0',
  danger: 'bg-rose-600 text-white hover:bg-rose-500 shadow-[0_2px_10px_rgba(244,63,94,0.3)] hover:-translate-y-px active:translate-y-0',
  outline: 'border border-[#1e2d44] text-slate-400 hover:border-[#2a3f5c] hover:text-slate-200 hover:bg-[#111827]',
  ghost: 'text-slate-400 hover:text-slate-200 hover:bg-[#111827]',
}

const btnSizes: Record<BtnSize, string> = {
  sm: 'px-3 py-1.5 text-[13px] gap-1.5',
  md: 'px-4 py-2.5 text-sm gap-2',
  lg: 'px-5 py-3 text-base gap-2',
}

export const Button = ({ variant = 'primary', size = 'md', loading, icon, children, className, disabled, ...props }: ButtonProps) => (
  <button
    {...props}
    disabled={disabled || loading}
    className={cn(
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 cursor-pointer select-none whitespace-nowrap',
      'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
      btnVariants[variant], btnSizes[size], className
    )}
  >
    {loading
      ? <span className="w-3.5 h-3.5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
      : icon && <span className="flex items-center">{icon}</span>
    }
    {children}
  </button>
)

// ─── Input ────────────────────────────────────────────────────────────────────

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  hint?: string
  icon?: ReactNode
}

export const Input = ({ label, error, hint, icon, required, className, ...props }: InputProps) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-[13px] font-semibold text-slate-400 tracking-wide">
        {label} {required && <span className="text-blue-400">*</span>}
      </label>
    )}
    <div className="relative flex items-center">
      {icon && <span className="absolute left-3 text-slate-500 flex pointer-events-none">{icon}</span>}
      <input
        {...props}
        className={cn(
          'w-full bg-[#111827] border border-[#1e2d44] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-medium',
          'placeholder:text-slate-600 transition-all duration-200',
          'hover:border-[#2a3f5c]',
          'focus:outline-none focus:border-blue-600 focus:bg-[#0c1220] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]',
          icon && 'pl-9',
          error && 'border-rose-600 focus:border-rose-500 focus:shadow-[0_0_0_3px_rgba(244,63,94,0.12)]',
          className
        )}
      />
    </div>
    {error && <p className="text-[12px] text-rose-400 font-medium">{error}</p>}
    {hint && !error && <p className="text-[12px] text-slate-600">{hint}</p>}
  </div>
)

// ─── Select ───────────────────────────────────────────────────────────────────

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
}

export const SelectField = ({ label, error, required, className, children, ...props }: SelectFieldProps) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-[13px] font-semibold text-slate-400 tracking-wide">
        {label} {required && <span className="text-blue-400">*</span>}
      </label>
    )}
    <select
      {...props}
      className={cn(
        'w-full bg-[#111827] border border-[#1e2d44] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 font-medium',
        'appearance-none cursor-pointer transition-all duration-200',
        'hover:border-[#2a3f5c]',
        'focus:outline-none focus:border-blue-600 focus:bg-[#0c1220] focus:shadow-[0_0_0_3px_rgba(37,99,235,0.12)]',
        error && 'border-rose-600',
        className
      )}
    >
      {children}
    </select>
    {error && <p className="text-[12px] text-rose-400 font-medium">{error}</p>}
  </div>
)

// ─── Badge ────────────────────────────────────────────────────────────────────

type BadgeColor = 'blue' | 'green' | 'red' | 'amber' | 'violet' | 'slate'

const badgeVariants: Record<BadgeColor, string> = {
  blue:   'bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/20',
  green:  'bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20',
  red:    'bg-rose-500/10 text-rose-400 ring-1 ring-rose-500/20',
  amber:  'bg-amber-500/10 text-amber-400 ring-1 ring-amber-500/20',
  violet: 'bg-violet-500/10 text-violet-400 ring-1 ring-violet-500/20',
  slate:  'bg-slate-500/10 text-slate-400 ring-1 ring-slate-500/20',
}

export const Badge = ({ children, color = 'blue' }: { children: ReactNode; color?: BadgeColor }) => (
  <span className={cn('inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide', badgeVariants[color])}>
    {children}
  </span>
)

// ─── Card ─────────────────────────────────────────────────────────────────────

export const Card = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={cn('bg-[#0c1220] border border-[#1e2d44] rounded-2xl overflow-hidden', className)}>
    {children}
  </div>
)

// ─── Stat Card ────────────────────────────────────────────────────────────────

type StatColor = 'blue' | 'green' | 'red' | 'violet' | 'amber'

const statAccents: Record<StatColor, { bar: string; icon: string; glow: string }> = {
  blue:   { bar: 'from-blue-500',   icon: 'bg-blue-500/10 text-blue-400',   glow: 'hover:shadow-[0_4px_24px_rgba(37,99,235,0.12)]' },
  green:  { bar: 'from-emerald-500',icon: 'bg-emerald-500/10 text-emerald-400', glow: 'hover:shadow-[0_4px_24px_rgba(16,185,129,0.12)]' },
  red:    { bar: 'from-rose-500',   icon: 'bg-rose-500/10 text-rose-400',   glow: 'hover:shadow-[0_4px_24px_rgba(244,63,94,0.12)]' },
  violet: { bar: 'from-violet-500', icon: 'bg-violet-500/10 text-violet-400', glow: 'hover:shadow-[0_4px_24px_rgba(124,58,237,0.12)]' },
  amber:  { bar: 'from-amber-500',  icon: 'bg-amber-500/10 text-amber-400', glow: 'hover:shadow-[0_4px_24px_rgba(245,158,11,0.12)]' },
}

interface StatCardProps {
  label: string
  value: number | string
  icon: ReactNode
  color?: StatColor
  sub?: string
}

export const StatCard = ({ label, value, icon, color = 'blue', sub }: StatCardProps) => {
  const a = statAccents[color]
  return (
    <div className={cn(
      'relative bg-[#0c1220] border border-[#1e2d44] rounded-2xl p-5 overflow-hidden',
      'transition-all duration-300 hover:-translate-y-0.5 hover:border-[#2a3f5c]', a.glow
    )}>
      <div className={cn('absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r to-transparent', a.bar)} />
      <div className="flex items-start justify-between mb-4">
        <span className="text-[11px] font-bold tracking-[1px] uppercase text-slate-500">{label}</span>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center', a.icon)}>{icon}</div>
      </div>
      <div className="font-['Outfit'] text-3xl font-extrabold text-slate-50 leading-none">{value}</div>
      {sub && <p className="text-[12px] text-slate-600 mt-2 font-medium">{sub}</p>}
    </div>
  )
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn('skeleton', className)} />
)

// ─── Empty State ──────────────────────────────────────────────────────────────

interface EmptyStateProps {
  icon: ReactNode
  title: string
  description?: string
  action?: ReactNode
}

export const EmptyState = ({ icon, title, description, action }: EmptyStateProps) => (
  <div className="flex flex-col items-center justify-center py-20 text-center gap-4 animate-fade-in">
    <div className="w-16 h-16 bg-[#0c1220] border border-[#1e2d44] rounded-2xl flex items-center justify-center text-slate-600">
      {icon}
    </div>
    <div>
      <h3 className="text-base font-bold text-slate-200">{title}</h3>
      {description && <p className="text-sm text-slate-500 mt-1 max-w-xs">{description}</p>}
    </div>
    {action && <div className="mt-2">{action}</div>}
  </div>
)

// ─── Error State ──────────────────────────────────────────────────────────────

export const ErrorState = ({ message, onRetry }: { message?: string; onRetry?: () => void }) => (
  <div className="flex flex-col items-center gap-4 py-16 text-center animate-fade-in">
    <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center justify-center text-2xl">⚠️</div>
    <p className="text-sm text-slate-400 max-w-xs">{message || 'Something went wrong'}</p>
    {onRetry && <Button variant="outline" size="sm" onClick={onRetry}>Try again</Button>}
  </div>
)

// ─── Modal ────────────────────────────────────────────────────────────────────

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  children: ReactNode
  maxWidth?: string
}

export const Modal = ({ open, onClose, title, children, maxWidth = 'max-w-md' }: ModalProps) => {
  if (!open) return null
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className={cn('w-full bg-[#0c1220] border border-[#2a3f5c] rounded-2xl shadow-2xl animate-fade-up', maxWidth)}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1e2d44]">
          <h2 className="text-base font-bold text-slate-100">{title}</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-200 hover:bg-[#111827] rounded-lg px-2 py-1 text-sm transition-all">✕</button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// ─── Page Header ──────────────────────────────────────────────────────────────

export const PageHeader = ({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) => (
  <div className="flex items-start justify-between gap-4 mb-7 flex-wrap">
    <div>
      <h1 className="text-2xl font-extrabold text-slate-50 tracking-tight">{title}</h1>
      {subtitle && <p className="text-sm text-slate-500 mt-0.5 font-medium">{subtitle}</p>}
    </div>
    {action && <div className="flex items-center gap-2">{action}</div>}
  </div>
)

// ─── Table ────────────────────────────────────────────────────────────────────

export const Table = ({ children }: { children: ReactNode }) => (
  <div className="overflow-x-auto rounded-2xl border border-[#1e2d44]">
    <table className="w-full text-sm border-collapse">{children}</table>
  </div>
)

export const Th = ({ children, className }: { children: ReactNode; className?: string }) => (
  <th className={cn('px-4 py-3 text-left text-[11px] font-bold tracking-widest uppercase text-slate-500 bg-[#0c1220] border-b border-[#1e2d44] whitespace-nowrap', className)}>
    {children}
  </th>
)

export const Td = ({ children, className }: { children: ReactNode; className?: string }) => (
  <td className={cn('px-4 py-3.5 text-slate-300 border-b border-[#1e2d44] last:border-0 align-middle', className)}>
    {children}
  </td>
)
