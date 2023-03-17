import React, { FC, ReactNode, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@chakra-ui/react';
import { ApolloLink, useApolloClient } from '@apollo/client';
import { TOAST_DURATION, TOAST_POSITION, TOAST_STATUS } from '@/app/constants/toast';
import { ERRORS_GRAPHQL, ERRORS_NETWORK, ERROR_CODES } from '@/app/constants/errors';
import { ErrorHandler, onError } from '@apollo/client/link/error';
import { useAuth } from '@/app/providers/AuthProvider';

interface IProps {
  children: ReactNode;
}

const ErrorsHandler: FC<IProps> = ({ children }: IProps) => {
  const apolloClient = useApolloClient();
  const { logout } = useAuth();
  const { t } = useTranslation();
  const toast = useToast();
  const [errorLink, setErrorLink] = React.useState<ApolloLink | null>(null);

  const setLink: ErrorHandler = useCallback(
    ({ graphQLErrors, networkError, operation: { operationName } }) => {
      const toastOptions = {
        status: TOAST_STATUS.ERROR,
        duration: TOAST_DURATION,
        position: TOAST_POSITION,
        isClosable: true,
      };

      if (graphQLErrors) {
        graphQLErrors.forEach(({ message, extensions }) => {
          if (ERRORS_GRAPHQL[operationName]) {
            const error = ERRORS_GRAPHQL[operationName].find((errorElement) => errorElement.message === message);

            if (error) {
              toast({
                ...toastOptions,
                title: t(`error.${error.code}`),
                position: TOAST_POSITION,
              });
              return;
            }
          }

          if (extensions?.code === ERROR_CODES.FORBIDDEN) {
            toast({
              ...toastOptions,
              title: t('error.forbidden'),
            });

            logout();
            return;
          }
        });
      }

      if (networkError) {
        if (networkError.message === ERRORS_NETWORK['401']) {
          toast({
            ...toastOptions,
            title: t('error.forbidden'),
          });

          logout();
        } else {
          toast({
            ...toastOptions,
            title: t('error.network'),
          });
        }
      }
    },
    [logout, t, toast],
  );

  useEffect(() => {
    setErrorLink(onError(setLink));
  }, [setLink]);

  useEffect(() => {
    if (errorLink) {
      apolloClient.setLink(errorLink.concat(apolloClient.link));
      setErrorLink(null);
    }
  }, [apolloClient, errorLink, setLink]);

  return <>{children}</>;
};

export default ErrorsHandler;
