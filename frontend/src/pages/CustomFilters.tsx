import React, { useState } from 'react';
import { Plus, X, Shield, ShieldOff, AlertTriangle, Search } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { motion, AnimatePresence } from 'framer-motion';

const CustomFilters: React.FC = () => {
    const [words, setWords] = useState(['hate', 'toxic', 'spam', 'aggressive', 'violent']);
    const [newWord, setNewWord] = useState('');
    const [strictMode, setStrictMode] = useState(true);

    const addWord = () => {
        if (newWord.trim() && !words.includes(newWord.trim().toLowerCase())) {
            setWords([...words, newWord.trim().toLowerCase()]);
            setNewWord('');
        }
    };

    const removeWord = (word: string) => {
        setWords(words.filter(w => w !== word));
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-sora text-gray-900 dark:text-white">Custom Word Filters</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Define specific keywords and phrases for the AI to prioritize.</p>
                </div>
                <div className="flex items-center gap-4 bg-white/5 p-1 rounded-2xl border border-white/10">
                    <button
                        onClick={() => setStrictMode(false)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${!strictMode ? 'bg-white/10 text-white shadow-lg' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        <ShieldOff size={16} /> Standard
                    </button>
                    <button
                        onClick={() => setStrictMode(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${strictMode ? 'bg-primary-accent text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        <Shield size={16} /> Strict Mode
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <GlassCard>
                        <div className="flex items-center gap-4 mb-8">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                <input
                                    type="text"
                                    value={newWord}
                                    onChange={(e) => setNewWord(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addWord()}
                                    placeholder="Add a new forbidden word..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-primary-glow/50 focus:bg-white/10 transition-all"
                                />
                            </div>
                            <GlowButton onClick={addWord} variant="cyan" className="py-3 px-8">
                                <Plus size={20} /> Add Word
                            </GlowButton>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            <AnimatePresence>
                                {words.map((word) => (
                                    <motion.div
                                        key={word}
                                        initial={{ scale: 0.8, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        exit={{ scale: 0.8, opacity: 0 }}
                                        className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl group hover:border-red-500/50 hover:bg-red-500/5 transition-all"
                                    >
                                        <span className="font-medium">{word}</span>
                                        <button
                                            onClick={() => removeWord(word)}
                                            className="text-gray-500 hover:text-red-500 transition-colors"
                                        >
                                            <X size={14} />
                                        </button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                            {words.length === 0 && (
                                <div className="w-full py-12 text-center text-gray-500">
                                    <p>No custom words added yet. Start by typing a word above.</p>
                                </div>
                            )}
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-yellow-500/5 border-yellow-500/20">
                        <div className="flex gap-4">
                            <div className="p-3 rounded-full bg-yellow-500/20 text-yellow-500 shrink-0 h-fit">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold font-sora mb-1 text-yellow-500">Caution: Over-filtering</h4>
                                <p className="text-sm text-gray-400 leading-relaxed">
                                    Adding too many common words can lead to higher false-positive rates. Use specific terms that are consistently harmful in your community context.
                                </p>
                            </div>
                        </div>
                    </GlassCard>
                </div>

                <div className="space-y-6">
                    <GlassCard>
                        <h3 className="text-xl font-bold font-sora mb-4 text-gray-900 dark:text-white">Filter Stats</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center p-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                <span className="text-sm text-gray-500 dark:text-gray-300">Total Banned Words</span>
                                <span className="text-xl font-bold text-gray-900 dark:text-white">{words.length}</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-sm text-gray-400">Matches Today</span>
                                <span className="text-xl font-bold text-red-400">142</span>
                            </div>
                            <div className="flex justify-between items-center p-3 rounded-xl bg-white/5 border border-white/10">
                                <span className="text-sm text-gray-400">Auto-Delete</span>
                                <span className="text-sm font-bold text-green-400">ENABLED</span>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-primary-glow/5 border-primary-glow/20">
                        <h3 className="text-xl font-bold font-sora mb-2 text-primary-glow">AI Context</h3>
                        <p className="text-sm text-gray-400 mb-4">
                            Our AI doesn't just look for words, it looks for <strong>intent</strong>. Even if a word isn't in your list, the AI will still detect harmful sentiment.
                        </p>
                        <GlowButton variant="outline" className="w-full">How it works</GlowButton>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default CustomFilters;
