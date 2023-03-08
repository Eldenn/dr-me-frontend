import { ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';

export const useApolloClient = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    const { REACT_APP_STRAPI_HOST, REACT_APP_STRAPI_PORT } = process.env;

    const httpLink = createUploadLink({
      uri: `${REACT_APP_STRAPI_HOST}:${REACT_APP_STRAPI_PORT}/graphql`,
    }) as unknown as ApolloLink;

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
