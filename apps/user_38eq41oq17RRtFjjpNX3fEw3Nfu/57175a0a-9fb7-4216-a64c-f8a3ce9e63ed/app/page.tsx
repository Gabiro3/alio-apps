'use client'

import { Sidebar } from './components/sidebar'
import { Header } from './components/header'
import { StatCard } from './components/stat-card'
import { ChartPlaceholder } from './components/chart-placeholder'
import { UsersTable } from './components/users-table'
import { statCards } from '@/lib/data'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Calendar,
  Clock,
  TrendingUp,
  Users as UsersIcon,
  ArrowUpRight,
} from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className='flex h-screen bg-gray-50'>
      <Sidebar />
      
      <div className='flex-1 flex flex-col overflow-hidden'>
        <Header />
        
        <main className='flex-1 overflow-y-auto p-6'>
          <div className='space-y-6'>
            {/* Welcome section */}
            <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight'>Dashboard Overview</h1>
                <p className='text-muted-foreground'>
                  Welcome back! Here's what's happening with your platform today.
                </p>
              </div>
              <div className='flex items-center gap-2'>
                <Button variant='outline'>
                  <Calendar className='h-4 w-4 mr-2' />
                  Jan 15, 2024
                </Button>
                <Button>
                  <ArrowUpRight className='h-4 w-4 mr-2' />
                  Generate Report
                </Button>
              </div>
            </div>
            
            {/* Stats grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
              {statCards.map((stat, index) => (
                <StatCard
                  key={index}
                  title={stat.title}
                  value={stat.value}
                  change={stat.change}
                  icon={stat.icon as any}
                  description={stat.description}
                />
              ))}
            </div>
            
            {/* Main content grid */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              <ChartPlaceholder />
              
              {/* Recent activity sidebar */}
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <Clock className='h-5 w-5' />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {[
                      { user: 'Alex Johnson', action: 'created new project', time: '2 min ago' },
                      { user: 'Maria Garcia', action: 'updated settings', time: '15 min ago' },
                      { user: 'David Chen', action: 'uploaded files', time: '1 hour ago' },
                      { user: 'Sarah Williams', action: 'commented on ticket', time: '2 hours ago' },
                      { user: 'Michael Brown', action: 'approved request', time: '3 hours ago' },
                    ].map((activity, index) => (
                      <div key={index} className='flex items-start gap-3'>
                        <div className='w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center'>
                          <span className='text-primary font-semibold text-sm'>
                            {activity.user.charAt(0)}
                          </span>
                        </div>
                        <div className='flex-1'>
                          <p className='text-sm'>
                            <span className='font-medium'>{activity.user}</span> {activity.action}
                          </p>
                          <p className='text-xs text-muted-foreground'>{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className='pt-6 border-t mt-6'>
                    <div className='flex items-center justify-between mb-4'>
                      <h3 className='font-semibold'>Team Performance</h3>
                      <TrendingUp className='h-4 w-4 text-green-600' />
                    </div>
                    <div className='space-y-3'>
                      {[
                        { team: 'Development', progress: 85, color: 'bg-blue-500' },
                        { team: 'Design', progress: 72, color: 'bg-purple-500' },
                        { team: 'Marketing', progress: 63, color: 'bg-green-500' },
                        { team: 'Support', progress: 91, color: 'bg-orange-500' },
                      ].map((team, index) => (
                        <div key={index} className='space-y-1'>
                          <div className='flex justify-between text-sm'>
                            <span>{team.team}</span>
                            <span className='font-medium'>{team.progress}%</span>
                          </div>
                          <div className='h-2 rounded-full bg-gray-200 overflow-hidden'>
                            <div 
                              className={`h-full rounded-full ${team.color} transition-all duration-500`}
                              style={{ width: `${team.progress}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>