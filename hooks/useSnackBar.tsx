import React, { useState } from 'react';
import { SnackBarStatusType, SnackBarType, INITIAL_STATUS_BAR } from '../types';

export const useSnackBar = (): { snackBar: SnackBarType; hideSnackBar: () => void } => {
  const [snackBar, setSnackBar] = useState<SnackBarType>(INITIAL_STATUS_BAR);
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
    hideSnackBar,
  };
};
