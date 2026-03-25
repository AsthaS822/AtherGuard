import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShieldAlert,
    Filter,
    Bell,
    Settings,
    LogOut,
    ShieldCheck
} from 'lucide-react';
import { motion } from 'framer-motion';

const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/app/dashboard' },
    { icon: ShieldAlert, label: 'Moderation', path: '/app/moderation' },
    { icon: Filter, label: 'Custom Filters', path: '/app/filters' },
    { icon: Bell, label: 'Notifications', path: '/app/notifications' },
    { icon: Settings, label: 'Settings', path: '/app/settings' },
];

const Sidebar = () => {
    return (
        <aside className="w-64 h-screen bg-white dark:bg-dark-sidebar border-r border-gray-200 dark:border-dark-border flex flex-col fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-glow to-primary-accent flex items-center justify-center shadow-[0_0_15px_rgba(0,245,255,0.4)]"
                >
                    <ShieldCheck className="text-white w-6 h-6" />
                </motion.div>
                <span className="text-xl font-bold font-sora tracking-tight bg-gradient-to-r from-primary-glow to-primary-accent bg-clip-text text-transparent">
                    AetherGuard
                </span>
            </div>

            <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.path}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <NavLink
                            to={item.path}
                            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? 'bg-primary-accent text-white shadow-lg shadow-primary-accent/20'
                                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark-card hover:text-gray-900 dark:hover:text-white'
                                }`}
                        >
                            <item.icon size={20} />
                            <span>{item.label}</span>
                        </NavLink>
                    </motion.div>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-white/5">
                <button className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors">
                    <LogOut size={20} />
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
