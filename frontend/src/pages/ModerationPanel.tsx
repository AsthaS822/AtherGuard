import React, { useState, useEffect } from 'react';
import {
    ShieldAlert,
    CheckCircle2,
    XCircle,
    Flag,
    User,
    Clock,
    ExternalLink
} from 'lucide-react';
import GlassCard from '../components/ui/GlassCard';
import GlowButton from '../components/ui/GlowButton';
import { motion, AnimatePresence } from 'framer-motion';
import { callAPIGet } from '../services/api';

const ModerationPanel: React.FC = () => {
    const [comments, setComments] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await callAPIGet("/analyze/logs");
                // The API now returns the array directly
                setComments(data || []);
            } catch (err) {
                console.error("Failed to fetch logs:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const getColor = (label: string) => {
        switch(label) {
            case "toxic": return "border-red-500 bg-red-500/10 text-red-500";
            case "threat": return "border-red-700 bg-red-700/20 text-red-700";
            case "spam": return "border-yellow-500 bg-yellow-500/10 text-yellow-500";
            case "abusive": return "border-orange-500 bg-orange-500/10 text-orange-500";
            case "suspicious": return "border-purple-500 bg-purple-500/10 text-purple-500";
            case "bug": return "border-red-400 bg-red-400/10 text-red-400";
            case "feature_request": return "border-blue-400 bg-blue-400/10 text-blue-400";
            case "needs_attention": return "border-purple-400 bg-purple-400/10 text-purple-400";
            case "low_quality": return "border-gray-400 bg-gray-400/10 text-gray-400";
            default: return "border-green-500 bg-green-500/10 text-green-500";
        }
    };

    const getActionUI = (action: string) => {
        switch(action) {
            case "block": return "🔴 Block";
            case "hide": return "🟠 Hide";
            case "flag": return "🚩 Flag";
            case "review": return "🟣 Review";
            case "close": return "🔒 Close";
            case "label": return "🏷️ Label";
            case "prioritize": return "⚡ Prioritize";
            case "lock": return "🔐 Lock";
            case "comment": return "💬 Comment";
            default: return "🟢 Allow";
        }
    };

    if (loading) {
        return (
            <div className="h-full w-full flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-black font-sora text-[var(--text-primary)] uppercase tracking-tighter italic">Live Moderation <span className="text-[var(--accent-primary)] underline decoration-[var(--accent-primary)]/20">Feed</span></h2>
                    <p className="text-[var(--text-secondary)] font-medium uppercase tracking-tight text-sm mt-1">Real-time analysis of incoming content across your platforms.</p>
                </div>

                <div className="flex gap-3">
                    <GlowButton variant="outline" className="text-sm">
                        <Clock size={16} /> History
                    </GlowButton>
                    <GlowButton variant="cyan" className="text-sm">
                        <ExternalLink size={16} /> Export Logs
                    </GlowButton>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {comments.length > 0 ? comments.map((comment, index) => (
                            <motion.div
                                key={`${comment.id || index}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <GlassCard className={`relative overflow-hidden transition-colors duration-500 border-[var(--border-dim)] bg-[var(--bg-surface)] ${getColor(comment.moderation?.label || 'safe').split(' ')[0]} border-opacity-30`}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-dim)] flex items-center justify-center shrink-0 shadow-soft">
                                            <User className="text-[var(--text-secondary)]" size={24} />
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-black uppercase tracking-tight text-lg text-[var(--text-primary)]">{comment.author || 'Anonymous'}</span>
                                                    <span className="text-[10px] font-black uppercase text-[var(--text-secondary)]">• {new Date(comment.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                                                </div>

                                                <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${getColor(comment.moderation?.label || 'safe')}`}>
                                                    {comment.moderation?.label || 'Safe'} • {((comment.moderation?.score || 0) * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                            <p className="text-[var(--text-primary)] font-medium mb-4 leading-relaxed line-clamp-3 italic">"{comment.text}"</p>

                                            <div className="flex flex-wrap items-center gap-3">
                                                <div className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border border-[var(--border-dim)] text-[10px] font-black uppercase tracking-widest bg-[var(--bg-elevated)]`}>
                                                    Action: {getActionUI(comment.moderation?.action || 'allow')}
                                                </div>
                                                
                                                {comment.moderation?.label !== 'safe' && (
                                                   <GlowButton className="px-4 py-1.5 text-[10px] bg-[var(--accent-primary)]/20 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30">
                                                      Override
                                                   </GlowButton>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        )) : (
                            <div className="text-center py-20 text-[var(--text-secondary)] font-bold uppercase tracking-widest text-xs opacity-50">
                                No moderation logs available. Run a scan to begin.
                            </div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-6">
                    <GlassCard className="border-[var(--border-dim)] bg-[var(--bg-surface)]">
                        <h3 className="text-xl font-bold font-sora mb-4 text-[var(--text-primary)]">AI Insight</h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--border-dim)] shadow-soft group hover:border-[var(--accent-primary)]/50 transition-all cursor-pointer">
                                <div className="flex items-center gap-3 mb-2">
                                    <ShieldAlert className="text-[var(--accent-primary)] group-hover:scale-110 transition-transform" size={20} />
                                    <span className="font-black uppercase tracking-tight text-[var(--text-primary)]">Active Shielding</span>
                                </div>
                                <p className="text-xs font-medium text-[var(--text-secondary)]">Moderating comments with prioritized labels and action engines for YouTube & GitHub.</p>
                            </div>

                             <div className="space-y-4 pt-4 border-t border-[var(--border-dim)]">
                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">Neural Accuracy</span>
                                    <span className="font-black text-[var(--text-primary)]">99.2%</span>
                                </div>
                                <div className="w-full bg-[var(--bg-main)] h-2 rounded-full overflow-hidden border border-[var(--border-dim)]">
                                    <div className="bg-[var(--accent-primary)] h-full w-[99%] shadow-glow" />
                                </div>

                                <div className="flex justify-between items-end">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-secondary)]">System Load</span>
                                    <span className="font-black text-[var(--text-primary)]">Low</span>
                                </div>
                                <div className="w-full bg-[var(--bg-main)] h-2 rounded-full overflow-hidden border border-[var(--border-dim)]">
                                    <div className="bg-green-500 h-full w-[15%] shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-[var(--accent-primary)]/10 border-[var(--border-dim)]">
                        <h3 className="text-xl font-bold font-sora mb-2 text-[var(--text-primary)]">Neural Engine</h3>
                        <p className="text-sm text-[var(--text-secondary)] mb-4 opacity-80">Our AI identifies platform-specific issues like GitHub bugs or YouTube spam and suggests actions instantly.</p>
                        <GlowButton variant="primary" className="w-full py-2">System Status</GlowButton>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default ModerationPanel;
