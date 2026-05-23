import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Footer } from './Footer';

export const DashboardLayout = () => {
  return (
    <div className="flex bg-background text-foreground font-sans min-h-screen pt-16">
      <Sidebar />
      <main className="flex-1 w-full overflow-y-auto flex flex-col bg-secondary/30 transition-all xl:ml-64 min-h-[calc(100vh-4rem)]">
        <div className="flex-1 p-4 md:p-8">
          <Outlet />
        </div>
        <Footer />
      </main>
    </div>
  );
};
