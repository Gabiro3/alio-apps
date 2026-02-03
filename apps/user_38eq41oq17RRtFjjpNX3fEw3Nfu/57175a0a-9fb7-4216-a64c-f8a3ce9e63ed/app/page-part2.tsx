            {/* Users table section */}
            <div className='grid grid-cols-1 gap-6'>
              <UsersTable />
            </div>
            
            {/* Bottom cards */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
              <Card>
                <CardHeader>
                  <CardTitle className='flex items-center gap-2'>
                    <UsersIcon className='h-5 w-5' />
                    User Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {[
                      { role: 'Admin', count: 3, color: 'bg-red-500', percentage: 25 },
                      { role: 'Editor', count: 5, color: 'bg-blue-500', percentage: 42 },
                      { role: 'Viewer', count: 4, color: 'bg-green-500', percentage: 33 },
                    ].map((item, index) => (
                      <div key={index} className='space-y-2'>
                        <div className='flex justify-between'>
                          <span className='text-sm font-medium'>{item.role}</span>
                          <span className='text-sm text-muted-foreground'>{item.count} users</span>
                        </div>
                        <div className='h-2 rounded-full bg-gray-200 overflow-hidden'>
                          <div 
                            className={`h-full rounded-full ${item.color}`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>System Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='space-y-4'>
                    {[
                      { service: 'Web Server', status: 'Operational', color: 'bg-green-500' },
                      { service: 'Database', status: 'Operational', color: 'bg-green-500' },
                      { service: 'API Gateway', status: 'Degraded', color: 'bg-yellow-500' },
                      { service: 'Cache', status: 'Operational', color: 'bg-green-500' },
                    ].map((service, index) => (
                      <div key={index} className='flex items-center justify-between'>
                        <div className='flex items-center gap-3'>
                          <div className={`w-2 h-2 rounded-full ${service.color}`} />
                          <span className='text-sm'>{service.service}</span>
                        </div>
                        <span className='text-sm text-muted-foreground'>{service.status}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className='pt-6 border-t mt-6'>
                    <div className='text-sm text-muted-foreground'>
                      Last updated: Just now
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='grid grid-cols-2 gap-3'>
                    <Button variant='outline' className='h-auto py-3 flex flex-col items-center justify-center gap-2'>
                      <div className='w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center'>
                        <UsersIcon className='h-4 w-4 text-blue-600' />
                      </div>
                      <span className='text-xs'>Add User</span>
                    </Button>
                    
                    <Button variant='outline' className='h-auto py-3 flex flex-col items-center justify-center gap-2'>
                      <div className='w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center'>
                        <TrendingUp className='h-4 w-4 text-green-600' />
                      </div>
                      <span className='text-xs'>New Report</span>
                    </Button>
                    
                    <Button variant='outline' className='h-auto py-3 flex flex-col items-center justify-center gap-2'>
                      <div className='w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center'>
                        <Calendar className='h-4 w-4 text-purple-600' />
                      </div>
                      <span className='text-xs'>Schedule</span>
                    </Button>
                    
                    <Button variant='outline' className='h-auto py-3 flex flex-col items-center justify-center gap-2'>
                      <div className='w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center'>
                        <Settings className='h-4 w-4 text-orange-600' />
                      </div>
                      <span className='text-xs'>Settings</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        
        <footer className='border-t px-6 py-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='text-sm text-muted-foreground'>
              © 2024 AdminHub. All rights reserved.
            </div>
            <div className='flex items-center gap-4 text-sm text-muted-foreground'>
              <a href='#' className='hover:text-foreground transition-colors'>Privacy Policy</a>
              <a href='#' className='hover:text-foreground transition-colors'>Terms of Service</a>
              <a href='#' className='hover:text-foreground transition-colors'>Help Center</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}