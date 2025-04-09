import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../config/supabase.js';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

export type UserRole = 'farmer' | 'buyer';

interface AuthUser {
  user: SupabaseUser | null;
  session: Session | null;
  loading: boolean;
  role: UserRole | null;
}

interface SignupParams {
  email: string;
  password: string;
  role?: UserRole;
  name?: string;
  contact?: string;
  description?: string;
}

interface AuthContextType {
  user: SupabaseUser | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (params: SignupParams) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    const initAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data, error } = await supabase
          .from('user_table')
          .select('user_role')
          .eq('user_email', session.user.email)
          .single();

        if (error) {
          console.error('Error fetching user role:', error);
        } else {
          setRole(data.user_role);
        }
      }

      setLoading(false);
    };

    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setUser(session?.user ?? null);
    });

    initAuth();

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    
    // Refresh the page after successful login
    window.location.href = '/';
  };

  const signup = async ({ email, password, role = 'farmer', name, contact, description }: SignupParams) => {
    // Create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({ 
      email, 
      password 
    });
    
    if (authError) throw authError;
    
    // If auth user was created, also create a user profile in user_table
    if (authData.user) {
      const { error: profileError } = await supabase
        .from('user_table')
        .insert([
          {
            id: authData.user.id,
            user_email: email,
            user_name: name || email.split('@')[0],
            user_contact: contact || '',
            user_description: description || '',
            user_role: role
          }
        ]);
      
      if (profileError) {
        console.error('Error creating user profile:', profileError);
        // Consider handling this better - the auth user is created but the profile failed
      }
    }
    
    // Refresh the page after successful signup
    window.location.href = '/';
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    // Refresh the page after successful logout
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, role, isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

