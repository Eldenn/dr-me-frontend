import { ErrorCodes } from '@/app/types/errors';

export const ERRORS_GRAPHQL: ErrorCodes = {
  updateMyUser: [
    {
      message: 'This attribute must be unique',
      code: 'uniqueEmail',
    },
  ],
  signUp: [
    {
      message: 'Invalid identifier or password',
      code: 'invalidCredentials',
    },
  ]
};

export const ERRORS_NETWORK = {
  401: 'Response not successful: Received status code 401',
}

export const ERROR_CODES = {
  FORBIDDEN: 'FORBIDDEN',
};
