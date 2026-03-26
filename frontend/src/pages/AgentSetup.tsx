import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Youtube, Github, Zap, ShieldCheck, ArrowRight, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowButton from '../components/ui/GlowButton';

interface AgentSetupProps {
  onComplete: () => void;
}

const AgentSetup = ({ onComplete }: AgentSetupProps) => {
  const [selected, setSelected] = useState<'github' | 'youtube' | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();

  const handleConnect = async (platform: 'github' | 'youtube') => {
    setSelected(platform);
    setIsConnecting(true);
    
    // Simulate API Call
    // POST /connect-platform { platform: "github" | "youtube", oauthToken: "..." }
    console.log(`Connecting to ${platform}...`);
    
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    localStorage.setItem("selectedPlatform", platform);
    localStorage.setItem("setup", "true");
    onComplete();
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-bgLight dark:bg-bgDark text-gray-900 dark:text-white transition-colors duration-500 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-primary-glow/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl w-full z-10">
        <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                    Agent Configuration
                </div>
                <h2 className="text-6xl md:text-8xl font-black font-sora tracking-tighter leading-none">
                  CHOOSE <br /> <span className="text-primary italic">ECOSYSTEM</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium text-lg max-w-xl mx-auto uppercase tracking-tighter">Connect your platform to initialize AI moderation agents.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Option 1: GitHub */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`p-12 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center gap-8 group relative overflow-hidden ${
                    selected === 'github' 
                    ? "bg-white dark:bg-white/5 border-primary shadow-2xl" 
                    : "bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/5"
                  }`}
                >
                    <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                        <Github size={44} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-black font-sora uppercase tracking-tight mb-2">GitHub</h3>
                        <p className="text-xs font-black uppercase tracking-widest opacity-40 leading-relaxed">Automated issue & PR moderation with AI analysis.</p>
                    </div>
                    
                    <GlowButton 
                        onClick={() => handleConnect('github')}
                        disabled={isConnecting}
                        className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                    >
                        {isConnecting && selected === 'github' ? 'Syncing...' : 'Connect GitHub'}
                    </GlowButton>
                </motion.div>

                {/* Option 2: YouTube */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className={`p-12 rounded-[2.5rem] border-2 transition-all duration-500 flex flex-col items-center gap-8 group relative overflow-hidden ${
                    selected === 'youtube' 
                    ? "bg-white dark:bg-white/5 border-red-500 shadow-2xl" 
                    : "bg-gray-50 dark:bg-white/[0.02] border-gray-200 dark:border-white/5"
                  }`}
                >
                    <div className="w-20 h-20 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                        <Youtube size={44} />
                    </div>
                    <div className="text-center">
                        <h3 className="text-3xl font-black font-sora uppercase tracking-tight mb-2">YouTube</h3>
                        <p className="text-xs font-black uppercase tracking-widest opacity-40 leading-relaxed">Real-time comment filtering & toxicity detection.</p>
                    </div>

                    <GlowButton 
                        onClick={() => handleConnect('youtube')}
                        disabled={isConnecting}
                        className="w-full py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                    >
                        {isConnecting && selected === 'youtube' ? 'Syncing...' : 'Connect YouTube'}
                    </GlowButton>
                </motion.div>
              </div>

              <div className="flex flex-col items-center gap-4 pt-8">
                  <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-500">
                      <ShieldCheck size={14} className="text-primary-glow" /> 
                      Secure AES-256 OAuth Connection
                  </div>
                  {isConnecting && (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-primary-glow text-[10px] font-black uppercase tracking-[0.3em]"
                      >
                         <Terminal size={12} className="animate-pulse" /> Finalizing Proxy Handshake...
                      </motion.div>
                  )}
              </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AgentSetup;
