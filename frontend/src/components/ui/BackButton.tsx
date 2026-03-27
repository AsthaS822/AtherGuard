import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

interface BackButtonProps {
  label?: string;
  className?: string;
}

const BackButton = ({ label = "Back", className = "" }: BackButtonProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <motion.button
      whileHover={{ x: -4 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleBack}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-dim)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all shadow-sm ${className}`}
    >
      <ArrowLeft size={16} />
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
    </motion.button>
  );
};

export default BackButton;
