import React, { useContext, useState } from 'react';
import { ViewStyle } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

type SpinningIndicatorProps = {
  isVisible: boolean;
  message: string;
  textStyle?: ViewStyle;
};

export const SpinningIndicator: React.FC<SpinningIndicatorProps> = ({ isVisible, message, textStyle }) => {
  return <Spinner visible={isVisible} textContent={message} textStyle={textStyle} />;
};
