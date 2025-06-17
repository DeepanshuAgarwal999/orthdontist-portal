import React from 'react';
import SidebarLayout from '@/components/layout/SidebarLayout';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
    return (
        <SidebarLayout>
            {children}
        </SidebarLayout>
    );
};

export default DashboardLayout;
