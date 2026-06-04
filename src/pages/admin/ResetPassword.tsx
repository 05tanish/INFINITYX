import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Lock, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      setSuccess(true);
      setTimeout(() => navigate('/admin/login'), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-ns-black flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-ns-navy border border-ns-graphite rounded-2xl shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-32 bg-blue-500/20 blur-[100px] pointer-events-none" />
        
        <div className="relative z-10">
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-ns-black border border-ns-graphite rounded-xl flex items-center justify-center shadow-inner shadow-black/50">
              <Lock className="w-8 h-8 text-ns-gold" />
            </div>
          </div>
          
          <h1 className="text-2xl font-serif font-bold text-center text-white mb-2">Reset Password</h1>
          <p className="text-ns-slate text-center text-sm mb-8">Enter your new password below.</p>

          {error && (
            <div className="mb-6 p-4 bg-ns-error/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {success ? (
            <div className="p-6 bg-ns-emerald/10 border border-emerald-500/20 rounded-xl text-center space-y-4">
              <div className="flex justify-center">
                <CheckCircle2 className="w-12 h-12 text-ns-emerald" />
              </div>
              <p className="text-ns-emerald font-medium">Password updated successfully!</p>
              <p className="text-ns-slate text-xs">Redirecting to login...</p>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-ns-white">New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ns-slate" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-ns-gold/50 focus:border-blue-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-ns-white">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ns-slate" />
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full bg-ns-black border border-ns-graphite rounded-xl py-3 pl-10 pr-4 text-white placeholder:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-ns-gold/50 focus:border-blue-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-ns-gold hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-6"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Password'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
