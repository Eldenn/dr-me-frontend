import { t } from "i18next";
import { ErrorCodes } from "@/app/types/errors";

export const ERRORS: ErrorCodes = {
  'FORBIDDEN': t('error.forbidden'),
  'BAD_USER_INPUT': t('error.badUserInput'),
};
