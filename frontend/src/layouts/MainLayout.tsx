import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';

interface MainLayoutProps {
    onThemeToggle: () => void;
    isDarkMode: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ onThemeToggle, isDarkMode }) => {
    return (
        <div className="flex min-h-screen bg-background-light dark:bg-dark-bg transition-colors duration-300 text-gray-900 dark:text-dark-text">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar onThemeToggle={onThemeToggle} isDarkMode={isDarkMode} />
                <main className="flex-1 p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
