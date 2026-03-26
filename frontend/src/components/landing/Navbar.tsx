import { ThemeToggle } from "../ui/ThemeToggle";
import { Link } from "react-router-dom";

export default function LandingNavbar() {

  return (
    <nav className="fixed top-0 w-full z-50 px-10 py-6 flex justify-between items-center 
      bg-bg-surface/50 backdrop-blur-xl border-b border-border-dim transition-colors duration-500">


      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-[0_0_15px_rgba(124,58,237,0.5)]">
            <div className="w-4 h-4 rounded-full border-2 border-white" />
        </div>
        <h1 className="text-xl font-black font-sora tracking-tighter text-text-primary">AetherGuard</h1>

      </div>

      <div className="flex items-center gap-6">
        <ThemeToggle />

        <Link to="/login">
            <button className="px-6 py-2.5 rounded-xl bg-primary text-white font-bold shadow-[0_0_20px_rgba(124,58,237,0.4)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] transition-all">
                Get Started
            </button>
        </Link>
      </div>
    </nav>
  );
}
