import React from 'react';
import { ShieldAlert, UserPlus, Info, Trash2, CheckCircle } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';

const notifications = [
    {
        id: 1,
        type: 'alert',
        title: 'Highly Toxic Content Detected',
        message: 'A comment from "User123" was automatically hidden due to severe policy violations.',
        time: '2 mins ago',
        icon: ShieldAlert,
        color: 'text-red-500',
        unread: true
    },
    {
        id: 2,
        type: 'info',
        title: 'Model Update Complete',
        message: 'Toxicity detection model v2.4 has been successfully deployed to all endpoints.',
        time: '45 mins ago',
        icon: Info,
        color: 'text-primary-glow',
        unread: true
    },
    {
        id: 3,
        type: 'user',
        title: 'New Admin Invited',
        message: 'Sarah Chen has been invited to join the moderation team.',
        time: '3 hours ago',
        icon: UserPlus,
        color: 'text-primary-accent',
        unread: false
    },
    {
        id: 4,
        type: 'success',
        title: 'Weekly Report Ready',
        message: 'Your system safety audit for Feb 24 - Mar 2 is now available for review.',
        time: 'Yesterday',
        icon: CheckCircle,
        color: 'text-green-500',
        unread: false
    }
];

const Notifications: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-3xl font-bold font-sora text-gray-900 dark:text-white">Notifications</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Stay updated with system alerts and moderation events.</p>
                </div>
                <button className="text-sm font-medium text-primary-glow hover:underline">Mark all as read</button>
            </div>

            <div className="space-y-4">
                {notifications.map((notif, index) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard className={`flex items-start gap-4 p-5 ${notif.unread ? 'border-primary-glow/30 bg-primary-glow/5' : ''}`}>
                            <div className={`p-3 rounded-xl bg-white/5 border border-white/10 ${notif.color} shrink-0`}>
                                <notif.icon size={24} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1">
                                    <h4 className={`font-bold text-lg ${notif.unread ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'}`}>
                                        {notif.title}
                                    </h4>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">{notif.time}</span>
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-3">
                                    {notif.message}
                                </p>
                                <div className="flex items-center gap-4">
                                    <button className="text-xs font-bold text-gray-500 hover:text-white transition-colors">Dismiss</button>
                                    <button className="text-xs font-bold text-primary-glow hover:underline">View Details</button>
                                </div>
                            </div>
                            {notif.unread && (
                                <div className="w-2 h-2 rounded-full bg-primary-glow shadow-[0_0_10px_rgba(0,245,255,0.8)] mt-2" />
                            )}
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-center pt-4">
                <button className="flex items-center gap-2 px-6 py-2 rounded-xl border border-white/10 text-gray-400 hover:bg-white/5 transition-all text-sm group">
                    <Trash2 size={16} className="group-hover:text-red-400 transition-colors" /> Clear All Notification History
                </button>
            </div>
        </div>
    );
};

export default Notifications;
