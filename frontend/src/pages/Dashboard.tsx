import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';
import GlowButton from '../components/ui/GlowButton';
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

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { recentActivity } from '../data/mockData';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

const data = [

  { name: 'Mon', total: 4000, toxic: 240 },
  { name: 'Tue', total: 3000, toxic: 139 },
  { name: 'Wed', total: 2000, toxic: 980 },
  { name: 'Thu', total: 2780, toxic: 390 },
  { name: 'Fri', total: 1890, toxic: 480 },
  { name: 'Sat', total: 2390, toxic: 380 },
  { name: 'Sun', total: 3490, toxic: 430 },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const chartColors = {
    primary: '#7C3AED',
    toxic: '#ef4444',
    grid: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
    text: theme === 'dark' ? '#94A3B8' : '#64748B',
    tooltipBg: theme === 'dark' ? 'rgba(11, 15, 25, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    tooltipBorder: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  return (
    <div className="space-y-12">

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl md:text-5xl font-black font-sora text-text-primary tracking-tighter uppercase italic">
            Command <span className="text-primary">Center</span>
          </h1>
          <p className="text-text-secondary font-medium uppercase tracking-tight text-sm">Welcome back, Sentinel Alex. Neural systems are 100% operational.</p>
        </div>

        <GlowButton 
          onClick={() => navigate('/dashboard/analyze')}
          className="px-10 py-5 rounded-2xl flex items-center justify-center gap-3 text-xs font-black uppercase tracking-[0.2em]"
        >
          <Zap size={20} className="text-white" />
          <span>Sync Neural Agent</span>
        </GlowButton>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard title="Total Scanned" value="12,840" icon={<Search size={22} />} trend={{ value: 12, isUp: true }} />
        <StatCard title="Flagged Toxicity" value="1,605" icon={<ShieldAlert size={22} className="text-red-500" />} trend={{ value: 5.4, isUp: false }} className="border-red-500/20" />
        <StatCard title="Spam Intercepted" value="842" icon={<Activity size={22} className="text-primary-glow" />} trend={{ value: 0.8, isUp: true }} />
        <StatCard title="Neural Health" value="84%" icon={<ShieldCheck size={22} className="text-green-500" />} description="Good health" className="border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <GlassCard className="lg:col-span-2 p-8 flex flex-col border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-primary rounded-full" />
                <h3 className="text-xl font-black font-sora uppercase tracking-tight">Intelligence Velocity</h3>
            </div>
            <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-[0.2em]">
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-primary shadow-glow"></div>
                 <span className="text-gray-500">Global Traffic</span>
               </div>
               <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-red-500"></div>
                 <span className="text-gray-500">Toxicity Spike</span>
               </div>
            </div>
          </div>
          <div className="flex-1 w-full min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                <XAxis dataKey="name" stroke={chartColors.text} fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                <YAxis stroke={chartColors.text} fontSize={10} fontWeight="900" tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: chartColors.tooltipBg, 
                    borderColor: chartColors.tooltipBorder, 
                    borderRadius: '16px', 
                    backdropFilter: 'blur(10px)',
                    border: '1px solid'
                  }}
                  itemStyle={{ fontSize: '10px', color: theme === 'dark' ? '#fff' : '#000', textTransform: 'uppercase', fontWeight: '900' }}
                />
                <Area type="monotone" dataKey="total" stroke={chartColors.primary} strokeWidth={4} fillOpacity={1} fill="url(#colorTotal)" />
                <Area type="monotone" dataKey="toxic" stroke={chartColors.toxic} strokeWidth={3} fill="transparent" strokeDasharray="5 5" />

              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="flex flex-col p-8 border-white/5 bg-white/[0.01]">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-black font-sora uppercase tracking-tight">Neural Log</h3>
            <button 
                onClick={() => navigate('/dashboard/moderation')}
                className="text-primary text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 hover:translate-x-1 transition-transform"
            >
              EXPAND <ArrowRight size={14} />
            </button>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {recentActivity.map((activity, i) => (
              <motion.div 
                key={activity.id} 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-5 rounded-2xl bg-bg-surface border border-border-dim hover:border-primary/30 transition-all group cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {activity.platform === 'youtube' ? <div className="p-2 rounded-lg bg-red-500/10 text-red-500"><Youtube size={16} /></div> : <div className="p-2 rounded-lg bg-text-secondary/10 text-text-secondary"><Github size={16} /></div>}
                    <span className="text-[10px] font-black uppercase tracking-widest text-text-primary truncate max-w-[140px]">{activity.target}</span>
                  </div>
                  <span className="text-[9px] text-text-dim font-bold uppercase tracking-widest">{activity.timestamp}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 h-1 bg-border-dim rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${activity.safe}%` }} />
                    </div>
                    <span className="text-[10px] font-black text-primary uppercase">{activity.safe}% CLEAN</span>
                </div>
              </motion.div>

            ))}
          </div>
        </GlassCard>
      </div>

      <GlassCard className="flex flex-col md:flex-row items-center justify-between p-10 bg-gradient-to-br from-primary/10 via-transparent to-primary-glow/5 border-primary/20 relative overflow-hidden group">
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(124,58,237,0.1),transparent)] opacity-0 group-hover:opacity-100 transition-opacity" />
         <div className="space-y-6 relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-widest">
                Optimization Available
            </div>
            <h2 className="text-3xl md:text-5xl font-black font-sora text-text-primary uppercase italic tracking-tighter">Hybrid <span className="text-primary underline decoration-red-500/30">Hinglish</span> Tuning</h2>
            <p className="text-text-secondary font-medium text-sm leading-relaxed uppercase tracking-tight">Catch cross-linguistic toxicity patterns (Hindi + English) with our latest neural weights update.</p>

            <GlowButton variant="cyan" className="px-10 py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest" onClick={() => navigate('/dashboard/filters')}>
                Initialize Tuning
            </GlowButton>
         </div>
         <div className="hidden md:block opacity-10 group-hover:opacity-20 transition-opacity relative z-0">
             <TrendingUp size={180} className="text-primary stroke-[1px]" />
         </div>
      </GlassCard>
    </div>
  );
};

export default Dashboard;

