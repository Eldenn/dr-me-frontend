import React, { createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { setContext } from '@apollo/client/link/context';
import { useSignUpMutation, UsersPermissionsMe } from '@/app/generated/graphql';
import usePersistState from '@/app/hooks/usePersistState';
import { PERSIST } from '@/app/constants/persist';
import { useApolloClient } from '@apollo/client';

// Define the interface for our authentication context
interface IAuthContext {
  user: UsersPermissionsMe | null;
  token: string | null;
  login: (username: string, password: string, isPersist: boolean) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: UsersPermissionsMe | null) => void;
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
  setUser: () => {},
  // logout: async () => {},
  // hasPermission: (permission: string) => false,
});

// Define our authentication provider component
const AuthProvider: FC<IAuthProviderProps> = ({ children }: IAuthProviderProps) => {
  const apolloClient = useApolloClient();
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [signUp, { data, loading: isLoading }] = useSignUpMutation();
  const [user, setUser, setUserPersist] = usePersistState<UsersPermissionsMe | null>(PERSIST.USER, null);
  const [token, setToken, setTokenPersist] = usePersistState<string | null>(PERSIST.TOKEN, null);

  useEffect(() => {
    if (data) {
      setUser(data.login.user);
      if (data.login.jwt) {
        setToken(data.login.jwt);
      }
    }
  }, [data, setToken, setUser]);

  useEffect(() => {
    if (token) {
      const authLink = setContext(async (_, { headers }) => {
        return {
          headers: {
            ...headers,
            authorization: token ? `Bearer ${token}` : '',
          },
        };
      });

      apolloClient.setLink(authLink.concat(apolloClient.link));
      setAuthenticated(true);
    }
  }, [apolloClient, token]);

  const logout = useCallback(async () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
    setAuthenticated(false);
  }, [setToken, setUser]);

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

  // open the modal to login
  // const openLoginModal = useCallback(() => {
  //   window.open('http://127.0.0.1:8080/', '', 'width=800,height=600');
  // }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
      isLoading,
      isAuthenticated,
      setUser,
    }),
    [isAuthenticated, isLoading, login, logout, setUser, token, user],
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
