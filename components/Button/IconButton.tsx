import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

type IconButtonProps = {
  children: React.ReactNode;
  onPressButton: () => void;
  style?: ViewStyle;
};

export const IconButton: React.FC<IconButtonProps> = ({ children, onPressButton, style }) => {
  return (
    <TouchableOpacity style={style} onPress={() => onPressButton()}>
      {children}
    </TouchableOpacity>
  );
};
