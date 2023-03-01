import React, { useMemo } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import Router from '@/app/components/Router';

import '@/index.scss';
import '@/app/services/i18n';
import Layout from '@/app/components/layout/Layout';
import { ApolloProvider } from '@apollo/client';
import { useApolloClient } from '@/app/hooks/useApolloClient';


export const App = () => {
  const { client: apolloClient } = useApolloClient();

  const renderApp = useMemo(() => {
    if (apolloClient) {
      return (
        <ApolloProvider client={apolloClient}>
          <ChakraProvider>
            <Layout>
              <Router />
            </Layout>
          </ChakraProvider>
        </ApolloProvider>
      )
    }

    return null;
  }, [apolloClient]);

  return (
    <React.StrictMode>
      {renderApp}
    </React.StrictMode>
  )
};

export default App;