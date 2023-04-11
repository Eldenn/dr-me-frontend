import React, { ReactNode, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client';
import { useApolloClient } from '@/app/hooks/useApolloClient';
import { AuthProvider } from '@/app/providers/AuthProvider';

export class MeInstance {
  private host: string;

  private port: string;

  constructor({ host, port }: { host: string; port: string }) {
    this.host = host;
    this.port = port;
  }

  public getHost() {
    return this.host;
  }

  public getPort() {
    return this.port;
  }
}

interface IMe {
  children: ReactNode;
  instance: MeInstance;
}

export const Me = ({ children, instance }: IMe) => {
  const { client: apolloClient } = useApolloClient(instance);

  const render = useMemo(() => {
    if (apolloClient) {
      return (
        <ApolloProvider client={apolloClient}>
          <AuthProvider>{children}</AuthProvider>
        </ApolloProvider>
      );
    }

    return null;
  }, [apolloClient, children]);

  return render;
};

export default Me;
export { useAuth } from '@/app/providers/AuthProvider';
