import { Search, Bell, ArrowLeft, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';

const Navbar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // Only show back button if not on dashboard root
  const showBack = location.pathname !== '/dashboard';

  return (
    <nav className="h-20 border-b border-border-dim flex items-center justify-between px-6 md:px-10 bg-bg-surface/70 backdrop-blur-2xl sticky top-0 z-40 transition-colors duration-500">

      <div className="flex items-center gap-6">
        {showBack && (
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-bg-surface border border-border-main hover:border-primary/50 rounded-xl transition-all text-text-secondary hover:text-text-primary flex items-center gap-2 text-[10px] font-black uppercase tracking-widest shadow-sm"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Return</span>
          </button>
        )}

        
        <div className="md:hidden">
             <Menu size={24} className="text-gray-500" />
        </div>

        <div className="relative group hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-dim group-focus-within:text-primary transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search Intelligence..."
            className="w-64 bg-bg-surface border border-border-main focus:border-primary/50 rounded-2xl py-2.5 pl-12 pr-4 focus:outline-none focus:bg-bg-surface transition-all text-sm font-medium placeholder:text-text-dim uppercase tracking-tighter text-text-primary"
          />
        </div>

      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <ThemeToggle />


          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-2xl bg-bg-surface border border-border-main text-text-secondary hover:text-primary transition-colors relative"
          >
            <Bell size={18} />
            <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-bg-surface shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
          </motion.button>

        </div>

        <div className="h-8 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 pl-2 pr-1 py-1 rounded-2xl bg-bg-surface border border-border-main cursor-pointer hover:border-primary/20 transition-all group"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black uppercase tracking-tight text-text-primary">Alex Rivera</p>
            <p className="text-[9px] text-primary font-black uppercase tracking-[0.2em]">Cyber Admin</p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center border border-white/20 shadow-glow group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all">
            <span className="text-white font-black text-xs">AR</span>
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
