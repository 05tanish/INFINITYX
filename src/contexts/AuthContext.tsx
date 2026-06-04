import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { type User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  role: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  role: null,
  loading: true,
  signOut: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const initDone = useRef(false);

  useEffect(() => {
    // Safety: if auth takes > 5s, stop blocking the UI
    const safetyTimer = setTimeout(() => {
      if (!initDone.current) {
        console.warn('AuthContext: safety timeout — forcing loading=false');
        initDone.current = true;
        setLoading(false);
      }
    }, 5000);

    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
        if (session?.user) {
          await fetchRole(session.user.id);
        }
      } catch (err) {
        console.error('AuthContext: init error', err);
      } finally {
        initDone.current = true;
        clearTimeout(safetyTimer);
        setLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null);
        setRole(null);
        setLoading(false);
        return;
      }
      if (session?.user) {
        setUser(session.user);
        await fetchRole(session.user.id);
      } else {
        setUser(null);
        setRole(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(safetyTimer);
    };
  }, []);

  const fetchRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('role, status')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setRole(data.role);
        return;
      }

      // Profile row missing — auto-create with admin role
      if (error?.code === 'PGRST116') {
        const { data: userMeta } = await supabase.auth.getUser();
        if (userMeta?.user) {
          const { data: newProfile } = await supabase
            .from('profiles')
            .insert([{
              id: userMeta.user.id,
              email: userMeta.user.email,
              role: 'admin',
              status: 'active',
            }])
            .select()
            .single();

          if (newProfile) {
            setRole(newProfile.role);
            return;
          }
        }
      }

      setRole(null);
    } catch (err) {
      console.error('AuthContext: fetchRole error', err);
      setRole(null);
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
