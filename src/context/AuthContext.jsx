'use client'
import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('loading'); // Add status
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setStatus('unauthenticated');
          return;
        }

        // Your auth check logic here
        setStatus('authenticated');
      } catch (error) {
        console.error('Auth check failed:', error);
        setStatus('error');
      }
    }

    checkAuth();
  }, []);

  useEffect(() => {
      localStorage.setItem('rentify_user', JSON.stringify(user));
  }, [user]);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server response was not JSON');
      }

      const data = await response.json();
      setUser(data.user);
      localStorage.setItem('rentify_user', JSON.stringify(data.user));
      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw new Error('Invalid credentials or server error');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('rentify_user');
      setUser(null);
      router.push('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      error,
      status,
      login,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
