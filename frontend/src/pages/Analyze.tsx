import { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import StatCard from '../components/ui/StatCard';
import Tabs from '../components/ui/Tabs';
import Table from '../components/ui/Table';
import { Youtube, Github, Search, Loader2, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles, Wand2, Trash2, Ban } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectPlatform } from '../utils/detectPlatform';
import { mockComments } from '../data/mockData';

const Analyze = () => {
  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<'youtube' | 'github' | 'unknown'>('unknown');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    setPlatform(detectPlatform(url));
  }, [url]);

  const handleAnalyze = () => {
    if (!url) return;
    setIsAnalyzing(true);
    setShowResults(false);
    
    // Simulate API call
    // POST /analyze { url: "...", platform: "..." }
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      localStorage.setItem("lastAnalysis", JSON.stringify({ url, platform, timestamp: new Date() }));
    }, 2000);
  };

  const filteredComments = activeTab === 'all' 
    ? mockComments 
    : mockComments.filter(c => c.type.toLowerCase() === activeTab.toLowerCase());

  const columns = [
    { 
      header: 'Comment Content', 
      accessor: (c: any) => (
        <div className="max-w-md">
          <p className="font-medium text-text-primary line-clamp-2">{c.content}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-text-dim mt-2">by {c.user} • {new Date(c.timestamp).toLocaleTimeString()}</p>
        </div>

      )
    },
    { 
      header: 'Toxicity', 
      accessor: (c: any) => (
        <div className="flex items-center gap-3">
          <div className="w-16 h-1.5 bg-border-dim rounded-full overflow-hidden border border-border-dim">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${c.score}%` }}
              className={`h-full ${c.score > 80 ? 'bg-red-500' : c.score > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} 
            />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${c.score > 80 ? 'text-red-500' : 'text-text-dim'}`}>{c.score}%</span>

        </div>
      )
    },
    { 
      header: 'AI Classification', 
      accessor: (c: any) => (
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
          c.type === 'Toxic' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 
          c.type === 'Spam' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
          'bg-green-500/10 text-green-500 border-green-500/20'
        }`}>
          {c.type}
        </span>
      )
    },
    { 
      header: 'Agent Action', 
      accessor: (c: any) => (
        <div className="flex items-center gap-2">
           <GlowButton variant="secondary" className="px-4 py-1.5 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
              {c.action === 'Delete' ? <Trash2 size={12} /> : c.action === 'Flag' ? <ShieldAlert size={12} /> : <ShieldCheck size={12} />}
              {c.action}
           </GlowButton>
        </div>
      )
    }
  ];

  const aiSuggestions = [
    { icon: Ban, label: "Enable auto-mod for user 'Hacker99'", desc: "Repeated spam detected across 4 threads." },
    { icon: Wand2, label: "Enforce 'Strict' filter on current video", desc: "Toxicity levels are 15% higher than channel average." },
    { icon: Sparkles, label: "Whitelist 'Educator_AI'", desc: "Consistently positive and constructive feedback." }
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-black font-sora text-text-primary tracking-tighter uppercase italic">
            Analyze <span className="text-primary">Content</span>
        </h1>
        <p className="text-text-secondary font-medium uppercase tracking-tight text-sm">Real-time neural scanning for YouTube & GitHub ecosystems.</p>
      </div>


      <GlassCard className="p-10 border-primary/20 bg-primary/5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1 group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-dim flex items-center gap-3 transition-colors group-focus-within:text-primary">
              {platform === 'youtube' && <Youtube size={24} className="text-red-500" />}
              {platform === 'github' && <Github size={24} className="text-text-primary" />}
              {platform === 'unknown' && <Search size={24} />}
            </div>

            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL or GitHub Repo link..."
              className="w-full bg-bg-surface/50 border border-border-main rounded-[1.5rem] py-6 pl-16 pr-8 focus:outline-none focus:border-primary transition-all text-text-primary text-lg font-medium"
            />

          </div>
          <GlowButton 
            onClick={handleAnalyze} 
            disabled={!url || isAnalyzing}
            className="md:w-64 py-6 rounded-[1.5rem] flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.2em]"
          >
            {isAnalyzing ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <Sparkles size={24} />
                <span>Initialize AI</span>
              </>
            )}
          </GlowButton>
        </div>
      </GlassCard>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatCard title="Analyzed Items" value="1,240" icon={<Search size={20} />} />
              <StatCard title="Toxicity Index" value="12.5%" icon={<AlertTriangle size={20} className="text-red-400" />} className="border-red-500/20" />
              <StatCard title="Spam Density" value="8.2%" icon={<ShieldAlert size={20} className="text-yellow-400" />} className="border-yellow-500/20" />
              <StatCard title="Safety Rating" value="84/100" icon={<ShieldCheck size={20} className="text-green-400" />} className="border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]" />
            </div>

            {/* AI Suggestions Section */}
            <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-primary flex items-center gap-2">
                    <Wand2 size={14} /> Neural Agent Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {aiSuggestions.map((s, i) => (
                        <GlassCard key={i} className="p-6 border-border-dim bg-bg-surface/10 hover:border-primary/30 transition-all cursor-pointer group">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <s.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight text-text-primary mb-1">{s.label}</h4>
                                    <p className="text-[10px] text-text-dim font-medium leading-relaxed">{s.desc}</p>
                                </div>
                            </div>

                        </GlassCard>
                    ))}
                </div>
            </div>

            {/* Results Table */}
            <GlassCard className="p-0 overflow-hidden border-border-main bg-bg-surface/50">
              <div className="p-8 border-b border-border-dim flex flex-col md:flex-row justify-between items-center gap-6">
                <h2 className="text-2xl font-black font-sora flex items-center gap-3 uppercase italic tracking-tighter text-text-primary">
                   {platform === 'youtube' ? <Youtube className="text-red-500" /> : <Github className="text-text-primary" /> }
                   Neural <span className="text-primary">Feedback</span>
                </h2>

                <Tabs 
                  tabs={[
                    { id: 'all', label: 'All Items' },
                    { id: 'toxic', label: 'Toxic' },
                    { id: 'spam', label: 'Spam' },
                    { id: 'safe', label: 'Clean' }
                  ]}
                  activeTab={activeTab}
                  onChange={setActiveTab}
                />
              </div>
              <Table 
                columns={columns}
                data={filteredComments.map((c, i) => ({ ...c, id: i }))}
              />
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Analyze;
