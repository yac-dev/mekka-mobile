import React, { ReactNode } from 'react';
import { View, Text, ViewStyle, Platform, TouchableOpacity } from 'react-native';
import { Colors } from '../../themes';

type IconButtonProps = {
  children: ReactNode;
  customStyle?: ViewStyle;
  onButtonPress: () => void;
  isPressDisabled?: boolean;
  hasShadow: boolean;
};

const shadow = {
  ...Platform.select({
    ios: {
      shadowColor: 'black',
      shadowOffset: { width: 5, height: 5 },
      shadowOpacity: 0.5,
      shadowRadius: 8,
    },
    android: {
      elevation: 5,
    },
  }),
};

const baseStyle: ViewStyle = {
  width: 44,
  height: 44,
  borderRadius: 22,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Colors.white,
};

export const IconButton: React.FC<IconButtonProps> = ({
  children,
  onButtonPress,
  customStyle,
  isPressDisabled,
  hasShadow = false,
}) => {
  const processingBackgroundColorStyle: ViewStyle = isPressDisabled && { backgroundColor: Colors.black90 };
  const shadowStyle: ViewStyle = hasShadow && shadow;

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[baseStyle, customStyle, processingBackgroundColorStyle, shadowStyle]}
      // disabled={isPressDisabled}
      onPress={onButtonPress}
    >
      {children}
    </TouchableOpacity>
  );
};
