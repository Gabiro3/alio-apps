'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Home,
  Users,
  Package,
  ShoppingCart,
  BarChart3,
  Settings,
  Bell,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  UserPlus,
  ShoppingBag,
  Activity,
  Download,
  MoreVertical,
  Calendar,
  Eye,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

// Type definitions for the dashboard
interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
  lastLogin: string;
}

interface Order {
  id: number;
  customer: string;
  date: string;
  amount: number;
  status: 'completed' | 'pending' | 'cancelled';
  items: number;
}

interface StatCard {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  color: string;
  description: string;
}

interface SidebarItem {
  name: string;
  icon: React.ReactNode;
  badge?: number;
}

interface TableColumn {
  key: keyof User;
  label: string;
  sortable: boolean;
}
export default function AdminDashboard() {
  // State for sidebar
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // State for table
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', joinDate: '2024-01-15', lastLogin: '2024-12-01' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'active', joinDate: '2024-02-20', lastLogin: '2024-12-01' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'pending', joinDate: '2024-03-10', lastLogin: '2024-11-28' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'active', joinDate: '2024-04-05', lastLogin: '2024-12-01' },
    { id: 5, name: 'Charlie Wilson', email: 'charlie@example.com', role: 'Admin', status: 'inactive', joinDate: '2024-05-12', lastLogin: '2024-11-20' },
    { id: 6, name: 'Diana Prince', email: 'diana@example.com', role: 'Viewer', status: 'active', joinDate: '2024-06-18', lastLogin: '2024-12-01' },
    { id: 7, name: 'Edward Norton', email: 'edward@example.com', role: 'Editor', status: 'pending', joinDate: '2024-07-22', lastLogin: '2024-11-25' },
    { id: 8, name: 'Fiona Gallagher', email: 'fiona@example.com', role: 'Viewer', status: 'active', joinDate: '2024-08-30', lastLogin: '2024-12-01' },
  ]);
  
  const [orders, setOrders] = useState<Order[]>([
    { id: 1001, customer: 'John Doe', date: '2024-12-01', amount: 299.99, status: 'completed', items: 3 },
    { id: 1002, customer: 'Jane Smith', date: '2024-12-01', amount: 149.50, status: 'pending', items: 2 },
    { id: 1003, customer: 'Bob Johnson', date: '2024-11-30', amount: 89.99, status: 'completed', items: 1 },
    { id: 1004, customer: 'Alice Brown', date: '2024-11-30', amount: 450.00, status: 'completed', items: 5 },
    { id: 1005, customer: 'Charlie Wilson', date: '2024-11-29', amount: 199.99, status: 'cancelled', items: 2 },
    { id: 1006, customer: 'Diana Prince', date: '2024-11-29', amount: 75.25, status: 'completed', items: 1 },
    { id: 1007, customer: 'Edward Norton', date: '2024-11-28', amount: 320.00, status: 'pending', items: 4 },
    { id: 1008, customer: 'Fiona Gallagher', date: '2024-11-28', amount: 125.50, status: 'completed', items: 2 },
  ]);
  
  // Filter and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState<keyof User>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  // Sidebar menu items
  const sidebarItems: SidebarItem[] = [
    { name: 'Dashboard', icon: <Home className='h-5 w-5' /> },
    { name: 'Users', icon: <Users className='h-5 w-5' />, badge: 3 },
    { name: 'Products', icon: <Package className='h-5 w-5' /> },
    { name: 'Orders', icon: <ShoppingCart className='h-5 w-5' />, badge: 12 },
    { name: 'Analytics', icon: <BarChart3 className='h-5 w-5' /> },
    { name: 'Settings', icon: <Settings className='h-5 w-5' /> },
  ];
  
  // Stat cards data
  const statCards: StatCard[] = [
    {
      title: 'Total Revenue',
      value: '$54,231.89',
      change: 12.5,
      icon: <DollarSign className='h-5 w-5' />,
      color: 'bg-green-500',
      description: 'From last month'
    },
    {
      title: 'New Users',
      value: '2,345',
      change: 8.2,
      icon: <UserPlus className='h-5 w-5' />,
      color: 'bg-blue-500',
      description: 'From last week'
    },
    {
      title: 'Total Orders',
      value: '1,234',
      change: -2.1,
      icon: <ShoppingBag className='h-5 w-5' />,
      color: 'bg-purple-500',
      description: 'From yesterday'
    },
    {
      title: 'Active Now',
      value: '573',
      change: 5.7,
      icon: <Activity className='h-5 w-5' />,
      color: 'bg-orange-500',
      description: 'Live users'
    },
  ];
  
  // Table columns
  const columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'role', label: 'Role', sortable: true },
    { key: 'status', label: 'Status', sortable: true },
    { key: 'joinDate', label: 'Join Date', sortable: true },
    { key: 'lastLogin', label: 'Last Login', sortable: true },
  ];
  // Filter and sort users
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === '' || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = roleFilter === 'all' || user.role.toLowerCase() === roleFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });
  
  // Sort users
  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });
  
  // Pagination calculations
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
  
  // Handle sort
  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  // Handle items per page change
  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(parseInt(value));
    setCurrentPage(1);
  };
  
  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
      case 'completed':
        return <CheckCircle className='h-4 w-4' />;
      case 'pending':
        return <Clock className='h-4 w-4' />;
      case 'inactive':
      case 'cancelled':
        return <XCircle className='h-4 w-4' />;
      default:
        return null;
    }
  };
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className='flex flex-col h-full'>
          {/* Logo */}
          <div className='flex items-center justify-between h-16 px-4 border-b border-gray-200'>
            <div className='flex items-center space-x-2'>
              <div className='h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
                <span className='text-white font-bold text-lg'>A</span>
              </div>
              {!sidebarCollapsed && (
                <span className='text-xl font-bold text-gray-800'>AdminHub</span>
              )}
            </div>
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className='h-8 w-8'
            >
              {sidebarCollapsed ? <ChevronRight className='h-4 w-4' /> : <ChevronLeft className='h-4 w-4' />}
            </Button>
          </div>
          
          {/* Navigation */}
          <nav className='flex-1 px-4 py-6 space-y-1'>
            {sidebarItems.map((item) => (
              <button
                key={item.name}
                className={`flex items-center w-full px-3 py-2.5 rounded-lg transition-colors ${item.name === 'Dashboard' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <div className='flex items-center justify-center w-6'>
                  {item.icon}
                </div>
                {!sidebarCollapsed && (
                  <>
                    <span className='ml-3 font-medium'>{item.name}</span>
                    {item.badge && (
                      <Badge className='ml-auto bg-blue-100 text-blue-800 hover:bg-blue-100'>
                        {item.badge}
                      </Badge>
                    )}
                  </>
                )}
              </button>
            ))}
          </nav>
          
          {/* User profile */}
          {!sidebarCollapsed && (
            <div className='p-4 border-t border-gray-200'>
              <div className='flex items-center space-x-3'>
                <div className='h-10 w-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center'>
                  <span className='text-white font-semibold'>JD</span>
                </div>
                <div className='flex-1'>
                  <p className='font-medium text-gray-900'>John Doe</p>
                  <p className='text-sm text-gray-500'>Administrator</p>
                </div>
                <Button variant='ghost' size='icon'>
                  <MoreVertical className='h-4 w-4' />
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Main content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-20' : 'ml-64'}`}>
        {/* Header */}
        <header className='sticky top-0 z-40 bg-white border-b border-gray-200'>
          <div className='flex items-center justify-between h-16 px-6'>
            <div className='flex items-center space-x-4'>
              <h1 className='text-2xl font-bold text-gray-900'>Dashboard</h1>
              <Badge variant='outline' className='bg-blue-50 text-blue-700 border-blue-200'>
                <Calendar className='h-3 w-3 mr-1' />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Badge>
            </div>
            
            <div className='flex items-center space-x-4'>
              <div className='relative'>
                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                <Input
                  placeholder='Search...'
                  className='pl-10 w-64'
                />
              </div>
              <Button variant='outline' size='icon' className='relative'>
                <Bell className='h-5 w-5' />
                <span className='absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center'>
                  3
                </span>
              </Button>
              <Button variant='outline'>
                <Download className='h-4 w-4 mr-2' />
                Export
              </Button>
            </div>
          </div>
        </header>
        {/* Main content area */}
        <main className='p-6'>
          {/* Stats cards */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
            {statCards.map((stat, index) => (
              <Card key={index} className='overflow-hidden'>
                <CardHeader className='pb-2'>
                  <div className='flex items-center justify-between'>
                    <CardTitle className='text-sm font-medium text-gray-500'>{stat.title}</CardTitle>
                    <div className={`${stat.color} p-2 rounded-lg`}>
                      {stat.icon}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className='flex items-baseline'>
                    <span className='text-2xl font-bold text-gray-900'>{stat.value}</span>
                    <div className={`flex items-center ml-3 ${stat.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {stat.change >= 0 ? (
                        <TrendingUp className='h-4 w-4 mr-1' />
                      ) : (
                        <TrendingDown className='h-4 w-4 mr-1' />
                      )}
                      <span className='text-sm font-medium'>{Math.abs(stat.change)}%</span>
                    </div>
                  </div>
                  <p className='text-sm text-gray-500 mt-1'>{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Chart and recent orders */}
          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8'>
            {/* Chart placeholder */}
            <Card className='lg:col-span-2'>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>Monthly revenue trends for the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='h-80 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border border-gray-200'>
                  <div className='text-center'>
                    <BarChart3 className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                    <h3 className='text-lg font-medium text-gray-700 mb-2'>Revenue Chart</h3>
                    <p className='text-gray-500 max-w-md'>
                      This is a placeholder for a revenue chart. In a real application, this would display interactive charts using libraries like Recharts or Chart.js.
                    </p>
                  </div>
                </div>
                <div className='flex items-center justify-between mt-6'>
                  <div className='flex items-center space-x-4'>
                    <div className='flex items-center'>
                      <div className='h-3 w-3 rounded-full bg-blue-500 mr-2'></div>
                      <span className='text-sm text-gray-600'>Current Month</span>
                    </div>
                    <div className='flex items-center'>
                      <div className='h-3 w-3 rounded-full bg-green-500 mr-2'></div>
                      <span className='text-sm text-gray-600'>Previous Month</span>
                    </div>
                  </div>
                  <Select defaultValue='6months'>
                    <SelectTrigger className='w-32'>
                      <SelectValue placeholder='Select period' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='1month'>Last Month</SelectItem>
                      <SelectItem value='3months'>Last 3 Months</SelectItem>
                      <SelectItem value='6months'>Last 6 Months</SelectItem>
                      <SelectItem value='1year'>Last Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
            
            {/* Recent orders */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className='space-y-4'>
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className='flex items-center justify-between p-3 bg-gray-50 rounded-lg'>
                      <div>
                        <p className='font-medium text-gray-900'>{order.customer}</p>
                        <p className='text-sm text-gray-500'>Order #{order.id}</p>
                      </div>
                      <div className='text-right'>
                        <p className='font-medium text-gray-900'>${order.amount.toFixed(2)}</p>
                        <Badge className={`mt-1 ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant='outline' className='w-full mt-4'>
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* User management table */}
          <Card>
            <CardHeader>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between'>
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage your users and their permissions</CardDescription>
                </div>
                <div className='flex items-center space-x-2 mt-4 sm:mt-0'>
                  <Button>
                    <UserPlus className='h-4 w-4 mr-2' />
                    Add User
                  </Button>
                  <Button variant='outline'>
                    <Filter className='h-4 w-4 mr-2' />
                    Advanced Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Filters */}
              <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0'>
                <div className='flex items-center space-x-4'>
                  <div className='relative'>
                    <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400' />
                    <Input
                      placeholder='Search users...'
                      className='pl-10 w-64'
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className='w-32'>
                      <SelectValue placeholder='Role' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Roles</SelectItem>
                      <SelectItem value='admin'>Admin</SelectItem>
                      <SelectItem value='editor'>Editor</SelectItem>
                      <SelectItem value='viewer'>Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className='w-32'>
                      <SelectValue placeholder='Status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='all'>All Status</SelectItem>
                      <SelectItem value='active'>Active</SelectItem>
                      <SelectItem value='inactive'>Inactive</SelectItem>
                      <SelectItem value='pending'>Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className='flex items-center space-x-4'>
                  <span className='text-sm text-gray-500'>
                    Showing {startIndex + 1}-{Math.min(endIndex, sortedUsers.length)} of {sortedUsers.length} users
                  </span>
                  <Select value={itemsPerPage.toString()} onValueChange={handleItemsPerPageChange}>
                    <SelectTrigger className='w-20'>
                      <SelectValue placeholder='5' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='5'>5</SelectItem>
                      <SelectItem value='10'>10</SelectItem>
                      <SelectItem value='25'>25</SelectItem>
                      <SelectItem value='50'>50</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>