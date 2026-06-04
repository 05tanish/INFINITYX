import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './pages/admin/AdminLayout';
import Login from './pages/admin/Login';
import ResetPassword from './pages/admin/ResetPassword';
import DashboardOverview from './pages/admin/DashboardOverview';
import UserManagement from './pages/admin/UserManagement';
import ReviewsManager from './pages/admin/ReviewsManager';
import ComplaintsManager from './pages/admin/ComplaintsManager';
import QuotesManager from './pages/admin/QuotesManager';
import PortfolioManager from './pages/admin/PortfolioManager';
import ServicesManager from './pages/admin/ServicesManager';
import StatsManager from './pages/admin/StatsManager';
import PricingManager from './pages/admin/PricingManager';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Website */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Admin Login & Reset */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          
          {/* Protected Admin Dashboard */}
          <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin', 'developer']} />}>
            <Route element={<AdminLayout />}>
              <Route index element={<DashboardOverview />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="reviews" element={<ReviewsManager />} />
              <Route path="complaints" element={<ComplaintsManager />} />
              <Route path="quotes" element={<QuotesManager />} />
              <Route path="portfolio" element={<PortfolioManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="stats" element={<StatsManager />} />
              <Route path="pricing" element={<PricingManager />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
