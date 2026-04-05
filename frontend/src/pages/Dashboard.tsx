import { useNavigate } from 'react-router-dom';
import { useAnalytics } from '../hooks/useAnalytics';
import { useProfile } from '../hooks/useProfile';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  Search, 
  Youtube, 
  Github, 
  ArrowRight,
  ShieldCheck,
  Zap,
  TrendingUp,
  Activity
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';
import GlowButton from '../components/ui/GlowButton';
// Chart imports removed as the UI currently uses a placeholder icon for analytics

const Dashboard = () => {
  const navigate = useNavigate();
  const { stats, recentLogs } = useAnalytics();
  const { profile } = useProfile();

  const totalScanned = stats?.totalScanned || 0;
  const safeCount = stats?.safeCount || 0;
  const toxicCount = stats?.toxicCount || 0;
  const badContent = (stats?.toxicCount || 0) + (stats?.spamCount || 0) + (stats?.abusiveCount || 0) + (stats?.threatCount || 0);

  // Neural Health
  const health = totalScanned > 0 
    ? ((totalScanned - badContent) / totalScanned) * 100
    : 100;

  const getHealthStatus = (h: number) => {
    if (h >= 90) return { label: "Excellent", color: "text-green-500" };
    if (h >= 70) return { label: "Good", color: "text-blue-500" };
    if (h >= 50) return { label: "Risky", color: "text-yellow-500" };
    return { label: "Dangerous", color: "text-red-500" };
  };

  const healthStatus = getHealthStatus(health);

  // Live logs feed
  const liveFeed = recentLogs?.flatMap(log => 
    (log.items || []).map((item: any, i: number) => ({
      id: `${log.id}-${i}`,
      platform: log.platform,
      target: item.author || 'Anonymous',
      text: item.text,
      label: item.moderation?.label || 'safe',
      date: item.date,
      score: item.moderation?.score || 0
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5) || [];


  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black font-sora text-[var(--text-primary)] tracking-tighter uppercase italic">
            Command <span className="text-[var(--accent-primary)]">Center</span>
          </h1>
          <p className="text-[var(--text-secondary)] font-medium uppercase tracking-tight text-sm">
            Welcome back, {profile?.name || 'Agent'}. All systems are active.
          </p>
        </div>

        <GlowButton 
          onClick={() => navigate('/app/analyze')}
          className="px-10 py-5 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em]"
        >
          <Zap size={20} className="text-white" />
          <span>Launch Analysis</span>
        </GlowButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard title="Total Scanned" value={totalScanned.toLocaleString()} icon={<Search size={22} />} trend={{ value: 12, isUp: true }} />
        <StatCard title="Flagged Toxicity" value={toxicCount.toLocaleString()} icon={<ShieldAlert size={22} className="text-red-500" />} trend={{ value: 5.4, isUp: false }} className="border-red-500/20" />
        <StatCard title="Safe Items" value={safeCount.toLocaleString()} icon={<Activity size={22} className="text-[var(--accent-glow)]" />} trend={{ value: 0.8, isUp: true }} />
        <StatCard 
            title="Neural Health" 
            value={`${health.toFixed(1)}%`} 
            icon={<ShieldCheck size={22} className={healthStatus.color} />} 
            description={healthStatus.label}
            className={`${healthStatus.color.replace('text', 'border')}/20 shadow-lg`} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <GlassCard className="lg:col-span-2 p-8 flex flex-col border-[var(--border-dim)] bg-[var(--bg-surface)]">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-[var(--accent-primary)] rounded-full" />
                <h3 className="text-xl font-black font-sora uppercase tracking-tight text-[var(--text-primary)]">Intelligence Overview</h3>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[350px] flex items-center justify-center opacity-40">
             <TrendingUp size={100} className="text-[var(--accent-primary)] animate-pulse" />
             <span className="text-xs font-black uppercase tracking-widest ml-4">Waiting for more data points...</span>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col p-8 border-[var(--border-dim)] bg-[var(--bg-surface)]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black font-sora uppercase tracking-tight text-[var(--text-primary)]">Recent Activity</h3>
            <button onClick={() => navigate('/app/moderation')} className="text-[var(--accent-primary)] text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:translate-x-1 transition-transform">
              LOGS <ArrowRight size={14} />
            </button>
          </div>

          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {liveFeed.length > 0 ? liveFeed.map((activity: any, i: number) => (
              <motion.div key={activity.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="p-5 rounded-2xl bg-[var(--bg-main)] border border-[var(--border-dim)] hover:border-[var(--accent-primary)]/30 transition-all group cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {activity.platform === 'youtube' ? <div className="p-2 rounded-lg bg-red-500/10 text-red-500"><Youtube size={16} /></div> : <div className="p-2 rounded-lg bg-[var(--bg-surface)] text-[var(--text-primary)]"><Github size={16} /></div>}
                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-primary)] truncate max-w-[140px]">{activity.target}</span>
                  </div>
                  <span className="text-[9px] text-[var(--text-secondary)] font-bold uppercase tracking-widest">{new Date(activity.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2 italic">"{activity.text}"</p>
                    <div className={`mt-2 inline-flex px-3 py-1 rounded-full text-[8px] font-black uppercase border ${['toxic', 'spam', 'threat', 'abusive'].includes(activity.label) ? 'border-red-500/30 text-red-500 bg-red-500/5' : 'border-green-500/30 text-green-500 bg-green-500/5'}`}>
                        {activity.label}
                    </div>
                </div>
              </motion.div>
            )) : (
               <div className="text-center text-[10px] uppercase tracking-widest text-[var(--text-secondary)] py-10 opacity-30">Waiting for live activity...</div>
            )}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="flex flex-col md:flex-row items-center justify-between p-10 bg-gradient-to-br from-[var(--accent-primary)]/10 via-transparent to-[var(--accent-glow)]/5 border-[var(--accent-primary)]/20 relative overflow-hidden group">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="space-y-6 relative z-10 max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black font-sora text-[var(--text-primary)] uppercase italic tracking-tighter">Advanced <span className="text-[var(--accent-primary)] underline decoration-red-500/30">Hinglish</span> Tuning</h2>
            <p className="text-[var(--text-secondary)] font-medium text-sm leading-relaxed uppercase tracking-tight">Our latest engine catches unique language patterns across regional dialects automatically.</p>
            <GlowButton variant="cyan" className="px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest" onClick={() => navigate('/app/analyze')}>
                Initialize Tune
            </GlowButton>
         </div>
         <div className="hidden md:block opacity-10 group-hover:opacity-20 transition-opacity relative z-0">
             <TrendingUp size={180} className="text-[var(--accent-primary)] stroke-[1px]" />
         </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;
