import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import Analyze from './pages/Analyze';
import ModerationPanel from './pages/ModerationPanel';
import CustomFilters from './pages/CustomFilters';
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import AgentSetup from './pages/AgentSetup';

function App() {

  // ✅ AUTH STATES
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAgentSetupDone, setIsAgentSetupDone] = useState(false);

  // ✅ PERSISTENCE
  useEffect(() => {
    const auth = localStorage.getItem("auth");
    const setup = localStorage.getItem("setup");

    if (auth === "true") setIsAuthenticated(true);
    if (setup === "true") setIsAgentSetupDone(true);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem("auth", "true");
  };

  const handleSetupComplete = () => {
    setIsAgentSetupDone(true);
    localStorage.setItem("setup", "true");
  };

  return (
    <Router>
      <div className="min-h-screen transition-colors duration-500">
        <Routes>
          {/* Landing */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth (Login / Signup) */}
          <Route
            path="/auth"
            element={
              isAuthenticated
                ? <Navigate to="/onboarding" />
                : <Login onLogin={handleLogin} />
            }
          />

          {/* Onboarding */}
          <Route
            path="/onboarding"
            element={
              !isAuthenticated
                ? <Navigate to="/auth" />
                : isAgentSetupDone
                ? <Navigate to="/dashboard" />
                : <AgentSetup onComplete={handleSetupComplete} />
            }
          />

          {/* Dashboard (Post-Login) */}
          <Route
            path="/dashboard"
            element={
              !isAuthenticated
                ? <Navigate to="/auth" />
                : !isAgentSetupDone
                ? <Navigate to="/onboarding" />
                : <MainLayout />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="analyze" element={<Analyze />} />
            <Route path="moderation" element={<ModerationPanel />} />
            <Route path="filters" element={<CustomFilters />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
