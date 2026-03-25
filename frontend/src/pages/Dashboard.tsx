import React from 'react';
import {
    ShieldAlert,
    MessageSquare,
    TrendingUp,
    Activity
} from 'lucide-react';
import StatCard from '../components/StatCard';
import GlassCard from '../components/GlassCard';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    Cell
} from 'recharts';

const data = [
    { name: 'Mon', value: 400 },
    { name: 'Tue', value: 300 },
    { name: 'Wed', value: 600 },
    { name: 'Thu', value: 800 },
    { name: 'Fri', value: 500 },
    { name: 'Sat', value: 900 },
    { name: 'Sun', value: 700 },
];

const toxicityData = [
    { name: 'Toxic', value: 240, color: '#7C3AED' },
    { name: 'Spam', value: 130, color: '#00F5FF' },
    { name: 'Safe', value: 980, color: '#10B981' },
];

const Dashboard: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-3xl font-bold font-sora text-gray-900 dark:text-white">Dashboard Overview</h2>
                    <p className="text-gray-500 dark:text-gray-300 mt-1">Real-time moderation metrics and system status.</p>
                </div>
                <div className="flex gap-3">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        System Online
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Comments"
                    value="12,482"
                    trend={12}
                    icon={MessageSquare}
                    delay={0.1}
                />
                <StatCard
                    title="Toxic Detected"
                    value="1,240"
                    trend={-5}
                    icon={ShieldAlert}
                    color="red-500"
                    delay={0.2}
                />
                <StatCard
                    title="Spam Blocked"
                    value="842"
                    trend={8}
                    icon={Activity}
                    color="yellow-500"
                    delay={0.3}
                />
                <StatCard
                    title="Safety Score"
                    value="98.2%"
                    trend={2}
                    icon={TrendingUp}
                    color="primary-glow"
                    delay={0.4}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <GlassCard className="lg:col-span-2 h-[400px] flex flex-col" delay={0.5}>
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold font-sora text-gray-900 dark:text-white">Moderation Trends</h3>
                        <select className="bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-1 text-sm focus:outline-none text-gray-900 dark:text-white">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#7C3AED" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                                <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                                    itemStyle={{ color: '#E5E7EB' }}
                                />
                                <Area type="monotone" dataKey="value" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                <GlassCard className="h-[400px] flex flex-col" delay={0.6}>
                    <h3 className="text-xl font-bold font-sora mb-6 text-gray-900 dark:text-white">Distribution</h3>
                    <div className="flex-1 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={toxicityData} layout="vertical" margin={{ left: -20, right: 20 }}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
                                <XAxis type="number" stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#111827', border: '1px solid #374151', borderRadius: '12px' }}
                                />
                                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                                    {toxicityData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
            </div>
        </div>
    );
};

export default Dashboard;
