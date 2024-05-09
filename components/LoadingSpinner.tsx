import React, { useContext, useState } from 'react';
import { ViewStyle } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Colors } from '../themes';

type LoadingSpinnerProps = {
  isVisible: boolean;
  message: string;
  textColor?: string;
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ isVisible, message, textColor = Colors.white }) => {
  return <Spinner visible={isVisible} textContent={message} textStyle={{ color: textColor }} />;
};
