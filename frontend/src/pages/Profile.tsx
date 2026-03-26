import React from 'react';
import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';
import { User, Activity, ShieldCheck, Mail, Calendar, Briefcase, Zap, Clock } from 'lucide-react';

const Profile = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="relative h-48 rounded-3xl bg-gradient-to-r from-primary/30 to-glow/20 border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full p-8 flex items-end gap-6 z-10">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary to-purple-600 border-4 border-dark-bg shadow-glow flex items-center justify-center text-white text-4xl font-bold">
            AR
          </div>
          <div className="mb-2">
            <h1 className="text-4xl font-bold font-sora text-white">Alex Rivera</h1>
            <p className="text-primary-glow font-bold tracking-widest uppercase text-xs flex items-center gap-2 mt-1">
              <ShieldCheck size={14} />
              Lead Administrator
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <div className="space-y-6">
          <GlassCard className="space-y-6">
            <h3 className="text-lg font-bold font-sora flex items-center gap-2">
              <User size={18} className="text-primary-glow" />
              User Information
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-gray-500" />
                <span className="text-gray-400">Email:</span>
                <span className="text-white font-medium">alex@aetherguard.ai</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Briefcase size={16} className="text-gray-500" />
                <span className="text-gray-400">Role:</span>
                <span className="text-white font-medium">System Admin</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar size={16} className="text-gray-500" />
                <span className="text-gray-400">Joined:</span>
                <span className="text-white font-medium">Jan 2026</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock size={16} className="text-gray-500" />
                <span className="text-gray-400">Timezone:</span>
                <span className="text-white font-medium">UTC -5 (EST)</span>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="space-y-4">
            <h3 className="text-lg font-bold font-sora flex items-center gap-2">
                <Zap size={18} className="text-primary-glow" />
                Core Stats
            </h3>
            <div className="space-y-4">
               <div>
                  <div className="flex justify-between text-xs mb-1">
                     <span className="text-gray-500 font-bold">ACCURACY</span>
                     <span className="text-primary-glow font-bold">99.4%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-primary w-[99.4%]" />
                  </div>
               </div>
               <div>
                  <div className="flex justify-between text-xs mb-1">
                     <span className="text-gray-500 font-bold">EFFICIENCY</span>
                     <span className="text-glow font-bold">92.1%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-glow w-[92.1%]" />
                  </div>
               </div>
            </div>
          </GlassCard>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <StatCard title="Total Actions" value="1,420" icon={<Activity size={20} />} />
             <StatCard title="Moderation Efficiency" value="98.2%" icon={<ShieldCheck size={20} />} trend={{ value: 1.5, isUp: true }} />
          </div>

          <GlassCard className="space-y-6 flex-1">
             <h3 className="text-lg font-bold font-sora flex items-center gap-2">
                <Activity size={18} className="text-primary-glow" />
                Recent Activity Log
             </h3>
             <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-px before:bg-white/10">
                {[
                  { action: 'Updated Settings', target: 'AI Sensitivity changed to 80%', time: '2 hours ago' },
                  { action: 'Added Filter', target: 'Added word "trash" to global list', time: '5 hours ago' },
                  { action: 'Resolved Spike', target: 'Moderation spike on YouTube v/2841', time: '1 day ago' },
                  { action: 'Exported Data', target: 'Weekly report March 12-19 exported', time: '2 days ago' }
                ].map((log, i) => (
                  <div key={i} className="relative pl-8">
                     <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-dark-bg border-2 border-primary-glow shadow-neon z-10"></div>
                     <p className="text-sm font-bold text-white">{log.action}</p>
                     <p className="text-xs text-gray-400 mt-1">{log.target}</p>
                     <p className="text-[10px] text-gray-600 font-bold uppercase mt-1">{log.time}</p>
                  </div>
                ))}
             </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
