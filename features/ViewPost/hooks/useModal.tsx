import React, { useState } from 'react';

export const useModal = () => {
  const [isCommentsModalVisible, setIsCommentsModalVisible] = useState<boolean>(false);

  const handleCommentsModalVisibility = () => {
    setIsCommentsModalVisible((previous) => !previous);
  };

  return {
    isCommentsModalVisible,
    handleCommentsModalVisibility,
  };
};
