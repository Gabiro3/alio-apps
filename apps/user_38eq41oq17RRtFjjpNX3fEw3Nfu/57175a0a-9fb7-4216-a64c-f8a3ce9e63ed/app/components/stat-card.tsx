'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import {
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'

type IconName = 'Users' | 'Activity' | 'DollarSign' | 'TrendingUp'

const iconMap: Record<IconName, React.ComponentType<any>> = {
  Users,
  Activity,
  DollarSign,
  TrendingUp,
}

interface StatCardProps {
  title: string
  value: string | number
  change: number
  icon: IconName
  description: string
}

export function StatCard({ title, value, change, icon, description }: StatCardProps) {
  const Icon = iconMap[icon]
  const isPositive = change >= 0
  
  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <CardTitle className='text-sm font-medium text-muted-foreground'>
          {title}
        </CardTitle>
        <div className='p-2 rounded-lg bg-primary/10'>
          <Icon className='h-4 w-4 text-primary' />
        </div>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          <div className='text-2xl font-bold'>{value}</div>
          <div className='flex items-center gap-2'>
            <Badge 
              variant={isPositive ? 'default' : 'destructive'}
              className={cn(
                'flex items-center gap-1',
                isPositive ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-red-100 text-red-800 hover:bg-red-100'
              )}
            >
              {isPositive ? (
                <TrendingUp className='h-3 w-3' />
              ) : (
                <TrendingDown className='h-3 w-3' />
              )}
              {Math.abs(change)}%
            </Badge>
            <span className='text-sm text-muted-foreground'>{description}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}