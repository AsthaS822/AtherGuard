import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Mail, Lock, ArrowRight, UserPlus, LogIn, AlertCircle } from 'lucide-react';
import GlowButton from '../components/ui/GlowButton';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/ui/BackButton';
import { login, signup, googleLogin } from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import { useContext, useEffect } from 'react';


const Login: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth?.user;

  useEffect(() => {
    if (user) {
      navigate("/app");
    }
  }, [user, navigate]);

  const checkProfileAndNavigate = async (uid: string) => {
    try {
      const { db } = await import('../lib/firebase');
      const { doc, getDoc } = await import('firebase/firestore');
      const userDoc = await getDoc(doc(db, "users", uid));
      if (!userDoc.exists()) {
        navigate("/setup");
      } else {
        navigate("/app");
      }
    } catch (err) {
      console.error("Profile check failed", err);
      navigate("/setup");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
        let authResult;
        if (activeTab === 'login') {
            authResult = await login(email, password);
        } else {
            authResult = await signup(email, password);
        }
        await checkProfileAndNavigate(authResult.user.uid);
    } catch (err: any) {
        setError(err.message || "Authentication failed. Please check your credentials.");
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    setLoading(true);
    try {
        const authResult = await googleLogin();
        await checkProfileAndNavigate(authResult.user.uid);
    } catch (err: any) {
        setError(err.message || "Google authentication failed. Please try again.");
    } finally {
        setLoading(false);
    }
  };


  return (
    <div 
      className="min-h-screen text-[var(--text-primary)] flex items-center justify-center p-6 relative overflow-hidden transition-colors duration-500 bg-[#0A051A]"
      style={{
        backgroundImage: "url('/auth_wallpaper.png')",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />
      
      {/* Back to Landing */}
      <div className="absolute top-10 left-10 z-50">
        <BackButton label="Back to Landing" />
      </div>

      {/* Cinematic Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

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
                Nexus <span className="text-[var(--accent-primary)]">Auth</span>
            </h1>
            <p className="text-[var(--text-secondary)] font-black uppercase tracking-[0.3em] text-[9px] opacity-60">Secure Gateway to AetherGuard Intelligence</p>
        </div>



        <div className="bg-white/5 dark:bg-black/30 border border-white/10 dark:border-white/5 rounded-[2.5rem] p-2 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] relative overflow-hidden mb-8 z-10">
            <div className="flex p-1 gap-1">
                <button 
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'login' ? 'bg-[var(--accent-primary)] text-white shadow-glow' : 'text-white/60 hover:text-white'}`}
                >
                    <LogIn size={16} /> Login
                </button>
                <button 
                  onClick={() => setActiveTab('signup')}
                  className={`flex-1 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${activeTab === 'signup' ? 'bg-[var(--accent-primary)] text-white shadow-glow' : 'text-white/60 hover:text-white'}`}
                >

                    <UserPlus size={16} /> Sign Up
                </button>

            </div>
        </div>

        <div className="bg-white/5 dark:bg-black/30 border border-white/10 dark:border-white/5 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative overflow-hidden group z-10">


            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest"
                        >
                            <AlertCircle size={16} />
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-6"
                    >
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Neural Identity</label>
                            <div className="relative">
                                <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                                <input 
                                    type="email" 
                                    placeholder="user@aether.ai" 
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-[var(--accent-primary)] focus:bg-black/40 transition-all font-black text-[10px] uppercase tracking-widest text-white placeholder:text-white/20 shadow-inner"


                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Access Key</label>
                            <div className="relative">
                                <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    className="w-full bg-black/20 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-[var(--accent-primary)] focus:bg-black/40 transition-all font-black text-white placeholder:text-white/20 shadow-inner tracking-widest"


                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                <GlowButton 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-6 rounded-2xl text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-4"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            {activeTab === 'login' ? 'Unlock Portal' : 'Initialize Identity'} <ArrowRight size={18} />
                        </>
                    )}
                </GlowButton>
            </form>

            <div className="mt-10 pt-10 border-t border-white/10 relative z-10">
                <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-6">Or Authenticate via</p>
                <div className="flex flex-col gap-4">
                    <button type="button" onClick={handleGoogleLogin} className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border border-white/10 bg-black/20 hover:bg-black/40 hover:border-white/20 transition-all text-[10px] font-black uppercase tracking-widest text-white/80 hover:text-white group-hover:shadow-[0_0_20px_rgba(255,255,255,0.05)]">
                        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-4 h-4" />
                        </div> 
                        Google Sign-In
                    </button>
                </div>
            </div>


        </div>
      </motion.div>
    </div>
  );
};

export default Login;
