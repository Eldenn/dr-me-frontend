import { ErrorCodes } from '@/app/types/errors';

export const ERRORS: ErrorCodes = {
  updateMyUser: [
    {
      message: 'This attribute must be unique',
      code: 'uniqueEmail',
    },
  ],
};
