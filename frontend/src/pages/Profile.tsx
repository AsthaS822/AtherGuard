import React from 'react';
import { User, Mail, Shield, Settings, Activity, Clock, LogOut } from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { motion } from 'framer-motion';

const profileStats = [
    { label: 'Total Actions', value: '1,284', icon: Activity, color: 'text-primary-glow' },
    { label: 'Security Level', value: 'Admin', icon: Shield, color: 'text-primary-accent' },
    { label: 'Time Online', value: '142h', icon: Clock, color: 'text-green-500' },
];

const activityLogs = [
    { action: 'Updated filter list', target: 'Spam keywords', time: '2h ago' },
    { action: 'Approved comment', target: 'user_4291', time: '4h ago' },
    { action: 'Changed system mode', target: 'Strict Mode', time: 'Yesterday' },
    { action: 'Logged in', target: 'Main Console', time: 'Yesterday' },
];

const Profile: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="relative group">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-2xl ring-4 ring-white/10 group-hover:ring-primary-accent/50 transition-all duration-500">
                        AD
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-primary-accent rounded-full text-white shadow-lg border-2 border-background-dark hover:scale-110 transition-all">
                        <Settings size={16} />
                    </button>
                </div>
                <div className="text-center md:text-left">
                    <h2 className="text-3xl font-bold font-sora text-gray-900 dark:text-white">Admin User</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center justify-center md:justify-start gap-2">
                        <Mail size={16} /> admin@aetherguard.ai
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 justify-center md:justify-start">
                        <span className="px-3 py-1 rounded-full bg-primary-accent/10 border border-primary-accent/20 text-primary-accent text-xs font-bold uppercase tracking-wider">Super Admin</span>
                        <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-wider">Verified</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {profileStats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <GlassCard className="flex flex-col items-center justify-center text-center p-8 border-none bg-gradient-to-b from-white/10 to-transparent dark:from-white/5">
                            <stat.icon className={`${stat.color} mb-4`} size={32} />
                            <span className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">{stat.label}</span>
                        </GlassCard>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-6">
                    <GlassCard>
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold font-sora text-gray-900 dark:text-white">Recent Activity</h3>
                            <button className="text-sm text-primary-accent hover:underline">View all history</button>
                        </div>
                        <div className="space-y-4">
                            {activityLogs.map((log, index) => (
                                <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-primary-accent/30 transition-all duration-300">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary-accent/10 flex items-center justify-center text-primary-accent">
                                            <Activity size={18} />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white">{log.action}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">{log.target}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-400">{log.time}</span>
                                </div>
                            ))}
                        </div>
                    </GlassCard>
                </div>

                <div className="space-y-6">
                    <GlassCard>
                        <h3 className="text-xl font-bold font-sora mb-6 text-gray-900 dark:text-white">Account Settings</h3>
                        <div className="space-y-3">
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-all">
                                <span className="flex items-center gap-3"><User size={18} /> Edit Profile</span>
                                <Clock size={14} className="opacity-50" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-gray-600 dark:text-gray-300 transition-all">
                                <span className="flex items-center gap-3"><Shield size={18} /> Privacy & Security</span>
                                <Clock size={14} className="opacity-50" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 text-red-500 transition-all mt-4">
                                <span className="flex items-center gap-3 font-bold"><LogOut size={18} /> Sign Out</span>
                            </button>
                        </div>
                    </GlassCard>

                    <GlassCard className="bg-primary-accent/10 border-primary-accent/20">
                        <h3 className="text-lg font-bold font-sora mb-2 text-primary-accent">Pro Tip</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                            You can customize your dashboard layout and theme preferences in the system settings.
                        </p>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};

export default Profile;
