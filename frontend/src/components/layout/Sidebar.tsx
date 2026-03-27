import { NavLink, useNavigate } from 'react-router-dom';
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
  Zap,
  Github,
  Youtube
} from 'lucide-react';

import { motion } from 'framer-motion';
import { logout } from "../../services/authService";

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/app' },
  { icon: Zap, label: 'Analyze', path: '/app/analyze', star: true },
  { icon: ShieldAlert, label: 'Moderation Feed', path: '/app/moderation' },
  { icon: Filter, label: 'Custom Filters', path: '/app/filters' },
  { icon: BarChart3, label: 'Reports', path: '/app/reports' },
  { icon: Bell, label: 'Notifications', path: '/app/notifications' },
  { icon: User, label: 'Profile', path: '/app/profile' },
  { icon: Settings, label: 'Settings', path: '/app/settings' },
];


const Sidebar = () => {
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
        await logout();
        localStorage.clear();
        navigate("/");
    } catch (err) {
        console.error("Logout failed:", err);
    }
  };

  return (
    <aside className="hidden md:flex w-64 h-screen bg-[var(--bg-surface)] backdrop-blur-3xl border-r border-[var(--border-dim)] flex flex-col fixed left-0 top-0 z-50 transition-colors duration-500 shadow-soft">



      <div className="p-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
            <motion.div
            initial={{ rotate: -20, scale: 0.8 }}
            animate={{ rotate: 0, scale: 1 }}
            className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] shadow-glow flex items-center justify-center shrink-0"
            >
            <ShieldCheck className="text-white" size={24} />
            </motion.div>
            <span className="text-xl font-black font-sora tracking-tighter text-[var(--text-primary)] uppercase italic">
            Aether<span className="text-[var(--accent-primary)] font-bold">Guard</span>
            </span>

        </div>

        <div className="w-8 h-8 rounded-lg bg-[var(--bg-main)] border border-[var(--border-dim)] flex items-center justify-center text-[var(--text-secondary)] shadow-soft">
            {localStorage.getItem('selectedPlatform') === 'github' ? <Github size={16} /> : <Youtube size={16} />}
        </div>

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
              end={item.path === '/app'}
              className={({ isActive }) => `
                flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative
                ${isActive 
                  ? 'bg-[var(--accent-primary)] text-white border-[var(--accent-primary)]/20 border shadow-glow' 
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-main)] border border-transparent'}
              `}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} className={`${item.star ? 'text-[var(--accent-primary)]' : ''}`} />
                <span className="text-xs font-black uppercase tracking-widest">{item.label}</span>
              </div>

              {item.star && (
                <span className="w-1.5 h-1.5 rounded-full bg-glow shadow-neon"></span>
              )}

              
              {/* Active Indicator */}
              <NavLink to={item.path} end={item.path === '/app'}>
                {({isActive}) => isActive && (
                    <motion.div 
                        layoutId="sidebar-active"
                        className="absolute left-0 w-1 h-6 bg-[var(--accent-primary)] rounded-r-full"
                    />
                )}
              </NavLink>
            </NavLink>
          </motion.div>
        ))}
      </nav>

      <div className="p-6 border-t border-[var(--border-dim)]">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-[var(--text-secondary)] hover:text-red-500 transition-colors group"
        >
          <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-[10px] font-black uppercase tracking-widest">Terminate Session</span>
        </button>
      </div>


    </aside>
  );
};

export default Sidebar;
