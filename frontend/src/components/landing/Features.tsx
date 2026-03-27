import { motion } from "framer-motion";
import { Zap, Activity, Globe } from "lucide-react";

const features = [
  { 
    title: "AI Detection", 
    icon: Zap,
    desc: "Powerful AI models detecting harmful content instantly with context awareness.",
    color: "from-purple-500/20 to-transparent"
  },
  { 
    title: "Real-time Analytics", 
    icon: Activity,
    desc: "Visualize community health with high-performance tracking and neural insights.",
    color: "from-cyan-500/20 to-transparent"
  },
  { 
    title: "Cross Platform", 
    icon: Globe,
    desc: "One agent to rule them all. Unified moderation for YouTube and GitHub ecosystems.",
    color: "from-[var(--accent-primary)]/20 to-transparent"

  }
];

export default function Features() {
  return (
    <section id="features" className="py-40 px-10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black font-sora tracking-tighter mb-4 text-[var(--text-primary)]">
                Engineered for <span className="text-[var(--accent-primary)]">Safety</span>
            </h2>
            <p className="text-[var(--text-secondary)] font-medium max-w-xl mx-auto text-lg uppercase tracking-tight">Advanced protection for modern digital platforms.</p>


        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[2.5rem] backdrop-blur-xl 
              bg-[var(--bg-surface)] border border-[var(--border-dim)]

              shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group`}

            >
              <div className={`absolute inset-0 bg-gradient-to-br ${f.color} opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="w-14 h-14 rounded-2xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] mb-8 group-hover:scale-110 transition-transform">

                <f.icon size={28} />
              </div>

              <h3 className="text-2xl font-black font-sora mb-4 text-[var(--text-primary)] uppercase tracking-tight">{f.title}</h3>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed font-inter">

                {f.desc}
              </p>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
