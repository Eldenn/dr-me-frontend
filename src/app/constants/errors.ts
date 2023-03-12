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
  ],
  changePassword: [
    {
      message: 'Your new password must be different than your current password',
      code: 'samePasswordThanCurrent',
    },
    {
      message: 'The provided current password is invalid',
      code: 'currentPasswordInvalid',
    },
    {
      message: 'Passwords do not match',
      code: 'passwordsDoNotMatch',
    },
    {
      message: 'password must be at least 6 characters',
      code: 'passwordTooShort',
    }
  ],
};

export const ERRORS_NETWORK = {
  401: 'Response not successful: Received status code 401',
}

export const ERROR_CODES = {
  FORBIDDEN: 'FORBIDDEN',
};
