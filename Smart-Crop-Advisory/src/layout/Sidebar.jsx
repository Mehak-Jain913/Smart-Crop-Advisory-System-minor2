import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Leaf, CloudRain, TrendingUp, User, ShieldAlert, CalendarDays, MessageSquare, Bug, Landmark, X } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useTranslation } from '../hooks/useTranslation';

const navItems = [
  { name: 'Dashboard', key: 'dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Recommend', key: 'recommend', path: '/recommend', icon: Leaf },
  { name: 'Schemes', key: 'schemes', path: '/schemes', icon: Landmark },
  { name: 'Pesticide', key: 'pesticide', path: '/pesticide', icon: ShieldAlert },
  { name: 'Schedule', key: 'schedule', path: '/schedule', icon: CalendarDays },
  { name: 'Chatbot', key: 'chatbot', path: '/chatbot', icon: MessageSquare },
  { name: 'Disease', key: 'disease', path: '/disease', icon: Bug },
  { name: 'Weather', key: 'weather', path: '/weather', icon: CloudRain },
  { name: 'Market', key: 'market', path: '/market', icon: TrendingUp },
  { name: 'Profile', key: 'profile', path: '/profile', icon: User },
];

export const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen } = useStore();
  const t = useTranslation();

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 xl:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar Container */}
      <aside className={`fixed xl:static top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 z-50 transition-transform duration-300 w-64 flex flex-col flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)]
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} xl:translate-x-0`}>
        
        {/* Branding when Navbar isn't extending above sidebar (Mobile mainly) */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 xl:hidden">
          <span className="font-bold text-xl text-green-600 tracking-wide">SmartCrop</span>
          <button onClick={() => setSidebarOpen(false)} className="p-1 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-1 overflow-y-auto px-4 py-6 w-full hidden-scrollbar h-full">
          <div className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-2">Menu</div>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-3 py-3 rounded-xl transition-all duration-200 group relative ${
                  isActive 
                    ? 'bg-gray-100 dark:bg-gray-800 text-green-600 dark:text-green-400 font-bold shadow-[inset_2px_0_0_0_#16a34a]' 
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white font-semibold'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={20} className={`transition-transform duration-200 ${isActive ? 'scale-110 text-green-600 dark:text-green-400' : 'group-hover:scale-110 text-gray-400 dark:text-gray-500 group-hover:text-green-600 dark:group-hover:text-green-400'}`} />
                  <span className="flex-1">{t[item.key] || item.name}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </aside>
    </>
  );
};
