import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section className="h-screen flex items-center justify-center relative overflow-hidden px-8">

      {/* Gradient Background */}
      <div className="absolute inset-0 
        bg-[radial-gradient(circle_at_30%_30%,#7C3AED20,transparent_60%)] 
        dark:bg-[radial-gradient(circle_at_70%_40%,#00F5FF10,transparent_60%)] pointer-events-none"/>

      {/* Glow Layer */}
      <div className="absolute w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 max-w-5xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/20 text-[var(--accent-primary)] text-xs font-black tracking-widest uppercase mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-pulse" />
          Next-Gen AI Moderation
        </motion.div>


        <h1 className="text-6xl md:text-9xl font-black font-sora leading-[0.9] tracking-tighter mb-8 text-[var(--text-primary)] uppercase italic">
          Neural <br />
          <span className="bg-gradient-to-r from-purple-500 to-cyan-400 bg-clip-text text-transparent">
            Shielding
          </span>
        </h1>

        <p className="mt-8 text-[var(--text-secondary)] max-w-2xl mx-auto text-xl font-medium leading-relaxed font-inter uppercase tracking-tighter">
          Synchronize your community with AetherGuard. Artificial intelligence patrolling your digital borders across YouTube & GitHub.
        </p>



        <div className="mt-14 flex flex-col sm:flex-row justify-center gap-8">
          <button
            onClick={() => navigate('/auth')}
            className="px-12 py-5 rounded-[2rem] bg-[var(--accent-primary)] text-white font-black tracking-widest uppercase text-sm shadow-[0_15px_40px_-10px_rgba(124,58,237,0.5)] hover:scale-105 transition-all flex items-center gap-3"
          >
            Get Started <ArrowRight size={18} />
          </button>
          <button
            onClick={() => navigate('/auth')}
            className="px-12 py-5 rounded-[2rem] border border-[var(--border-dim)] hover:bg-[var(--bg-surface)] transition-all text-sm font-black tracking-widest uppercase flex items-center gap-3 text-[var(--text-primary)]"
          >
            <Play size={18} className="fill-current" /> Live Demo
          </button>



        </div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Scroll to Explore</span>
        <div className="w-0.5 h-10 bg-gradient-to-b from-[var(--accent-primary)] to-transparent" />
      </div>


    </section>
  );
}
