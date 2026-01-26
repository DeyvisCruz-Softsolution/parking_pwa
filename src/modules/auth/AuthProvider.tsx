import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User as AppUser, Role } from '../../types/User';
import { supabase } from '../../utils/supabaseClient';
import { AuthContext } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AppUser | null>(null);

  const fetchUserRole = async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('id, email, role')
      .eq('id', userId)
      .single();

    if (data) setUser({ id: data.id, email: data.email, role: data.role as Role });
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) fetchUserRole(data.session.user.id);
    };
    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) fetchUserRole(session.user.id);
      else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    throw new Error("Credenciales incorrectas");
  }

  await fetchUserRole(data.user.id);
};

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
