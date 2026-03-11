import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const DEPARTMENTS = [
  'Engineering', 'Product', 'Design', 'Marketing', 'Sales',
  'Human Resources', 'Finance', 'Operations', 'Legal', 'Customer Support',
]

export const AVATAR_PALETTE = [
  '#2563eb', '#10b981', '#7c3aed', '#f59e0b', '#f43f5e', '#06b6d4', '#ec4899', '#84cc16',
]

export function avatarColor(seed: string): string {
  let hash = 0
  for (const c of seed) hash = c.charCodeAt(0) + ((hash << 5) - hash)
  return AVATAR_PALETTE[Math.abs(hash) % AVATAR_PALETTE.length]
}

export const today = () => new Date().toISOString().split('T')[0]
