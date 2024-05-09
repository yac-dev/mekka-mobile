import React, { useState } from 'react';
import { SnackBarStatusType, SnackBarType, INITIAL_SNACK_BAR } from '../types';

export type ShowSnackBarInputType = {
  status: SnackBarStatusType;
  message: string;
  duration: number;
};

export const useSnackBar = (): {
  snackBar: SnackBarType;
  showSnackBar: (status: SnackBarStatusType, message: string, duration: number) => void;
  hideSnackBar: () => void;
} => {
  const [snackBar, setSnackBar] = useState<SnackBarType>(INITIAL_SNACK_BAR);

  const showSnackBar = (status: SnackBarStatusType, message: string, duration: number) => {
    const snackBarOption = {
      isVisible: true,
      status: status,
      message,
      duration,
    };
    setSnackBar(snackBarOption);
  };

  const hideSnackBar = () => {
    setSnackBar({
      isVisible: false,
      status: undefined,
      message: undefined,
      duration: undefined,
    });
  };

  return {
    snackBar,
    showSnackBar,
    hideSnackBar,
  };
};
