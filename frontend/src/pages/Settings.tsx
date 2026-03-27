import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { Bell, Eye, Sliders } from 'lucide-react';

const Settings = () => {
  const [sensitivity, setSensitivity] = useState(75);

  return (
    <div className="space-y-10 max-w-4xl mx-auto p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-black font-sora text-[var(--text-primary)] tracking-tighter uppercase italic">
            <span className="opacity-30">System</span> <span className="text-[var(--accent-primary)]">Settings</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-medium uppercase tracking-tight text-sm">Configure your AI agent's behavior and portal preferences.</p>
      </div>


      <div className="grid grid-cols-1 gap-8">
        {/* AI Sensitivity Slider */}
        <GlassCard className="p-10 space-y-8 bg-[var(--bg-surface)] border-[var(--border-dim)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)] flex items-center justify-center shadow-glow">
              <Sliders className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black uppercase tracking-tight text-[var(--text-primary)]">AI Moderation Pulse</h3>
              <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest">Adjust the aggressiveness of toxicity detection</p>
            </div>
          </div>


          <div className="space-y-6">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Low Sensitivity (Conservative)</span>
              <span className="text-3xl font-black font-sora text-[var(--accent-primary)]">{sensitivity}%</span>
              <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">High Sensitivity (Strict)</span>
            </div>

            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sensitivity} 
              onChange={(e) => setSensitivity(parseInt(e.target.value))}
              className="w-full h-2 bg-[var(--bg-main)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)] border border-[var(--border-dim)]"
            />
            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-dim)] shadow-soft">
                <p className="text-[10px] text-[var(--text-secondary)] font-medium leading-relaxed italic">
                    <span className="text-[var(--accent-primary)] font-bold uppercase mr-2">Note:</span> 
                    Higher sensitivity may increase false positives but ensures a cleaner community environment. Your current setting ({sensitivity}%) is optimized for high-traffic channels.
                </p>
            </div>

          </div>
        </GlassCard>

        {/* Global Configuration */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <GlassCard className="p-8 space-y-6 bg-[var(--bg-surface)] border-[var(--border-dim)]">
                <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 text-[var(--text-primary)]">
                    <Eye size={20} className="text-[var(--accent-primary)]" /> Visual Preferences
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-dim)] shadow-soft">
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">Theme Engine</span>
                        <div className="text-[10px] font-black text-[var(--accent-primary)] uppercase flex items-center gap-2 cursor-pointer border border-[var(--accent-primary)] px-3 py-1.5 rounded-lg hover:bg-[var(--accent-primary)]/10">Toggle UI Mode</div>
                    </div>
                </div>
            </GlassCard>

            <GlassCard className="p-8 space-y-6 bg-[var(--bg-surface)] border-[var(--border-dim)]">
                <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-2 text-[var(--text-primary)]">
                    <Bell size={20} className="text-[var(--accent-primary)]" /> Alert Hub
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-dim)] shadow-soft">
                        <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-primary)]">Push Notifications</span>
                        <span className="text-[10px] font-black text-green-500 uppercase">Active</span>
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

