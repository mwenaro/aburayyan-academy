import { auth } from '@/auth/auth';
import Header from '@/components/layout/header';
import Providers from '@/components/layout/providers';
import Sidebar from '@/components/layout/sidebar';
// import { ScrollArea } from '@/components/ui/scroll-area';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Almahdi Dashboard',
  description: 'The official Ecommerce Basic dashboard '
};

export default  function DashboardLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // const session = auth
  return (
    
    <div className="flex">
      {/* <NextTopLoader showSpinner={false} /> */}
        {/* <Providers session={session}> */}
          
      <Sidebar />
      <main className="w-full flex-1 overflow-hidden">
        <Header />
        {children}
      </main>
      {/* </Providers> */}
    </div>
  );
}
