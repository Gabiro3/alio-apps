'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { sidebarItems } from '@/lib/data'
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  FileText,
  Bell,
  HelpCircle,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'

type IconName = 'LayoutDashboard' | 'Users' | 'BarChart3' | 'Settings' | 'CreditCard' | 'FileText' | 'Bell' | 'HelpCircle'

const iconMap: Record<IconName, React.ComponentType<any>> = {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  CreditCard,
  FileText,
  Bell,
  HelpCircle,
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [activeItem, setActiveItem] = useState('Dashboard')

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  return (
    <aside className={cn(
      'flex flex-col h-screen bg-background border-r transition-all duration-300',
      isCollapsed ? 'w-20' : 'w-64'
    )}>
      <div className='flex items-center justify-between p-6 border-b'>
        {!isCollapsed && (
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 rounded-lg bg-primary flex items-center justify-center'>
              <span className='text-primary-foreground font-bold'>A</span>
            </div>
            <span className='font-semibold text-lg'>AdminHub</span>
          </div>
        )}
        <Button
          variant='ghost'
          size='icon'
          onClick={toggleSidebar}
          className='ml-auto'
        >
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <nav className='flex-1 p-4 space-y-1 overflow-y-auto'>
        {sidebarItems.map((item) => {
          const Icon = iconMap[item.icon as IconName]
          const isActive = activeItem === item.title
          
          return (
            <Button
              key={item.title}
              variant={isActive ? 'secondary' : 'ghost'}
              className={cn(
                'w-full justify-start gap-3 h-11',
                isCollapsed && 'justify-center px-0'
              )}
              onClick={() => setActiveItem(item.title)}
            >
              <div className='relative'>
                <Icon size={20} />
                {item.badge && (
                  <Badge 
                    variant='destructive' 
                    className='absolute -top-2 -right-2 h-5 min-w-5 p-0 flex items-center justify-center text-xs'
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
              {!isCollapsed && (
                <>
                  <span className='flex-1 text-left'>{item.title}</span>
                  {isActive && <ChevronRight size={16} className='ml-auto' />}
                </>
              )}
            </Button>
          )
        })}
      </nav>

      <div className={cn('p-4 border-t', isCollapsed && 'px-2')}>
        <div className={cn('flex items-center gap-3', isCollapsed && 'justify-center')}>
          <div className='w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center'>
            <span className='text-white font-semibold'>JD</span>
          </div>
          {!isCollapsed && (
            <div className='flex-1 min-w-0'>
              <p className='font-medium truncate'>John Doe</p>
              <p className='text-sm text-muted-foreground truncate'>Administrator</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}