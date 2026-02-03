export interface User {
  id: string
  name: string
  email: string
  role: 'Admin' | 'Editor' | 'Viewer'
  status: 'Active' | 'Inactive' | 'Pending'
  lastLogin: string
  joinDate: string
}

export interface StatCard {
  title: string
  value: string | number
  change: number
  icon: string
  description: string
}

export interface SidebarItem {
  title: string
  icon: string
  href: string
  badge?: number
}

export interface TableFilter {
  search: string
  role: string
  status: string
}

export interface PaginationState {
  currentPage: number
  itemsPerPage: number
  totalItems: number
}