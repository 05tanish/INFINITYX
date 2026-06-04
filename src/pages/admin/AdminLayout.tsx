import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  LogOut,
  Menu,
  X,
  FileText,
  Star,
  Users,
  Image,
  PieChart,
  ShieldAlert
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import StarLogo from '../../components/ui/StarLogo';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/quotes', label: 'Project Quotes', icon: FileText },
  { path: '/admin/services', label: 'Services', icon: Settings },
  { path: '/admin/portfolio', label: 'Portfolio', icon: Image },
  { path: '/admin/reviews', label: 'Reviews', icon: Star },
  { path: '/admin/stats', label: 'Statistics', icon: PieChart },
  { path: '/admin/pricing', label: 'Pricing', icon: FileText },
  { path: '/admin/complaints', label: 'Complaints', icon: ShieldAlert },
];

const developerNavItems = [
  { path: '/admin/users', label: 'User Management', icon: Users },
];

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [userProfile, setUserProfile] = useState<any>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    if (user) {
      fetchUserProfile();
    }
  }, [user]);

  const fetchUserProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();
      
      if (error) throw error;
      setUserProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const visibleNavItems = userProfile?.role === 'developer' 
    ? [...navItems, ...developerNavItems] 
    : navItems;

  return (
    <div className="min-h-screen bg-ns-black flex overflow-hidden font-sans">
      
      {/* Mobile sidebar overlay */}
      {!isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-ns-navy border-r border-ns-graphite transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 flex flex-col ${
          !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-6 border-b border-ns-graphite">
          <div className="flex items-center gap-2">
            <StarLogo size={20} />
            <span className="font-serif font-bold text-lg text-white tracking-widest">NORTHERN STAR</span>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-widest bg-ns-gold text-ns-black px-2 py-0.5 rounded ml-2">
            Admin
          </span>
          <button 
            onClick={() => setIsSidebarOpen(false)}
            className="lg:hidden text-ns-slate hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
          {visibleNavItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium ${
                  isActive 
                    ? 'bg-ns-gold text-ns-black shadow-gold' 
                    : 'text-ns-slate hover:bg-ns-gold/5 hover:text-ns-gold'
                }`}
              >
                <Icon size={18} className={isActive ? 'text-ns-black' : ''} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-ns-graphite bg-ns-navy">
          <div className="flex items-center gap-3 mb-4 p-2 bg-ns-black border border-ns-graphite rounded-lg">
            <div className="w-10 h-10 rounded bg-ns-graphite flex items-center justify-center text-ns-gold font-bold border border-ns-gold/20">
              {userProfile?.full_name?.charAt(0) || user?.email?.charAt(0) || 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {userProfile?.full_name || 'Admin User'}
              </p>
              <p className="text-[10px] uppercase tracking-widest text-ns-gold font-semibold truncate">
                {userProfile?.role || 'admin'}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2 text-sm font-medium text-ns-slate hover:text-ns-error hover:bg-ns-error/10 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header (Mobile) */}
        <header className="h-16 lg:hidden flex items-center justify-between px-4 bg-ns-navy border-b border-ns-graphite">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 -ml-2 text-ns-slate hover:text-white rounded-lg hover:bg-ns-graphite"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <StarLogo size={20} />
          </div>
          <div className="w-10" /> {/* Spacer */}
        </header>

        {/* Main scrollable area */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
