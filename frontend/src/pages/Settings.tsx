import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { User, Bell, Shield, Lock, Eye, LogOut, Sliders } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = () => {
  const [sensitivity, setSensitivity] = useState(75);
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <div className="space-y-10 max-w-4xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-black font-sora text-white tracking-tighter uppercase italic">
            System <span className="text-primary">Settings</span>
        </h1>
        <p className="text-gray-400 font-medium uppercase tracking-tight text-sm">Configure your AI agent's behavior and portal preferences.</p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* AI Sensitivity Slider */}
        <GlassCard className="p-10 space-y-8 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-glow">
              <Sliders className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight">AI Moderation Pulse</h3>
              <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">Adjust the aggressiveness of toxicity detection</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Low Sensitivity (Conservative)</span>
              <span className="text-3xl font-black font-sora text-primary-glow">{sensitivity}%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">High Sensitivity (Strict)</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sensitivity} 
              onChange={(e) => setSensitivity(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                <p className="text-[10px] text-gray-400 font-medium leading-relaxed italic">
                    <span className="text-primary-glow font-bold uppercase mr-2">Note:</span> 
                    Higher sensitivity may increase false positives but ensures a cleaner community environment. Your current setting ({sensitivity}%) is optimized for high-traffic channels.
                </p>
            </div>
          </div>
        </GlassCard>

        {/* Global Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="p-8 space-y-6">
                <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                    <Eye size={20} className="text-primary" /> Visual Preferences
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-xs font-bold uppercase tracking-widest">Dark Mode Protocol</span>
                        <div 
                            className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${isDarkMode ? 'bg-primary' : 'bg-gray-600'}`}
                            onClick={() => setIsDarkMode(!isDarkMode)}
                        >
                            <motion.div 
                                animate={{ x: isDarkMode ? 24 : 0 }}
                                className="w-4 h-4 bg-white rounded-full" 
                            />
                        </div>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 opacity-50 cursor-not-allowed">
                        <span className="text-xs font-bold uppercase tracking-widest">Glassmorphism Blur</span>
                        <span className="text-[10px] font-black bg-white/10 px-2 py-1 rounded italic uppercase">High</span>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="p-8 space-y-6">
                <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                    <Bell size={20} className="text-primary" /> Alert Hub
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-xs font-bold uppercase tracking-widest">Push Notifications</span>
                        <span className="text-[10px] font-black text-green-500 uppercase">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                        <span className="text-xs font-bold uppercase tracking-widest">Email Summaries</span>
                        <span className="text-[10px] font-black text-primary-glow uppercase underline cursor-pointer">Configure</span>
                    </div>
                </div>
            </GlassCard>
        </div>

        {/* Action Zone */}
        <div className="flex justify-end pt-4">
            <GlowButton className="px-10 py-4 rounded-2xl flex items-center gap-2 text-xs font-black uppercase tracking-widest">
               Save System State
            </GlowButton>
        </div>
      </div>
    </div>
  );
};

export default Settings;
