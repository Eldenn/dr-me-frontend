import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const useApolloClient = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    const { REACT_APP_STRAPI_HOST, REACT_APP_STRAPI_PORT } = process.env;

    const httpLink = new HttpLink({ uri: `${REACT_APP_STRAPI_HOST}:${REACT_APP_STRAPI_PORT}/graphql` });

    const instance = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    setClient(instance);
  }, [t, toast]);

  return {
    client,
  };
};
