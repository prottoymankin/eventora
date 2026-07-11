import { DashboardSidebar } from '@/components/shared/DashboardSidebar';
import React, { ReactNode } from 'react';

const layout = ({ children } : { children : ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <DashboardSidebar />
      <main className='flex-1'>{children}</main>
    </div>
  );
};

export default layout;