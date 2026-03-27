import { useContext } from 'react';
import { Search, Bell, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ui/ThemeToggle';
import BackButton from '../ui/BackButton';
import { AuthContext } from '../../context/AuthContext';


const Navbar = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;
  const location = useLocation();

  // Only show back button if not on dashboard root
  const showBack = location.pathname !== '/app';

  const getUserInitials = () => {
    if (!user?.email) return "??";
    return user.email.substring(0, 2).toUpperCase();
  };

  const getUserDisplayName = () => {
    if (user?.displayName) return user.displayName;
    if (user?.email) return user.email.split('@')[0];
    return "Cyber Operator";
  };

  return (
    <nav className="h-20 border-b border-border flex items-center justify-between px-6 md:px-10 bg-surface backdrop-blur-2xl sticky top-0 z-40 transition-colors duration-500 shadow-soft">
      <div className="flex items-center gap-6">
        <BackButton label={showBack ? "Back" : "Landing"} />
        
        <div className="md:hidden">
             <Menu size={24} className="text-[var(--text-secondary)]" />
        </div>

        <div className="relative group hidden lg:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] group-focus-within:text-[var(--accent-primary)] transition-colors" size={16} />
          <input 
            type="text" 
            placeholder="Search Intelligence..."
            className="w-64 bg-[var(--bg-surface)] border border-[var(--border-dim)] focus:border-[var(--accent-primary)] rounded-2xl py-2.5 pl-12 pr-4 focus:outline-none focus:bg-[var(--bg-main)] transition-all text-sm font-medium placeholder:text-[var(--text-secondary)] uppercase tracking-tighter text-[var(--text-primary)] shadow-soft"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <ThemeToggle />

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-dim)] text-[var(--text-secondary)] hover:text-[var(--accent-primary)] transition-colors relative shadow-soft"
          >
            <Bell size={18} />
            <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-red-500 rounded-full border border-[var(--bg-surface)] shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
          </motion.button>
        </div>

        <div className="h-8 w-px bg-border mx-2"></div>

        <motion.div 
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-4 pl-2 pr-1 py-1 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-dim)] cursor-pointer hover:border-[var(--accent-primary)] transition-all group shadow-soft"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-black uppercase tracking-tight text-[var(--text-primary)]">
                {getUserDisplayName()}
            </p>
            <p className="text-[9px] text-[var(--accent-primary)] font-black uppercase tracking-[0.2em]">Validated Operator</p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-glow)] flex items-center justify-center border border-white/20 shadow-glow group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)] transition-all text-white font-black text-xs">
            {getUserInitials()}
          </div>
        </motion.div>
      </div>
    </nav>
  );
};

export default Navbar;
