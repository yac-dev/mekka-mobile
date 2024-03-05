import React, { useContext, useState } from 'react';
import { ViewStyle } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

type SpinningIndicatorProps = {
  isVisible: boolean;
  message: string;
  textColor?: string;
};

export const SpinningIndicator: React.FC<SpinningIndicatorProps> = ({ isVisible, message, textColor }) => {
  return <Spinner visible={isVisible} textContent={message} textStyle={{ color: textColor }} />;
};
