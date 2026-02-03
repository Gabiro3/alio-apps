'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart3, Calendar, Download, Filter } from 'lucide-react'

export function ChartPlaceholder() {
  return (
    <Card className='col-span-2'>
      <CardHeader>
        <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
          <CardTitle className='flex items-center gap-2'>
            <BarChart3 className='h-5 w-5' />
            Analytics Overview
          </CardTitle>
          <div className='flex items-center gap-2'>
            <Button variant='outline' size='sm'>
              <Calendar className='h-4 w-4 mr-2' />
              Last 30 days
            </Button>
            <Button variant='outline' size='icon'>
              <Filter className='h-4 w-4' />
            </Button>
            <Button variant='outline' size='icon'>
              <Download className='h-4 w-4' />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className='space-y-6'>
          <div className='flex items-center justify-between'>
            <div className='space-y-1'>
              <h3 className='text-lg font-semibold'>Revenue Trend</h3>
              <p className='text-sm text-muted-foreground'>Monthly revenue for the last 6 months</p>
            </div>
            <div className='text-right'>
              <div className='text-2xl font-bold'>$124,580</div>
              <div className='text-sm text-green-600'>+18.3% from last period</div>
            </div>
          </div>
          
          <div className='relative h-64 rounded-lg bg-gradient-to-b from-gray-50 to-gray-100 border'>
            {/* Chart bars */}
            <div className='absolute bottom-0 left-0 right-0 flex items-end justify-between h-48 px-8 py-4'>
              {[40, 65, 85, 60, 95, 75].map((height, index) => (
                <div key={index} className='flex flex-col items-center'>
                  <div 
                    className='w-8 bg-gradient-to-t from-primary to-blue-400 rounded-t-lg transition-all hover:opacity-80'
                    style={{ height: `${height}%` }}
                  />
                  <div className='mt-2 text-xs text-muted-foreground'>
                    {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Grid lines */}
            <div className='absolute inset-0 flex flex-col justify-between px-8 py-4'>
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className='border-t border-gray-200' />
              ))}
            </div>
            
            {/* Y-axis labels */}
            <div className='absolute left-4 top-0 bottom-0 flex flex-col justify-between py-4'>
              {['$100k', '$80k', '$60k', '$40k', '$20k', '$0'].map((label, i) => (
                <div key={i} className='text-xs text-muted-foreground'>{label}</div>
              ))}
            </div>
          </div>
          
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 pt-4'>
            {[
              { label: 'Avg. Session', value: '4m 32s', change: '+12%' },
              { label: 'Bounce Rate', value: '42.1%', change: '-8%' },
              { label: 'New Users', value: '1,248', change: '+24%' },
              { label: 'Conversion', value: '3.2%', change: '+5%' },
            ].map((metric, index) => (
              <div key={index} className='space-y-1'>
                <div className='text-sm text-muted-foreground'>{metric.label}</div>
                <div className='flex items-baseline gap-2'>
                  <div className='text-xl font-semibold'>{metric.value}</div>
                  <div className={`text-sm ${metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                    {metric.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}