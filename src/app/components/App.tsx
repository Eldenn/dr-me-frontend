import React from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import Router from '@/app/components/Router';

import '@/index.scss';
import '@/app/services/i18n';
import Layout from '@/app/components/layout/Layout';
import ErrorsHandler from './errorsHandler/ErrorsHandler';
import Me, { MeInstance } from '@/lib/Me';

const meInstance = new MeInstance({
  host: process.env.REACT_APP_STRAPI_HOST || 'localhost',
  port: process.env.REACT_APP_STRAPI_PORT || '3000',
});

export const App = () => {
  return (
    <React.StrictMode>
      <Me instance={meInstance}>
        <ErrorsHandler>
          <ChakraProvider>
            <Layout>
              <Router />
            </Layout>
          </ChakraProvider>
        </ErrorsHandler>
      </Me>
    </React.StrictMode>
  );
};

export default App;
