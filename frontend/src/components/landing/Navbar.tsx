import { ThemeToggle } from "../ui/ThemeToggle";
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from "../../context/AuthContext";

export default function LandingNavbar() {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const isAuthenticated = !!auth?.user;

  return (
    <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center 
      bg-[var(--bg-surface)] backdrop-blur-xl border-b border-[var(--border-dim)] transition-colors duration-500">



      <div 
        className="flex items-center gap-3 cursor-pointer group"
        onClick={() => navigate('/')}
      >
        <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)] group-hover:scale-110 transition-transform">
            <div className="w-4 h-4 rounded-full border-2 border-white" />
        </div>
        <h1 className="text-xl font-black font-sora tracking-tighter text-[var(--text-primary)]">AetherGuard</h1>
      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />

        <button 
          onClick={() => navigate(isAuthenticated ? '/app' : '/auth')}
          className="px-6 py-2.5 rounded-xl bg-[var(--accent-primary)] text-white font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all"
        >
            {isAuthenticated ? 'Dashboard' : 'Get Started'}
        </button>


      </div>
    </nav>
  );
}
