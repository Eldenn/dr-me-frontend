import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import Router from '@/app/components/Router';

import '@/index.scss';
import '@/app/services/i18n';
import Layout from '@/app/components/layout/Layout';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <Layout>
        <Router />
      </Layout>
    </ChakraProvider>
  </React.StrictMode>,
)
