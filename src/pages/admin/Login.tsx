import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Loader2, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import StarLogo from '../../components/ui/StarLogo';
import { supabase } from '../../lib/supabase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      navigate('/admin');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ns-black flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-ns-teal/10 rounded-full blur-[100px] aurora-pulse" />
        <StarLogo size={800} color="#C6A16E" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" animated={true} />
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-ns-gold/10 border border-ns-gold/30 flex items-center justify-center shadow-gold">
            <StarLogo size={24} />
          </div>
        </div>
        <h2 className="text-center text-3xl font-serif text-white tracking-tight">
          Welcome back
        </h2>
        <p className="mt-2 text-center text-sm text-ns-slate uppercase tracking-widest font-semibold">
          Sign in to Northern Star Admin
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-ns-navy py-8 px-4 shadow-dialog sm:rounded-xl sm:px-10 border border-ns-graphite relative overflow-hidden">
          
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-ns-gold to-ns-teal" />

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-ns-error/10 border border-ns-error/20 rounded-md p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-ns-error shrink-0 mt-0.5" />
                <p className="text-sm text-ns-error font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="form-label" htmlFor="email">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-ns-slate" />
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-input pl-10"
                  placeholder="admin@northernstar.com"
                />
              </div>
            </div>

            <div>
              <label className="form-label" htmlFor="password">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-ns-slate" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 rounded bg-ns-black border-ns-graphite text-ns-gold focus:ring-ns-gold focus:ring-offset-ns-navy"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-ns-slate">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-semibold text-ns-gold hover:text-ns-gold-lt">
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full group py-3"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        
        <p className="mt-6 text-center text-xs text-ns-slate uppercase tracking-widest">
          Secured by Northern Star Infrastructure
        </p>
      </div>
    </div>
  );
}
