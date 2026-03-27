import { Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-surface border border-border shadow-soft flex items-center px-1 transition-colors"
      aria-label="Toggle Theme"
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center shadow-lg"
      >
        {theme === "dark" ? (
          <Moon size={14} className="text-white" />
        ) : (
          <Sun size={14} className="text-white" />
        )}
      </motion.div>
    </button>
  );
};

