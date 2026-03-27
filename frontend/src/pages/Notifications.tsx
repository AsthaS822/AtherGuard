import GlassCard from '../components/ui/GlassCard';
import { Info, AlertTriangle, Zap, CheckCircle } from 'lucide-react';


import { useAnalytics } from '../hooks/useAnalytics';

const Notifications = () => {
  const { stats, recentLogs } = useAnalytics();
  const notificationsData = [];

  const totalScanned = stats?.totalScanned || 0;
  const toxicCount = stats?.toxicCount || 0;

  if (totalScanned > 0) {
      notificationsData.push({
          id: 1,
          type: 'success',
          title: 'System Active',
          message: `Your system has successfully processed ${totalScanned} items so far.`,
          time: 'Just now',
          unread: false,
          icon: <CheckCircle size={18} className="text-green-400" />
      });
  }

  if (toxicCount > 0) {
      notificationsData.push({
          id: 2,
          type: 'alert',
          title: 'Toxicity Detected',
          message: `AetherGuard intercepted ${toxicCount} hostile or toxic items across your integrations.`,
          time: 'Recently',
          unread: true,
          icon: <AlertTriangle size={18} className="text-red-400" />
      });
  }

  if (recentLogs?.length > 0) {
      notificationsData.push({
        id: 3,
        type: 'info',
        title: 'New API Sync',
        message: `Logs updated from ${recentLogs[0].platform} analysis seamlessly.`,
        time: 'Just now',
        unread: true,
        icon: <Zap size={18} className="text-[var(--accent-glow)]" />
      });
  }

  if (notificationsData.length === 0) {
      notificationsData.push({
          id: 0,
          type: 'info',
          title: 'System Standby',
          message: 'Connect a streaming resource via the Analyze tab to begin receiving intelligent alerts.',
          time: '',
          unread: false,
          icon: <Info size={18} className="text-gray-400" />
      });
  }
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-black font-sora text-[var(--text-primary)] uppercase tracking-tighter italic">Notifications</h1>
          <p className="text-[var(--text-secondary)] font-medium uppercase tracking-tight text-sm">Stay updated on moderation events and system activity.</p>
        </div>
        <button className="text-[var(--accent-primary)] text-[10px] font-black uppercase tracking-widest hover:underline decoration-[var(--accent-primary)]/30">MARK ALL AS READ</button>
      </div>


      <div className="space-y-4">
        {notificationsData.map((notif) => (
          <GlassCard 
            key={notif.id} 
            className={`p-6 border-l-4 transition-all hover:translate-x-1 bg-[var(--bg-surface)] border-[var(--border-dim)] shadow-soft ${
              notif.unread ? 'border-l-[var(--accent-primary)]' : 'border-l-[var(--text-secondary)]/30'
            }`}
          >

            <div className="flex gap-4">
              <div className={`p-3 rounded-xl ${notif.unread ? 'bg-[var(--accent-primary)]/10 shadow-glow' : 'bg-[var(--bg-elevated)] border border-[var(--border-dim)]'}`}>
                {notif.icon}
              </div>

              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-black uppercase tracking-tight text-[var(--text-primary)] flex items-center gap-2">
                    {notif.title}
                    {notif.unread && <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] shadow-glow"></span>}
                  </h3>
                  <span className="text-[10px] text-[var(--text-secondary)] font-black uppercase tracking-widest">{notif.time}</span>
                </div>
                <p className="text-[var(--text-secondary)] text-sm font-medium leading-relaxed">{notif.message}</p>

              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-sm text-[var(--text-secondary)] font-medium italic opacity-50 uppercase tracking-tighter">That's all for now. You're all caught up!</p>
      </div>

    </div>
  );
};

export default Notifications;
