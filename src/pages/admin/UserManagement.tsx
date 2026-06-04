import { useState, useEffect } from 'react';
import { Shield, MoreVertical, Key, Ban, Trash2, CheckCircle2, Loader2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface Profile {
  id: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

export default function UserManagement() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showInviteModal, setShowInviteModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      setUsers(users.map(u => u.id === id ? { ...u, status: newStatus } : u));
    } catch (error) {
      console.error('Error updating status:', error);
    }
    setActiveDropdown(null);
  };

  const deleteUser = async (id: string) => {
    if(confirm('Are you sure you want to delete this user? This will only remove their profile record.')) {
      try {
        const { error } = await supabase
          .from('profiles')
          .delete()
          .eq('id', id);

        if (error) throw error;
        setUsers(users.filter(u => u.id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
    setActiveDropdown(null);
  };

  const updateRole = async (id: string, newRole: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', id);

      if (error) throw error;
      setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u));
    } catch (error) {
      console.error('Error updating role:', error);
    }
    setActiveDropdown(null);
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      alert(`Password reset link sent to ${email}`);
    } catch (error) {
      console.error('Error resetting password:', error);
    }
    setActiveDropdown(null);
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold tracking-tight text-white mb-2">User Management</h1>
          <p className="text-ns-slate">Manage roles, access permissions, and account settings.</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="px-4 py-2 bg-ns-gold hover:bg-blue-500 text-white font-medium rounded-xl transition-colors"
        >
          Invite User
        </button>
      </div>

      <div className="bg-ns-navy border border-ns-graphite rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-ns-slate">
            <thead className="text-xs uppercase bg-ns-black/50 text-ns-slate border-b border-ns-graphite">
              <tr>
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Role</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Last Sign In</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-800/50">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-ns-graphite/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-ns-graphite flex items-center justify-center font-medium text-white shrink-0">
                        {user.email.charAt(0).toUpperCase()}
                      </div>
                      <div className="font-medium text-white">{user.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Shield className={`w-4 h-4 ${user.role === 'admin' ? 'text-purple-400' : 'text-ns-gold'}`} />
                      <span className="capitalize">{user.role}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {user.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ns-emerald/10 text-ns-emerald text-xs font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ns-error/10 text-red-400 text-xs font-medium">
                        <Ban className="w-3.5 h-3.5" />
                        Blocked
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4">{new Date(user.created_at).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-right relative">
                    <button 
                      onClick={() => setActiveDropdown(activeDropdown === user.id ? null : user.id)}
                      className="p-2 text-ns-slate hover:text-white rounded-lg hover:bg-ns-graphite transition-colors"
                    >
                      <MoreVertical className="w-5 h-5" />
                    </button>

                    {activeDropdown === user.id && (
                      <>
                        <div 
                          className="fixed inset-0 z-40" 
                          onClick={() => setActiveDropdown(null)}
                        />
                        <div className="absolute right-8 top-12 w-48 bg-ns-navy border border-ns-graphite rounded-xl shadow-2xl overflow-hidden z-50">
                          <div className="py-1">
                            <button 
                              onClick={() => resetPassword(user.email)}
                              className="w-full text-left px-4 py-2 text-sm text-ns-white hover:bg-ns-graphite hover:text-white flex items-center gap-2"
                            >
                              <Key className="w-4 h-4 text-ns-gold" /> Reset Password
                            </button>
                            <button 
                              onClick={() => toggleStatus(user.id, user.status)}
                              className="w-full text-left px-4 py-2 text-sm text-ns-white hover:bg-ns-graphite hover:text-white flex items-center gap-2"
                            >
                              <Ban className="w-4 h-4 text-orange-400" /> 
                              {user.status === 'active' ? 'Block Access' : 'Restore Access'}
                            </button>
                            <div className="h-px bg-ns-graphite my-1" />
                            <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-ns-slate">
                              Change Role
                            </div>
                            <button 
                              onClick={() => updateRole(user.id, 'admin')}
                              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${user.role === 'admin' ? 'text-ns-gold bg-blue-500/5' : 'text-ns-white hover:bg-ns-graphite hover:text-white'}`}
                            >
                              <Shield className="w-4 h-4" /> Admin
                            </button>
                            <button 
                              onClick={() => updateRole(user.id, 'developer')}
                              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${user.role === 'developer' ? 'text-ns-gold bg-blue-500/5' : 'text-ns-white hover:bg-ns-graphite hover:text-white'}`}
                            >
                              <Shield className="w-4 h-4" /> Developer
                            </button>
                            <button 
                              onClick={() => updateRole(user.id, 'client')}
                              className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${user.role === 'client' ? 'text-ns-gold bg-blue-500/5' : 'text-ns-white hover:bg-ns-graphite hover:text-white'}`}
                            >
                              <Shield className="w-4 h-4" /> Client
                            </button>
                            <div className="h-px bg-ns-graphite my-1" />
                            <button 
                              onClick={() => deleteUser(user.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-ns-error/10 hover:text-red-300 flex items-center gap-2"
                            >
                              <Trash2 className="w-4 h-4" /> Delete User
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invite User Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-ns-navy border border-ns-graphite rounded-2xl w-full max-w-md shadow-2xl p-8">
            <h2 className="text-xl font-bold text-white mb-4">Invite New User</h2>
            <p className="text-ns-slate text-sm mb-6">
              To maintain security, new users must be added through the Supabase Dashboard. 
              Only you (the Admin) have access to do this.
            </p>
            <div className="space-y-4">
              <div className="p-4 bg-blue-500/5 border border-blue-500/20 rounded-xl">
                <p className="text-xs font-bold text-ns-gold uppercase tracking-widest mb-2">Instructions</p>
                <ol className="text-xs text-ns-white space-y-2 list-decimal pl-4">
                  <li>Go to your Supabase Dashboard</li>
                  <li>Authentication &gt; Users &gt; Add User</li>
                  <li>Enter their email and create a password</li>
                  <li>They will automatically appear here once created</li>
                </ol>
              </div>
              <a 
                href="https://supabase.com/dashboard/project/qpzznoruewjqimgyeqox/auth/users" 
                target="_blank" 
                rel="noreferrer"
                className="block w-full text-center bg-ns-gold hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors"
              >
                Go to Supabase Dashboard
              </a>
              <button 
                onClick={() => setShowInviteModal(false)}
                className="w-full text-center text-ns-slate hover:text-white text-sm font-medium py-2 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
