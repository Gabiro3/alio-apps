'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Bell,
  Search,
  HelpCircle,
  Moon,
  Sun,
  Settings,
} from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [darkMode, setDarkMode] = useState(false)
  
  return (
    <header className='sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6'>
      <div className='flex items-center gap-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
          <Input
            placeholder='Search dashboard...'
            className='pl-9 w-64'
          />
        </div>
      </div>
      
      <div className='flex items-center gap-2'>
        <Button
          variant='ghost'
          size='icon'
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? (
            <Sun className='h-4 w-4' />
          ) : (
            <Moon className='h-4 w-4' />
          )}
        </Button>
        
        <Button variant='ghost' size='icon' title='Help'>
          <HelpCircle className='h-4 w-4' />
        </Button>
        
        <Button variant='ghost' size='icon' title='Settings'>
          <Settings className='h-4 w-4' />
        </Button>
        
        <Button variant='ghost' size='icon' className='relative' title='Notifications'>
          <Bell className='h-4 w-4' />
          <Badge 
            variant='destructive' 
            className='absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs'
          >
            5
          </Badge>
        </Button>
        
        <div className='ml-2 flex items-center gap-3'>
          <div className='w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center'>
            <span className='text-white font-semibold text-sm'>JD</span>
          </div>
          <div className='hidden md:block'>
            <p className='text-sm font-medium'>John Doe</p>
            <p className='text-xs text-muted-foreground'>Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}