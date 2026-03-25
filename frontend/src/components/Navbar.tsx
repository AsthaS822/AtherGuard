import { Search, Bell, Sun, Moon, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavbarProps {
    onThemeToggle: () => void;
    isDarkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onThemeToggle, isDarkMode }) => {
    return (
        <header className="h-20 bg-white/80 dark:bg-dark-sidebar/80 backdrop-blur-md border-b border-gray-200 dark:border-white/10 sticky top-0 z-40 px-8 flex items-center justify-between transition-all duration-300">
            <div className="flex items-center gap-6 flex-1">
                <Link
                    to="/"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:text-primary-accent dark:hover:text-primary-glow hover:border-primary-accent/50 transition-all group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Landing</span>
                </Link>

                <div className="max-w-md w-full">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary-glow transition-colors" size={18} />
                        <input
                            type="text"
                            placeholder="Search moderation logs..."
                            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:border-primary-glow/50 focus:bg-white/10 transition-all font-inter text-gray-900 dark:text-white"
                        />
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={onThemeToggle}
                    className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400 hover:text-primary-glow"
                >
                    {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <button className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all text-gray-400 relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-background-dark"></span>
                </button>

                <div className="h-8 w-px bg-white/10 mx-2"></div>

                <Link
                    to="/app/profile"
                    className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-accent/50 transition-all group"
                >
                    <span className="text-sm font-medium pl-2 hidden sm:block text-gray-900 dark:text-white">Admin User</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold ring-2 ring-white/10 group-hover:ring-primary-glow/50 transition-all text-white">
                        AD
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Navbar;
