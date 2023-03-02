import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from 'react';
import { useSignUpMutation, UsersPermissionsMe } from '@/app/generated/graphql';
import usePersistState from '@/app/hooks/usePersistState';
import { PERSIST } from '@/app/constants/persist';

// Define the interface for our authentication context
interface IAuthContext {
  user: UsersPermissionsMe | null;
  token: string | null;
  login: (username: string, password: string, isPersist: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  // logout: () => Promise<void>;
  // hasPermission: (permission: string) => boolean;
}

interface IAuthProviderProps {
  children: ReactNode;
}

// Create a new authentication context
const AuthContext = createContext<IAuthContext>({
  user: null,
  token: null,
  login: async () => {},
  logout: async () => {},
  isLoading: false,
  isAuthenticated: false,
  // logout: async () => {},
  // hasPermission: (permission: string) => false,
});

// Define our authentication provider component
const AuthProvider: React.FC<IAuthProviderProps> = ({ children }: IAuthProviderProps) => {
  const [signUp, { data, loading: isLoading }] = useSignUpMutation();
  const [user, setUser, setUserPersist] = usePersistState<UsersPermissionsMe | null>(PERSIST.USER, null, false);
  const [token, setToken, setTokenPersist] = usePersistState<string | null>(PERSIST.TOKEN, null, false);

  useEffect(() => {
    if (data) {
      setUser(data.login.user);
      if (data.login.jwt) {
        setToken(data.login.jwt);
      }
    }
  }, [data, setToken, setUser]);

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);

    setUserPersist(false);
    setTokenPersist(false);
  }, [setToken, setTokenPersist, setUser, setUserPersist]);

  const login = useCallback(
    async (identifier: string, password: string, isPersist: boolean) => {
      setUserPersist(isPersist);
      setTokenPersist(isPersist);
      
      signUp({
        variables: {
          input: {
            identifier,
            password,
          },
        },
      });
    },
    [setTokenPersist, setUserPersist, signUp],
  );

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isLoading,
      isAuthenticated,
    }),
    [isAuthenticated, isLoading, login, logout, token, user],
  );

  // Check if user has permission to access a feature
  // const hasPermission = (permission: string) => {
  //   // Your authorization logic goes here
  //   // This is just an example of how it might work
  //   return authState.isAuthenticated && authState.user?.role === "admin";
  // };

  // Return the provider component with the context value
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Define a hook to use the authentication context
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
