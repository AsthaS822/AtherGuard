import { useState } from 'react';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { Plus, X, Shield, Ban, Ghost, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CustomFilters = () => {
  const [bannedWords, setBannedWords] = useState(['crypto', 'free', 'giveaway', 'hack', 'dm me']);
  const [inputValue, setInputValue] = useState('');
  const [isStrict, setIsStrict] = useState(true);
  const [selectedLang, setSelectedLang] = useState('English (Global)');

  const addWord = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue && !bannedWords.includes(inputValue)) {
      setBannedWords([...bannedWords, inputValue]);
      setInputValue('');
    }
  };

  const removeWord = (word: string) => {
    setBannedWords(bannedWords.filter(w => w !== word));
  };

  return (
    <div className="space-y-10 max-w-5xl">
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl md:text-5xl font-black font-sora text-[var(--text-primary)] tracking-tighter uppercase italic">
            Neural <span className="text-[var(--accent-primary)]">Filters</span>
        </h1>
        <p className="text-[var(--text-secondary)] font-medium uppercase tracking-tight text-sm">Block specific words and set your moderation rules.</p>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Strict Mode Toggle */}
        <GlassCard className={`lg:col-span-3 p-8 border-2 transition-all duration-500 bg-[var(--bg-surface)] ${isStrict ? 'border-[var(--accent-primary)] shadow-glow bg-[var(--accent-primary)]/5' : 'border-[var(--border-dim)]'}`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${isStrict ? 'bg-[var(--accent-primary)] text-white shadow-glow' : 'bg-[var(--bg-elevated)] text-[var(--text-secondary)] border border-[var(--border-dim)]'}`}>
                        <Shield size={32} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black font-sora uppercase tracking-tight text-[var(--text-primary)]">Strict Shielding</h3>
                        <p className="text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-1">Automatically block all suspicious content without manual review.</p>
                    </div>
                </div>
                <div 
                    className={`w-20 h-10 rounded-full p-2 cursor-pointer transition-colors relative ${isStrict ? 'bg-[var(--accent-primary)]' : 'bg-[var(--bg-elevated)]'}`}
                    onClick={() => setIsStrict(!isStrict)}
                >
                    <motion.div 
                        animate={{ x: isStrict ? 40 : 0 }}
                        className="w-6 h-6 bg-white rounded-full shadow-lg" 
                    />
                </div>
            </div>
        </GlassCard>


        {/* Banned Words Management */}
        <GlassCard className="lg:col-span-2 p-10 space-y-8 bg-[var(--bg-surface)] border-[var(--border-dim)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <Ban size={24} />
            </div>
            <div>
              <h3 className="text-xl font-black font-sora uppercase tracking-tight text-[var(--text-primary)]">Banned Keywords</h3>
              <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest">Words that will always be flaged by the system.</p>
            </div>
          </div>

          <form onSubmit={addWord} className="flex gap-4">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Add banned pattern (e.g. 'scam')"
              className="flex-1 bg-[var(--bg-main)] border border-[var(--border-dim)] rounded-2xl py-4 px-6 focus:outline-none focus:border-red-500 text-[var(--text-primary)] font-medium"
            />
            <GlowButton type="submit" className="px-8 rounded-2xl bg-red-500 hover:bg-red-600 flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_20px_rgba(239,68,68,0.2)]">
              <Plus size={20} /> Inject
            </GlowButton>

          </form>

          <div className="flex flex-wrap gap-3">
            <AnimatePresence>
              {bannedWords.map((word) => (
                <motion.span 
                  key={word}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 group hover:border-red-500 transition-all"
                >
                  {word}
                  <X 
                    size={14} 
                    className="cursor-pointer hover:text-white transition-colors" 
                    onClick={() => removeWord(word)}
                  />
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </GlassCard>

        {/* Language Filters */}
        <GlassCard className="p-10 space-y-8 bg-[var(--bg-surface)] border-[var(--border-dim)]">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[var(--accent-glow)]/10 flex items-center justify-center text-[var(--accent-glow)]">
                <Languages size={24} />
                </div>
                <div>
                 <h3 className="text-xl font-black font-sora uppercase tracking-tight text-[var(--text-primary)]">Language</h3>
                 <p className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest">Select which languages to monitor.</p>
                </div>
            </div>

            <div className="space-y-4">
                {['English (Global)', 'Hindi (Beta)', 'Mixed Hinglish'].map((lang, i) => (
                    <div 
                      key={i} 
                      onClick={() => setSelectedLang(lang)}
                      className={`flex items-center justify-between p-4 rounded-2xl bg-[var(--bg-main)] border cursor-pointer hover:border-[var(--accent-primary)] transition-all group shadow-soft ${selectedLang === lang ? 'border-[var(--accent-primary)] bg-[var(--accent-primary)]/5' : 'border-[var(--border-dim)]'}`}
                    >
                        <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">{lang}</span>
                        <div className={`w-4 h-4 rounded-full border-2 border-[var(--accent-primary)] flex items-center justify-center`}>
                            {selectedLang === lang && <div className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-glow" /> }
                        </div>
                    </div>
                ))}
            </div>

            <div className="pt-4 flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-[var(--text-secondary)] italic">
                <Ghost size={14} className="text-[var(--accent-primary)]" /> 24/7 Deep Learning Enabled
            </div>

        </GlassCard>
      </div>
    </div>
  );
};

export default CustomFilters;
