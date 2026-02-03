import { User, StatCard, SidebarItem } from './types'

export const users: User[] = [
  { id: '1', name: 'Alex Johnson', email: 'alex@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15 14:30', joinDate: '2023-05-10' },
  { id: '2', name: 'Maria Garcia', email: 'maria@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-14 09:15', joinDate: '2023-08-22' },
  { id: '3', name: 'David Chen', email: 'david@example.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-13 16:45', joinDate: '2023-11-05' },
  { id: '4', name: 'Sarah Williams', email: 'sarah@example.com', role: 'Editor', status: 'Pending', lastLogin: '2024-01-10 11:20', joinDate: '2024-01-08' },
  { id: '5', name: 'Michael Brown', email: 'michael@example.com', role: 'Admin', status: 'Active', lastLogin: '2024-01-15 08:45', joinDate: '2023-03-15' },
  { id: '6', name: 'Emma Wilson', email: 'emma@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2023-12-20 13:10', joinDate: '2023-07-30' },
  { id: '7', name: 'James Miller', email: 'james@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-14 17:30', joinDate: '2023-09-12' },
  { id: '8', name: 'Olivia Davis', email: 'olivia@example.com', role: 'Viewer', status: 'Active', lastLogin: '2024-01-12 10:05', joinDate: '2023-10-18' },
  { id: '9', name: 'Robert Taylor', email: 'robert@example.com', role: 'Admin', status: 'Pending', lastLogin: '2024-01-09 15:40', joinDate: '2024-01-05' },
  { id: '10', name: 'Sophia Martinez', email: 'sophia@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-15 12:25', joinDate: '2023-06-28' },
  { id: '11', name: 'William Anderson', email: 'william@example.com', role: 'Viewer', status: 'Inactive', lastLogin: '2023-11-30 14:50', joinDate: '2023-04-20' },
  { id: '12', name: 'Isabella Thomas', email: 'isabella@example.com', role: 'Editor', status: 'Active', lastLogin: '2024-01-14 09:30', joinDate: '2023-12-01' },
]

export const statCards: StatCard[] = [
  { title: 'Total Users', value: '1,248', change: 12.5, icon: 'Users', description: 'From last month' },
  { title: 'Active Sessions', value: '342', change: 8.2, icon: 'Activity', description: 'Currently online' },
  { title: 'Revenue', value: '$24,580', change: 18.3, icon: 'DollarSign', description: 'This month' },
  { title: 'Conversion Rate', value: '3.2%', change: -2.1, icon: 'TrendingUp', description: 'From last month' },
]

export const sidebarItems: SidebarItem[] = [
  { title: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { title: 'Users', icon: 'Users', href: '/users', badge: 3 },
  { title: 'Analytics', icon: 'BarChart3', href: '/analytics' },
  { title: 'Settings', icon: 'Settings', href: '/settings' },
  { title: 'Billing', icon: 'CreditCard', href: '/billing' },
  { title: 'Reports', icon: 'FileText', href: '/reports' },
  { title: 'Notifications', icon: 'Bell', href: '/notifications', badge: 5 },
  { title: 'Help Center', icon: 'HelpCircle', href: '/help' },
]