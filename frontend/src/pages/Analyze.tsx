import { useState, useEffect, useContext } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import StatCard from '../components/ui/StatCard';
import Tabs from '../components/ui/Tabs';
import Table from '../components/ui/Table';
import { Youtube, Github, Search, Loader2, AlertTriangle, ShieldCheck, ShieldAlert, Sparkles, Wand2, Ban, Info, XCircle, Flag, EyeOff, Lock, MessageSquare, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { detectPlatform } from '../utils/detectPlatform';
import { AuthContext } from '../context/AuthContext';


const Analyze = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user;

  const [url, setUrl] = useState('');
  const [platform, setPlatform] = useState<'youtube' | 'github' | 'unknown'>('unknown');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [results, setResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPlatform(detectPlatform(url));
  }, [url]);

  const handleAnalyze = async () => {
    if (!url || !user) return;
    setIsAnalyzing(true);
    setShowResults(false);
    setError(null);
    
    try {
        const token = await user.getIdToken();
        const response = await fetch('http://localhost:5000/api/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ url })
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(errData.error || errData.msg || 'Analysis failed');
        }

        const data = await response.json();
        setResults(data);
        setShowResults(true);
    } catch (err: any) {
        console.error("Analysis Error:", err);
        setError(err.message || "Failed to analyze content. Verify your API keys and URL.");
    } finally {
        setIsAnalyzing(false);
    }
  };

  const filteredComments = results?.items?.filter((item: any) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'toxic') return ['toxic', 'spam', 'abusive', 'threat'].includes(item.moderation.label);
    if (activeTab === 'safe') return ['safe', 'normal', 'valid'].includes(item.moderation.label);
    if (activeTab === 'spam') return item.moderation.label === 'spam';
    return true;
  }) || [];

  const getActionIcon = (action: string) => {
    switch(action) {
        case 'block': return <Ban size={14} className="text-red-500" />;
        case 'hide': return <EyeOff size={14} className="text-orange-500" />;
        case 'flag': return <Flag size={14} className="text-yellow-500" />;
        case 'review': return <AlertCircle size={14} className="text-purple-500" />;
        case 'close': return <XCircle size={14} className="text-red-700" />;
        case 'lock': return <Lock size={14} className="text-purple-700" />;
        case 'comment': return <MessageSquare size={14} className="text-blue-500" />;
        default: return <ShieldCheck size={14} className="text-green-500" />;
    }
  };

  const getActionLabel = (action: string) => {
    switch(action) {
        case 'block': return 'Block';
        case 'hide': return 'Hide';
        case 'flag': return 'Flag';
        case 'review': return 'Review';
        case 'close': return 'Close';
        case 'lock': return 'Lock';
        case 'comment': return 'Comment';
        default: return 'Allow';
    }
  };

  const columns = [
    { 
      header: 'Content', 
      accessor: (c: any) => (
        <div className="max-w-md">
          <p className="font-medium text-[var(--text-primary)] line-clamp-2 italic">"{c.text}"</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] mt-2">by {c.author || 'Anonymous'} • {new Date(c.date).toLocaleTimeString()}</p>
        </div>
      )
    },
    { 
      header: 'Toxicity', 
      accessor: (c: any) => (
        <div className="flex items-center gap-3">
          <div className="w-16 h-1.5 bg-[var(--bg-surface)] rounded-full overflow-hidden border border-[var(--border-dim)]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${c.moderation.score * 100}%` }}
              className={`h-full ${c.moderation.score > 0.8 ? 'bg-red-500' : c.moderation.score > 0.4 ? 'bg-yellow-500' : 'bg-green-500'}`} 
            />
          </div>
          <span className={`text-[10px] font-black uppercase tracking-widest ${c.moderation.score > 0.8 ? 'text-red-500' : 'text-[var(--text-secondary)]'}`}>{Math.round(c.moderation.score * 100)}%</span>
        </div>
      )
    },
    { 
      header: 'AI Classification', 
      accessor: (c: any) => (
        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
          ['toxic', 'spam', 'abusive', 'threat'].includes(c.moderation.label) 
            ? 'bg-red-500/10 text-red-500 border-red-500/20' 
            : ['bug', 'feature_request', 'needs_attention'].includes(c.moderation.label)
                ? 'bg-blue-500/10 text-blue-500 border-blue-500/20'
                : 'bg-green-500/10 text-green-500 border-green-500/20'
        }`}>
          {c.moderation.label}
        </span>
      )
    },
    { 
      header: 'Suggested Action', 
      accessor: (c: any) => (
        <div className="flex items-center gap-2">
           <div className="px-4 py-1.5 rounded-xl border border-[var(--border-dim)] bg-[var(--bg-elevated)] text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
              {getActionIcon(c.moderation.action)}
              {getActionLabel(c.moderation.action)}
           </div>
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
        <h1 className="text-4xl md:text-5xl font-black font-sora text-[var(--text-primary)] tracking-tighter uppercase italic">
            Analyze <span className="text-[var(--accent-primary)]">Content</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-medium uppercase tracking-tight text-sm">Real-time neural scanning for YouTube & GitHub ecosystems.</p>
      </div>

      <GlassCard className="p-10 border-[var(--accent-primary)]/20 bg-[var(--accent-primary)]/5">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="relative flex-1 group">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] flex items-center gap-3 transition-colors group-focus-within:text-[var(--accent-primary)]">
              {platform === 'youtube' && <Youtube size={24} className="text-red-500" />}
              {platform === 'github' && <Github size={24} className="text-[var(--text-primary)]" />}
              {platform === 'unknown' && <Search size={24} />}
            </div>
            <input 
              type="text" 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube URL or GitHub Repo link..."
              className="w-full bg-[var(--bg-surface)] border border-[var(--border-dim)] rounded-[1.5rem] py-6 pl-16 pr-8 focus:outline-none focus:border-[var(--accent-primary)] transition-all text-[var(--text-primary)] text-lg font-medium"
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

        <AnimatePresence>
            {error && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 flex items-center gap-3 text-xs font-black uppercase tracking-widest"
                >
                    <AlertTriangle size={18} />
                    {error}
                </motion.div>
            )}
        </AnimatePresence>
      </GlassCard>

      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-12"
          >
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <StatCard title="Analyzed Items" value={results.summary.total} icon={<Search size={20} />} />
              <StatCard title="Toxicity Index" value={`${results.summary.total > 0 ? Math.round((results.summary.toxic / results.summary.total) * 100) : 0}%`} icon={<AlertTriangle size={20} className="text-red-400" />} className="border-red-500/20" />
              <StatCard title="Spam/Abuse" value={results.summary.spam + results.summary.abusive} icon={<ShieldAlert size={20} className="text-yellow-400" />} className="border-yellow-500/20" />
              <StatCard title="Safety Rating" value={`${results.summary.total > 0 ? Math.round((results.summary.safe / results.summary.total) * 100) : 100}/100`} icon={<ShieldCheck size={20} className="text-green-400" />} className="border-green-500/20 shadow-[0_0_20px_rgba(34,197,94,0.1)]" />
            </div>

            {/* Suggestions */}
            <div className="space-y-6">
                <h3 className="text-xs font-black uppercase tracking-[0.4em] text-[var(--accent-primary)] flex items-center gap-2">
                    <Wand2 size={14} /> Neural Agent Recommendations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {aiSuggestions.map((s, i) => (
                        <GlassCard key={i} className="p-6 border-[var(--border-dim)] bg-[var(--bg-surface)]/10 hover:border-[var(--accent-primary)]/30 transition-all cursor-pointer group">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-[var(--accent-primary)]/10 flex items-center justify-center text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                                    <s.icon size={20} />
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-tight text-[var(--text-primary)] mb-1">{s.label}</h4>
                                    <p className="text-[10px] text-[var(--text-secondary)] font-medium leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>

            {/* Table */}
            <GlassCard className="p-0 overflow-hidden border-[var(--border-dim)] bg-[var(--bg-surface)] shadow-soft">
              <div className="p-8 border-b border-[var(--border-dim)] flex flex-col md:flex-row justify-between items-center gap-6">
                <h2 className="text-2xl font-black font-sora flex items-center gap-3 uppercase italic tracking-tighter text-[var(--text-primary)]">
                   {platform === 'youtube' ? <Youtube className="text-red-500" /> : <Github className="text-[var(--text-primary)]" /> }
                   Neural <span className="text-[var(--accent-primary)]">Feedback</span>
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
