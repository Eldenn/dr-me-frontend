import { ApolloClient, InMemoryCache, NormalizedCacheObject, ApolloLink } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { useEffect, useState } from 'react';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { MeInstance } from '@/lib/Me';

export const useApolloClient = (meInstance: MeInstance) => {
  const { t } = useTranslation();
  const toast = useToast();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    if (!meInstance || client) return;

    const httpLink = createUploadLink({
      uri: `${meInstance.getHost()}:${meInstance.getPort()}/graphql`,
    }) as unknown as ApolloLink;

    const instance = new ApolloClient({
      link: httpLink,
      cache: new InMemoryCache(),
    });

    setClient(instance);
  }, [client, meInstance, t, toast]);

  return {
    client,
  };
};
