import GlassCard from '../components/ui/GlassCard';
import Table from '../components/ui/Table';
import { Youtube, Github, ShieldAlert, Clock, MessageSquare, Zap, Trash2, Ban } from 'lucide-react';
import { mockComments } from '../data/mockData';
import { motion } from 'framer-motion';

const ModerationFeed = () => {
  const columns = [
    { 
      header: 'Context & Content', 
      accessor: (c: any) => (
        <div className="max-w-md">
          <p className="font-bold text-gray-900 dark:text-white line-clamp-2 text-sm">{c.content}</p>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 mt-3">
            <span className="text-primary font-black">USER: {c.user}</span>
            <span>•</span>
            <span className="flex items-center gap-1.5 bg-gray-100 dark:bg-white/5 py-1 px-2 rounded-lg border border-gray-200 dark:border-white/5">
              {c.platform === 'youtube' ? <Youtube size={12} className="text-red-500" /> : <Github size={12} />}
              {c.platform}
            </span>
          </div>
        </div>
      )
    },
    { 
      header: 'Intelligence Flag', 
      accessor: (c: any) => (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <ShieldAlert size={14} className={c.score > 80 ? 'text-red-500' : 'text-yellow-500'} />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">{c.category || 'PATTERN DETECTED'}</span>
            </div>
            <div className="w-24 h-1 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${c.score > 80 ? 'bg-red-500' : 'bg-yellow-500'}`} 
                    style={{ width: `${c.score}%` }} 
                />
            </div>
        </div>
      )
    },
    { 
      header: 'Threat level', 
      accessor: (c: any) => (
        <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] border ${
          c.score > 80 ? 'bg-red-500/10 text-red-500 border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 
          'bg-yellow-500/10 text-yellow-500 border-yellow-500/30'
        }`}>
          {c.score > 80 ? 'CRITICAL' : 'MODERATE'}
        </span>
      )
    },
    { 
      header: 'Manual Override', 
      accessor: (c: any) => (
        <div className="flex items-center gap-2">
          <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent hover:border-red-500/40 text-gray-400 hover:text-red-500 transition-all">
            <Ban size={16} />
          </button>
          <button className="p-2.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-transparent hover:border-primary/40 text-gray-400 hover:text-primary transition-all">
            <Zap size={16} />
          </button>
        </div>
      )
    }
  ];

  const recentFeedData = mockComments.filter(c => c.type !== 'Safe');

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
            <h1 className="text-4xl md:text-5xl font-black font-sora text-gray-900 dark:text-white tracking-tighter uppercase italic">
                Moderation <span className="text-primary">Feed</span>
            </h1>
            <p className="text-gray-500 dark:text-gray-400 font-medium uppercase tracking-tight text-sm">Real-time stream of intercepted neural packets across ecosystems.</p>
        </div>
        <div className="flex items-center gap-4 bg-gray-100 dark:bg-white/5 p-4 rounded-2xl border border-gray-200 dark:border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500 border-4 border-red-500/30 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Live Surveillance Active</span>
        </div>
      </div>

      <GlassCard className="p-0 overflow-hidden border-white/5 bg-white/[0.01]">
        <div className="p-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <MessageSquare size={20} />
            </div>
            <h2 className="text-xl font-black font-sora uppercase tracking-tight">Active Infiltration Logs</h2>
          </div>
          <div className="flex gap-2">
              {['ALL', 'CRITICAL', 'MODERATE'].map((filter, i) => (
                  <button key={i} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${i === 0 ? 'bg-primary border-primary text-white shadow-glow' : 'bg-transparent border-gray-200 dark:border-white/10 text-gray-400 hover:border-primary/50'}`}>
                      {filter}
                  </button>
              ))}
          </div>
        </div>
        <Table 
          columns={columns}
          data={recentFeedData.map((c, i) => ({ ...c, id: i }))}
        />
        <div className="p-6 bg-gray-50 dark:bg-black/20 flex justify-center border-t border-gray-100 dark:border-white/5">
            <button className="text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-primary transition-colors flex items-center gap-2 group">
                LOAD PREVIOUS ARCHIVES <Zap size={12} className="group-hover:animate-pulse" />
            </button>
        </div>
      </GlassCard>
    </div>
  );
};

export default ModerationFeed;
