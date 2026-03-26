import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, Github, UserPlus, LogIn } from 'lucide-react';
import GlowButton from '../components/ui/GlowButton';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
    navigate("/onboarding");
  };

  return (
    <div className="min-h-screen bg-bgLight dark:bg-bgDark text-gray-900 dark:text-white flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500">
      
      {/* Cinematic Background */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-glow/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-lg z-10"
      >
        <div className="text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(124,58,237,0.4)]">
                <Shield size={28} className="text-white" />
            </div>
            <h1 className="text-4xl font-black font-sora tracking-tighter mb-2 uppercase italic">
                Nexus <span className="text-primary">Auth</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-widest text-[9px]">Secure Gateway to AetherGuard Intelligence</p>
        </div>

        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-2 backdrop-blur-3xl shadow-2xl relative overflow-hidden mb-8">
            <div className="flex p-1 gap-1">
                <button 
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'login' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
                >
                    <LogIn size={16} /> Login
                </button>
                <button 
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'signup' ? 'bg-primary text-white shadow-lg' : 'text-gray-400 hover:text-gray-600 dark:hover:text-white'}`}
                >
                    <UserPlus size={16} /> Sign Up
                </button>
            </div>
        </div>

        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Neural Identity</label>
                            <div className="relative">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="email" 
                                    placeholder="user@aether.ai" 
                                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Access Key</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-100 dark:border-white/5 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-primary/50 transition-all font-medium"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <GlowButton type="submit" className="w-full py-6 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-4">
                    {activeTab === 'login' ? 'Unlock Portal' : 'Initialize Identity'} <ArrowRight size={18} />
                </GlowButton>
            </form>

            <div className="mt-10 pt-10 border-t border-gray-100 dark:border-white/5 relative z-10">
                <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 mb-6">Or Authenticate via</p>
                <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-sm font-bold">
                        <Github size={20} /> GitHub
                    </button>
                    <button className="flex items-center justify-center gap-3 py-4 rounded-2xl border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/5 transition-all text-sm font-bold">
                        <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-white text-[10px] font-black">G</div> Google
                    </button>
                </div>
            </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
