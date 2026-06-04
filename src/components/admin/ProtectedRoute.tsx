import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2 } from 'lucide-react';
import StarLogo from '../ui/StarLogo';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

export default function ProtectedRoute({ allowedRoles = ['admin', 'developer'] }: ProtectedRouteProps) {
  const { user, role, loading } = useAuth();

  // If we're still loading the initial session, show spinner
  if (loading) {
    return (
      <div className="min-h-screen bg-ns-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-6">
          <StarLogo size={40} animated />
          <Loader2 className="w-6 h-6 animate-spin text-ns-gold" />
          <p className="text-xs text-ns-slate uppercase tracking-[0.3em] font-semibold animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Not logged in → redirect to login
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  // Logged in but role not yet assigned / profile missing → still allow entry
  // (The admin can still use the dashboard; role check below applies only when roles are strictly enforced)
  if (role && !allowedRoles.includes(role)) {
    return (
      <div className="min-h-screen bg-ns-black flex flex-col items-center justify-center text-white p-4 text-center">
        <div className="w-20 h-20 bg-ns-error/10 rounded-full flex items-center justify-center mb-6 border border-ns-error/20">
          <svg className="w-10 h-10 text-ns-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h1 className="text-3xl font-serif font-bold mb-2 text-white">Access Denied</h1>
        <p className="text-ns-slate max-w-md mx-auto mb-8">
          Your account does not have the required permissions to access the Administrative Dashboard.
        </p>
        <div className="px-4 py-2 bg-ns-navy border border-ns-graphite rounded-xl mb-8">
          <p className="text-xs text-ns-slate uppercase tracking-widest mb-1">Your Assigned Role</p>
          <p className="text-sm font-bold text-white capitalize">{role || 'None'}</p>
        </div>
        <a href="/" className="text-ns-gold hover:text-ns-gold-lt text-sm font-medium transition-colors">
          &larr; Return to Homepage
        </a>
      </div>
    );
  }

  return <Outlet />;
}
