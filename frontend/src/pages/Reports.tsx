import GlassCard from '../components/ui/GlassCard';
import StatCard from '../components/ui/StatCard';
import GlowButton from '../components/ui/GlowButton';
import { BarChart3, TrendingUp, Download, Calendar, ShieldAlert } from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from 'recharts';
import { useTheme } from '../hooks/useTheme';


const mockTrendData = [
  { name: 'Mon', toxic: 40, spam: 24 },
  { name: 'Tue', toxic: 30, spam: 13 },
  { name: 'Wed', toxic: 20, spam: 98 },
  { name: 'Thu', toxic: 27, spam: 39 },
  { name: 'Fri', toxic: 18, spam: 48 },
  { name: 'Sat', toxic: 23, spam: 38 },
  { name: 'Sun', toxic: 34, spam: 43 },
];

const mockPlatformData = [
  { name: 'YouTube', clean: 85, toxic: 15 },
  { name: 'GitHub', clean: 95, toxic: 5 },
];

const Reports = () => {
  const { theme } = useTheme();

  const chartColors = {
    toxic: '#7C3AED',
    spam: '#00F5FF',
    clean: '#10B981',
    grid: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
    text: theme === 'dark' ? '#94A3B8' : '#64748B',
    tooltipBg: theme === 'dark' ? 'rgba(11, 15, 25, 0.9)' : 'rgba(255, 255, 255, 0.9)',
    tooltipBorder: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
  };

  return (

    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-sora text-text-primary">Reports & Analytics</h1>
          <p className="text-text-secondary">Deep dive into your content moderation performance and trends.</p>
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
        <StatCard title="Moderation Efficiency" value="98.2%" icon={<TrendingUp size={20} />} trend={{ value: 2.1, isUp: true }} />
        <StatCard title="Avg. Detection Time" value="140ms" icon={<BarChart3 size={20} />} trend={{ value: 12, isUp: false }} />
        <StatCard title="False Positive Rate" value="0.8%" icon={<ShieldAlert size={20} />} trend={{ value: 0.1, isUp: true }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="h-[400px] flex flex-col">
            <h3 className="text-lg font-bold font-sora mb-6 text-text-primary">Toxicity & Spam Trends</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTrendData}>
                  <defs>
                    <linearGradient id="colorToxic" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.toxic} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={chartColors.toxic} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSpam" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chartColors.spam} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={chartColors.spam} stopOpacity={0}/>
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
                  <Area type="monotone" dataKey="toxic" stroke={chartColors.toxic} fillOpacity={1} fill="url(#colorToxic)" />
                  <Area type="monotone" dataKey="spam" stroke={chartColors.spam} fillOpacity={1} fill="url(#colorSpam)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

        </GlassCard>

        <GlassCard className="h-[400px] flex flex-col">
            <h3 className="text-lg font-bold font-sora mb-6 text-text-primary">Platform Comparison</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPlatformData}>
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
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="clean" name="Safe %" fill={chartColors.spam} radius={[4, 4, 0, 0]} />
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
