'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TestDashboard() {
  return (
    <div className='p-8'>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard Test Component</CardTitle>
        </CardHeader>
        <CardContent>
          <p className='mb-4'>If you can see this, the dashboard components are working correctly.</p>
          <div className='flex gap-4'>
            <Button variant='default'>Primary Button</Button>
            <Button variant='outline'>Outline Button</Button>
            <Button variant='secondary'>Secondary Button</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}