import React, { useState, useCallback } from 'react';

type UseLoadingSpinnerOutputType = {
  isVisibleLoadingSpinner: boolean;
  showLoadingSpinner: () => void;
  hideLoadingSpinner: () => void;
};

export const useLoadingSpinner = (): UseLoadingSpinnerOutputType => {
  const [isVisibleLoadingSpinner, setIsVisibleLoadingSpinner] = useState(false);

  const showLoadingSpinner = useCallback(() => {
    setIsVisibleLoadingSpinner(true);
  }, []);

  const hideLoadingSpinner = useCallback(() => {
    setIsVisibleLoadingSpinner(false);
  }, []);

  return {
    isVisibleLoadingSpinner,
    showLoadingSpinner,
    hideLoadingSpinner,
  };
};
