import { useState, useEffect } from 'react';
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { TrendingUp, Users, DollarSign, Activity, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function DashboardOverview() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: '$0',
    users: '0',
    projects: '0',
    conversion: '0%',
  });
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { data: revenueLogs } = await supabase.from('revenue_logs').select('amount, logged_at');
      const { count: quoteCount } = await supabase.from('quotes').select('*', { count: 'exact', head: true });
      
      const totalRevenue = revenueLogs?.reduce((acc, log) => acc + Number(log.amount), 0) || 0;

      setStats({
        revenue: `$${totalRevenue.toLocaleString()}`,
        users: (userCount || 0).toLocaleString(),
        projects: (quoteCount || 0).toLocaleString(),
        conversion: '4.3%',
      });

      const chartData = revenueLogs?.map(log => ({
        name: new Date(log.logged_at).toLocaleDateString('en-US', { month: 'short' }),
        revenue: log.amount
      })) || [];
      
      setRevenueData(chartData.length > 0 ? chartData : [
        { name: 'Jan', revenue: 0 },
        { name: 'Feb', revenue: 0 },
        { name: 'Mar', revenue: 0 },
      ]);

      const { data: recentQuotes } = await supabase.from('quotes').select('id, client_name, created_at').order('created_at', { ascending: false }).limit(3);
      const activities = recentQuotes?.map(q => ({
        id: q.id,
        title: `New quote requested by ${q.client_name}`,
        time: new Date(q.created_at).toLocaleDateString()
      })) || [];

      setRecentActivity(activities);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="w-8 h-8 text-ns-gold animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-serif font-semibold text-white mb-2">Dashboard Overview</h1>
        <p className="text-ns-slate">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={stats.revenue} change="+0%" icon={DollarSign} positive />
        <StatCard title="Active Users" value={stats.users} change="+0%" icon={Users} positive />
        <StatCard title="Active Projects" value={stats.projects} change="+0%" icon={Activity} positive />
        <StatCard title="Conversion Rate" value={stats.conversion} change="+0%" icon={TrendingUp} positive />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 pro-card bg-ns-navy p-6">
          <h2 className="text-lg font-serif text-white mb-6">Revenue Overview</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C6A16E" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#C6A16E" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#5C5C5E" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#5C5C5E" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#101827', borderColor: '#262626', borderRadius: '8px' }}
                  itemStyle={{ color: '#F7F5F2', fontWeight: 600 }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#C6A16E" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="pro-card bg-ns-navy p-6 flex flex-col">
          <h2 className="text-lg font-serif text-white mb-6">Recent Activity</h2>
          <div className="flex-1 space-y-6 relative">
            {/* Timeline line */}
            {recentActivity.length > 0 && (
              <div className="absolute left-5 top-5 bottom-5 w-px bg-ns-graphite z-0" />
            )}
            
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4 relative z-10">
                <div className="w-10 h-10 rounded-full bg-ns-black border border-ns-graphite flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 rounded-full bg-ns-gold shadow-gold" />
                </div>
                <div className="pt-2">
                  <p className="text-sm font-medium text-white">{activity.title}</p>
                  <p className="text-xs text-ns-slate mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
            {recentActivity.length === 0 && (
              <p className="text-ns-slate text-sm text-center py-10">No recent activity.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, icon: Icon, positive }: { title: string, value: string, change: string, icon: any, positive: boolean }) {
  return (
    <div className="pro-card bg-ns-navy p-6 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-ns-gold/5 to-transparent rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110" />
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs font-bold text-ns-slate uppercase tracking-widest">{title}</p>
          <p className="text-3xl font-serif font-bold text-white mt-2 tracking-tight">{value}</p>
        </div>
        <div className="p-3 bg-ns-black rounded-xl border border-ns-graphite text-ns-gold group-hover:border-ns-gold/30 transition-colors">
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-xs">
        <span className={`font-bold px-2 py-1 rounded ${positive ? 'bg-ns-emerald/10 text-ns-emerald border border-ns-emerald/20' : 'bg-ns-error/10 text-ns-error border border-ns-error/20'}`}>
          {change}
        </span>
        <span className="text-ns-slate ml-2">from last month</span>
      </div>
    </div>
  );
}
