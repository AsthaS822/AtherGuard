import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ShieldAlert, 
  Filter, 
  BarChart3, 
  Bell, 
  User, 
  Settings,
  ShieldCheck,
  LogOut,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Zap, label: 'Analyze', path: '/dashboard/analyze', star: true },
  { icon: ShieldAlert, label: 'Moderation Feed', path: '/dashboard/moderation' },
  { icon: Filter, label: 'Custom Filters', path: '/dashboard/filters' },
  { icon: BarChart3, label: 'Reports', path: '/dashboard/reports' },
  { icon: Bell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: User, label: 'Profile', path: '/dashboard/profile' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

const Sidebar = () => {
  return (
    <aside className="hidden md:flex w-64 h-screen bg-bg-surface backdrop-blur-3xl border-r border-border-main flex flex-col fixed left-0 top-0 z-50 transition-colors duration-500">

      <div className="p-8 flex items-center gap-3">
        <motion.div
          initial={{ rotate: -20, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          className="w-10 h-10 rounded-xl bg-primary shadow-glow flex items-center justify-center"
        >
          <ShieldCheck className="text-white" size={24} />
        </motion.div>
        <span className="text-xl font-black font-sora tracking-tighter text-text-primary uppercase italic">

          Aether<span className="text-primary">Guard</span>
        </span>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.path}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <NavLink
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `
                flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
                ${isActive 
                  ? 'bg-primary/10 text-primary dark:text-white border-primary/20 border shadow-[0_0_20px_rgba(124,58,237,0.1)]' 
                  : 'text-text-secondary hover:text-text-primary hover:bg-bg-main border border-transparent'}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={`${item.star ? 'text-primary' : ''}`} />
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </div>
              {item.star && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary-glow shadow-neon"></span>
              )}
              
              {/* Active Indicator */}
              <NavLink to={item.path} end={item.path === '/dashboard'}>
                {({isActive}) => isActive && (
                    <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                    />
                )}
              </NavLink>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="p-6 border-t border-border-dim">
        <button className="flex items-center gap-3 px-4 py-3 w-full text-text-dim hover:text-red-500 transition-colors group">

          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
