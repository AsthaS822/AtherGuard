import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { motion } from "framer-motion";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useContext(AuthContext);

  if (auth?.loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A051A] text-white">
        <motion.div 
            animate={{ opacity: [0.5, 1, 0.5], scale: [0.98, 1, 0.98] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="flex flex-col items-center gap-4"
        >
            <div className="w-12 h-12 rounded-full border-2 border-t-[var(--accent-primary)] border-r-[var(--accent-primary)] border-b-transparent border-l-transparent animate-spin" />
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent-primary)] shadow-glow">Validating Firebase Auth...</p>
        </motion.div>
      </div>
    );
  }

  if (!auth?.user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
}
