import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './layouts/MainLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import ModerationPanel from './pages/ModerationPanel';
import CustomFilters from './pages/CustomFilters';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Login from './pages/Login';

// Mock placeholders for other pages
const Settings = () => <div className="text-3xl font-bold p-8">Settings (Coming Soon)</div>;

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <Router>
      <div className={`min-h-screen ${darkMode ? 'dark' : ''} bg-background-light dark:bg-dark-bg text-gray-900 dark:text-dark-text transition-colors duration-500`}>
        <Routes>
          {/* Landing page will have its own layout */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />

          {/* Main dashboard routes will share MainLayout */}
          <Route path="/app" element={<MainLayout onThemeToggle={toggleTheme} isDarkMode={darkMode} />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="moderation" element={<ModerationPanel />} />
            <Route path="filters" element={<CustomFilters />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
