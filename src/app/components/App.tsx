import React, { useMemo } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import Router from '@/app/components/Router';

import '@/index.scss';
import '@/app/services/i18n';
import Layout from '@/app/components/layout/Layout';
import { ApolloProvider } from '@apollo/client';
import { useApolloClient } from '@/app/hooks/useApolloClient';
import { AuthProvider } from '@/app/providers/AuthProvider';
import ErrorsHandler from './errorsHandler/ErrorsHandler';

export const App = () => {
  const { client: apolloClient } = useApolloClient();

  const renderApp = useMemo(() => {
    if (apolloClient) {
      return (
        <ApolloProvider client={apolloClient}>
          <AuthProvider>
            <ErrorsHandler>
              <ChakraProvider>
                <Layout>
                  <Router />
                </Layout>
              </ChakraProvider>
            </ErrorsHandler>
          </AuthProvider>
        </ApolloProvider>
      );
    }

    return null;
  }, [apolloClient]);

  return <React.StrictMode>{renderApp}</React.StrictMode>;
};

export default App;
