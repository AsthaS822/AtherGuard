import React, { useState } from 'react';
import {
    ShieldAlert,
    CheckCircle2,
    XCircle,
    Flag,
    User,
    Clock,
    ExternalLink
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import GlowButton from '../components/GlowButton';
import { motion, AnimatePresence } from 'framer-motion';

const mockComments = [
    {
        id: 1,
        user: "CyberPunk77",
        text: "You are stupid",
        toxicity: 0.92,
        timestamp: "2 mins ago",
        status: "pending",
        category: "Hate Speech"
    },
    {
        id: 2,
        user: "DesignMaster",
        text: "The new UI looks absolutely stunning! Great job on the glassmorphism effects.",
        toxicity: 0.02,
        timestamp: "5 mins ago",
        status: "approved",
        category: "Safe"
    },
    {
        id: 3,
        user: "CryptoScammer",
        text: "I hate this product, it's garbage.",
        toxicity: 0.71,
        timestamp: "12 mins ago",
        status: "pending",
        category: "Hate Speech"
    },
    {
        id: 4,
        user: "HappyUser",
        text: "Great service! Really helpful for my community.",
        toxicity: 0.02,
        timestamp: "15 mins ago",
        status: "approved",
        category: "Safe"
    },
    {
        id: 5,
        user: "AngryGuest",
        text: "I can't believe how slow this is. I'm going to find where you live and let you know personally.",
        toxicity: 0.92,
        timestamp: "18 mins ago",
        status: "flagged",
        category: "Threat"
    }
];

const ModerationPanel: React.FC = () => {
    const [comments, setComments] = useState(mockComments);

    const handleAction = (id: number, newStatus: string) => {
        setComments(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    };

    const getScoreColor = (score: number) => {
        if (score > 0.8) return 'text-red-500';
        if (score > 0.5) return 'text-yellow-500';
        return 'text-green-500';
    };

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-sora text-gray-900 dark:text-white">Live Moderation Feed</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Real-time analysis of incoming content across your platforms.</p>
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
                        {comments.map((comment, index) => (
                            <motion.div
                                key={comment.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <GlassCard className={`relative overflow-hidden transition-colors duration-500 ${comment.status === 'approved' ? 'border-green-500/30' : comment.status === 'hidden' ? 'border-red-500/30 opacity-60' : comment.status === 'pending' && comment.toxicity > 0.8 ? 'border-red-500/30' : ''}`}>
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                                            <User className="text-gray-400" size={24} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between mb-2">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-lg text-gray-900 dark:text-white">{comment.user}</span>
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">• {comment.timestamp}</span>
                                                </div>
                                                <div className={`px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(comment.toxicity).replace('text-', 'bg-').replace('500', '500/10')} ${getScoreColor(comment.toxicity)} border-current/10`}>
                                                    AI Score: {(comment.toxicity * 100).toFixed(0)}%
                                                </div>
                                            </div>
                                            <p className="text-gray-300 mb-4 leading-relaxed">{comment.text}</p>

                                            <div className="flex flex-wrap items-center gap-3">
                                                {comment.status === 'pending' || comment.status === 'flagged' ? (
                                                    <>
                                                        <GlowButton
                                                            onClick={() => handleAction(comment.id, 'approved')}
                                                            className="px-4 py-1.5 text-xs bg-green-600 shadow-[0_0_15px_rgba(22,163,74,0.3)] hover:shadow-[0_0_20px_rgba(22,163,74,0.5)]"
                                                        >
                                                            <CheckCircle2 size={14} /> Approve
                                                        </GlowButton>
                                                        <GlowButton
                                                            onClick={() => handleAction(comment.id, 'hidden')}
                                                            className="px-4 py-1.5 text-xs bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                                                        >
                                                            <XCircle size={14} /> Hide
                                                        </GlowButton>
                                                        <button className="px-4 py-1.5 text-xs rounded-xl border border-white/10 hover:bg-white/5 flex items-center gap-2 transition-all">
                                                            <Flag size={14} /> Flag
                                                        </button>
                                                    </>
                                                ) : (
                                                    <div className={`flex items-center gap-2 text-sm font-medium ${comment.status === 'approved' ? 'text-green-400' : 'text-red-400'}`}>
                                                        {comment.status === 'approved' ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                                                        Action: {comment.status.charAt(0).toUpperCase() + comment.status.slice(1)}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <div className="space-y-6">
                    <GlassCard>
                        <h3 className="text-xl font-bold font-sora mb-4">AI Insight</h3>
                        <div className="space-y-4">
                            <div className="p-4 rounded-xl bg-primary-accent/10 border border-primary-accent/20">
                                <div className="flex items-center gap-3 mb-2">
                                    <ShieldAlert className="text-primary-accent" size={20} />
                                    <span className="font-bold text-gray-900 dark:text-white">Active Shielding</span>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-300">Moderating comments with &gt;85% confidence score automatically.</p>
                            </div>

                            <div className="space-y-3 pt-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Total Analyzed</span>
                                    <span className="font-bold">4,281</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div className="bg-primary-glow h-full w-[70%]" />
                                </div>

                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Auto-Removals</span>
                                    <span className="font-bold">152</span>
                                </div>
                                <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                                    <div className="bg-red-500 h-full w-[20%]" />
                                </div>
                            </div>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-gradient-to-br from-primary-accent/20 to-transparent">
                        <h3 className="text-xl font-bold font-sora mb-2 text-white">Need Help?</h3>
                        <p className="text-sm text-gray-100 dark:text-gray-200 mb-4 opacity-80">Our AI learns from your manual overrides. Each "Approve" or "Hide" makes the system smarter.</p>
                        <GlowButton variant="primary" className="w-full py-2">Read Documentation</GlowButton>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default ModerationPanel;
