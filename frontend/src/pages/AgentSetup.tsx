import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Calendar, ArrowRight, ShieldCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import GlowButton from '../components/ui/GlowButton';
import { AuthContext } from '../context/AuthContext';
import { db } from '../lib/firebase';
import { doc, setDoc } from 'firebase/firestore';

const AgentSetup = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    if (!name || !age) {
        setError("Both identity parameters are required.");
        return;
    }

    setLoading(true);
    setError(null);

    try {
      await setDoc(doc(db, "users", user.uid), {
        name,
        age: parseInt(age, 10),
        email: user.email,
        createdAt: new Date().toISOString()
      }, { merge: true });

      navigate('/app');
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to initialize identity core.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A051A] text-white flex items-center justify-center p-6 relative overflow-hidden" 
         style={{ backgroundImage: "url('/auth_wallpaper.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />
      
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none z-0" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg z-10"
      >
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 backdrop-blur-3xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] relative overflow-hidden">
          
          <button 
            onClick={() => navigate('/')}
            className="absolute top-8 left-8 text-white/50 hover:text-white transition-colors flex items-center gap-2 text-[10px] font-black uppercase tracking-widest"
          >
            <ArrowLeft size={16} /> Back
          </button>

          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-[var(--accent-primary)] flex items-center justify-center mx-auto mb-6 shadow-glow">
              <ShieldCheck size={32} className="text-white" />
            </div>
            <h1 className="text-3xl font-black font-sora tracking-tighter uppercase italic text-white mb-2">Initialize Profile</h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-white/50">Register pilot identity to access AetherGuard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Full Name</label>
              <div className="relative">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  <input 
                      type="text" 
                      placeholder="Jane Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-black/20 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-[var(--accent-primary)] focus:bg-black/40 transition-all font-black text-[12px] uppercase tracking-widest text-white placeholder:text-white/20 shadow-inner"
                      required
                  />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/70 ml-4">Age</label>
              <div className="relative">
                  <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                  <input 
                      type="number" 
                      placeholder="25" 
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      min="13"
                      max="120"
                      className="w-full bg-black/20 border border-white/10 rounded-2xl py-5 pl-16 pr-6 focus:outline-none focus:border-[var(--accent-primary)] focus:bg-black/40 transition-all font-black text-[12px] uppercase tracking-widest text-white placeholder:text-white/20 shadow-inner"
                      required
                  />
              </div>
            </div>

            <GlowButton 
                type="submit" 
                disabled={loading}
                className="w-full py-6 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 mt-8"
            >
                {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                    <>
                        Finalize Synchronization <ArrowRight size={16} />
                    </>
                )}
            </GlowButton>
          </form>

        </div>
      </motion.div>
    </div>
  );
};

export default AgentSetup;
