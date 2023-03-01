import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { useEffect, useState } from 'react';

export const useApolloClient = () => {
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    const { REACT_APP_STRAPI_HOST, REACT_APP_STRAPI_PORT } = process.env;

    const instance = new ApolloClient({
      uri: `${REACT_APP_STRAPI_HOST}:${REACT_APP_STRAPI_PORT}/graphql`,
      cache: new InMemoryCache(),
    });

    setClient(instance);
  }, []);

  return {
    client
  };
};
