import { ApolloClient, InMemoryCache, NormalizedCacheObject, HttpLink, from } from '@apollo/client';
import { useEffect, useState } from 'react';
import { onError } from '@apollo/client/link/error';
import { useToast } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { TOAST_DURATION, TOAST_STATUS } from '@/app/constants/toast';
import { ERRORS } from '@/app/constants/errors';

export const useApolloClient = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [client, setClient] = useState<ApolloClient<NormalizedCacheObject>>();

  useEffect(() => {
    const { REACT_APP_STRAPI_HOST, REACT_APP_STRAPI_PORT } = process.env;

    const errorLink = onError(({ graphQLErrors, networkError }) => {
      const toastOptions = {
        status: TOAST_STATUS.ERROR,
        duration: TOAST_DURATION,
        isClosable: true,
      };

      if (graphQLErrors) {
        graphQLErrors.forEach(
          ({ extensions: { code } }) => {
            if (typeof code === 'string' && ERRORS[code]) {
              toast({
                ...toastOptions,
                title: ERRORS[code],
              });
            }
          },
          // console.log(
          //   `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
          // )
        );
      }

      if (networkError) {
        toast({
          ...toastOptions,
          title: t('error.network'),
        });
      }
    });

    const httpLink = new HttpLink({ uri: `${REACT_APP_STRAPI_HOST}:${REACT_APP_STRAPI_PORT}/graphql` });

    const instance = new ApolloClient({
      link: from([errorLink, httpLink]),
      cache: new InMemoryCache(),
    });

    setClient(instance);
  }, [t, toast]);

  return {
    client,
  };
};
