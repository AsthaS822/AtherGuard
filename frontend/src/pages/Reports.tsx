import { useState, useEffect } from 'react';
import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';
import GlowButton from '../components/ui/GlowButton';
import { BarChart3, TrendingUp, Download, Calendar, ShieldAlert } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { useTheme } from '../hooks/useTheme';
import { db, auth } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Reports = () => {
  const { theme } = useTheme();
  const [scans, setScans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, "users", user.uid, "scans"),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        timestamp: doc.data().timestamp?.toDate() || new Date()
      }));
      setScans(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  // BI Calculations
  const totalScanned = scans.reduce((acc, s) => acc + (s.totalScannedItems || 0), 0);
  const toxicCount = scans.reduce((acc, s) => acc + (s.toxicCount || 0), 0);
  const safeCount = scans.reduce((acc, s) => acc + (s.safeCount || 0), 0);
  
  const toxicityRate = totalScanned ? (toxicCount / totalScanned) * 100 : 0;
  const safetyRate = totalScanned ? (safeCount / totalScanned) * 100 : 100;

  // Chart Data Generation (Weekly Trend)
  const groupedByDay: any = {};
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toLocaleDateString('en-US', { weekday: 'short' });
  }).reverse();

  last7Days.forEach(day => {
    groupedByDay[day] = { name: day, toxic: 0, safe: 0 };
  });

  scans.forEach(scan => {
    const day = scan.timestamp.toLocaleDateString('en-US', { weekday: 'short' });
    if (groupedByDay[day]) {
      groupedByDay[day].toxic += scan.toxicCount || 0;
      groupedByDay[day].safe += scan.safeCount || 0;
    }
  });

  const trendData = Object.values(groupedByDay);

  // Platform Comparison
  const ytScans = scans.filter(s => s.platform === 'youtube');
  const ghScans = scans.filter(s => s.platform === 'github');

  const getPlatformStats = (platformScans: any[]) => {
    const total = platformScans.reduce((acc, s) => acc + (s.totalScannedItems || 0), 0);
    const toxic = platformScans.reduce((acc, s) => acc + (s.toxicCount || 0), 0);
    const safe = platformScans.reduce((acc, s) => acc + (s.safeCount || 0), 0);
    return {
      toxic: total ? Math.round((toxic / total) * 100) : 0,
      clean: total ? Math.round((safe / total) * 100) : 100
    };
  };

  const platformData = [
    { name: 'YouTube', ...getPlatformStats(ytScans) },
    { name: 'GitHub', ...getPlatformStats(ghScans) }
  ];

  const chartColors = {
    toxic: '#7C3AED',
    spam: '#00F5FF',
    clean: '#10B981',
    grid: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    text: theme === 'dark' ? '#94A3B8' : '#64748B',
    tooltipBg: theme === 'dark' ? 'rgba(11, 15, 25, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    tooltipBorder: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  if (loading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 mx-auto p-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black font-sora text-[var(--text-primary)] uppercase tracking-tighter italic">Reports & <span className="text-[var(--accent-primary)] underline decoration-[var(--accent-primary)]/20">Analytics</span></h1>
          <p className="text-[var(--text-secondary)] font-medium uppercase tracking-tight text-sm">Deep dive into your content moderation performance and trends.</p>
        </div>

        <div className="flex items-center gap-2">
          <GlowButton variant="secondary" className="flex items-center gap-2">
            <Calendar size={18} />
            <span>Last 7 Days</span>
          </GlowButton>
          <GlowButton className="flex items-center gap-2">
            <Download size={18} />
            <span>Export PDF</span>
          </GlowButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Safety Rate" value={`${safetyRate.toFixed(1)}%`} icon={<TrendingUp size={20} />} trend={{ value: 2.1, isUp: true }} />
        <StatCard title="Total Content Scanned" value={totalScanned.toLocaleString()} icon={<BarChart3 size={20} />} trend={{ value: 12, isUp: true }} />
        <StatCard title="Flagged Toxicity" value={toxicCount.toLocaleString()} icon={<ShieldAlert size={20} />} trend={{ value: toxicityRate.toFixed(1), isUp: false }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="h-[400px] flex flex-col p-8 bg-[var(--bg-surface)] border-[var(--border-dim)]">
            <h3 className="text-lg font-black font-sora mb-10 text-[var(--text-primary)] uppercase tracking-tight">Toxicity Trends (7D)</h3>

            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <defs>
                    <linearGradient id="colorToxic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.toxic} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={chartColors.toxic} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                  <XAxis dataKey="name" stroke={chartColors.text} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={chartColors.text} fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: chartColors.tooltipBg, 
                      borderColor: chartColors.tooltipBorder, 
                      borderRadius: '12px',
                      border: '1px solid'
                    }}
                    itemStyle={{ fontSize: '12px', color: theme === 'dark' ? '#fff' : '#000' }}
                  />
                  <Area type="monotone" dataKey="toxic" name="Toxic Count" stroke={chartColors.toxic} fillOpacity={1} fill="url(#colorToxic)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
        </GlassCard>

        <GlassCard className="h-[400px] flex flex-col p-8 bg-[var(--bg-surface)] border-[var(--border-dim)]">
            <h3 className="text-lg font-black font-sora mb-10 text-[var(--text-primary)] uppercase tracking-tight">Platform Contrast</h3>

            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={platformData}>
                  <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} vertical={false} />
                  <XAxis dataKey="name" stroke={chartColors.text} fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke={chartColors.text} fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: chartColors.tooltipBg, 
                      borderColor: chartColors.tooltipBorder, 
                      borderRadius: '12px',
                      border: '1px solid'
                    }}
                    itemStyle={{ fontSize: '12px', color: theme === 'dark' ? '#fff' : '#000' }}
                    formatter={(value) => [`${value}%`]}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="clean" name="Safe %" fill={chartColors.clean} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="toxic" name="Toxic %" fill={chartColors.toxic} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default Reports;
