import { ToastStatusConstant } from '@/app/types/toast';
import { ToastPosition } from '@chakra-ui/react';

export const TOAST_DURATION = 3000;
export const TOAST_IS_CLOSABLE = true;
export const TOAST_STATUS: ToastStatusConstant = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};
export const TOAST_POSITION: ToastPosition = 'top';
