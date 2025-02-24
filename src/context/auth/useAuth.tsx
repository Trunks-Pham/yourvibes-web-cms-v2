"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthContextType } from './authContextType';
import { useRouter } from 'next/navigation';
import { LoginResponseModel, UserModel } from '../../api/features/authenticate/model/LoginModel';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [checkingLoading, setCheckingLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  const onLogin = (user: LoginResponseModel) => {
    localStorage.setItem('user', JSON.stringify(user?.admin));
    localStorage.setItem('accesstoken', user?.access_token || '');
    setIsAuthenticated(true);
    setUser(user?.admin || null);
    router.push('/');
  }

  const onUpdateProfile = (user: UserModel) => {
    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
    setIsAuthenticated(true);
    setUser(user);
  }

  const onLogout = async () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accesstoken');
    setIsAuthenticated(false);
    setUser(null);
    router.push('/login');
  }

  const isLoginUser = (userId: string) => {
    return user?.id === userId;
  }

  useEffect(() => {
    const checkAuthStatus = () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedAccessToken = localStorage.getItem('accesstoken');

        if (storedUser && storedAccessToken) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCheckingLoading(false)
      }
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{
      onLogin,
      onLogout,
      isAuthenticated,
      user,
      onUpdateProfile,
      isLoginUser,
      checkingLoading
    }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
