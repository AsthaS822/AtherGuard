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
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/layout/ProtectedRoute';

function AppContent() {


  return (
    <Router>
      <div className="min-h-screen transition-colors duration-500">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Login />} />
          <Route path="/setup" element={
            <ProtectedRoute>
              <AgentSetup />
            </ProtectedRoute>
          } />

          <Route path="/app" element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
            <Route path="analyze" element={<Analyze />} />
            <Route path="moderation" element={<ModerationPanel />} />
            <Route path="filters" element={<CustomFilters />} />
            <Route path="reports" element={<Reports />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
