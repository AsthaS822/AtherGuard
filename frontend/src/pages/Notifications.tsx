import GlassCard from '../components/ui/GlassCard';import { Bell, Info, AlertTriangle, Zap, CheckCircle } from 'lucide-react';

const notificationsData = [
  {
    id: 1,
    type: 'alert',
    title: 'Toxic Spike Detected',
    message: 'YouTube moderation panel detects 25% toxicity spike in "Future of AI 2024" video.',
    time: '5 mins ago',
    unread: true,
    icon: <AlertTriangle size={18} className="text-red-400" />
  },
  {
    id: 2,
    type: 'info',
    title: 'AI Update Ready',
    message: 'A new moderation model (v2.4) is available with improved Hindi slang detection.',
    time: '2 hours ago',
    unread: true,
    icon: <Zap size={18} className="text-primary-glow" />
  },
  {
    id: 3,
    type: 'success',
    title: 'Weekly Report Ready',
    message: 'Your moderation summary for the week of March 19th is now available.',
    time: '1 day ago',
    unread: false,
    icon: <CheckCircle size={18} className="text-green-400" />
  },
  {
    id: 4,
    type: 'info',
    title: 'New Integration',
    message: 'GitHub repository facebook/react has been successfully connected.',
    time: '3 days ago',
    unread: false,
    icon: <Info size={18} className="text-blue-400" />
  }
];

const Notifications = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold font-sora text-white">Notifications</h1>
          <p className="text-gray-400">Stay updated on moderation events and system activity.</p>
        </div>
        <button className="text-primary-glow text-sm font-bold hover:underline">MARK ALL AS READ</button>
      </div>

      <div className="space-y-4">
        {notificationsData.map((notif) => (
          <GlassCard 
            key={notif.id} 
            className={`p-6 border-l-4 transition-all hover:translate-x-1 ${
              notif.unread ? 'border-l-primary bg-primary/5' : 'border-l-white/10'
            }`}
          >
            <div className="flex gap-4">
              <div className={`p-3 rounded-xl ${notif.unread ? 'bg-primary/20 shadow-glow' : 'bg-white/5'}`}>
                {notif.icon}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-white flex items-center gap-2">
                    {notif.title}
                    {notif.unread && <span className="w-2 h-2 rounded-full bg-primary-glow shadow-neon"></span>}
                  </h3>
                  <span className="text-xs text-gray-500 font-bold uppercase">{notif.time}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{notif.message}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="text-center pt-8">
        <p className="text-sm text-gray-600 font-medium italic">That's all for now. You're all caught up!</p>
      </div>
    </div>
  );
};

export default Notifications;
