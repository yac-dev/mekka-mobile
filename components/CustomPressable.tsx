import React, { memo } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

type CustomPressableProps = PressableProps & {
  opacity?: number;
  backgroundColorOnPress?: string;
  style?: StyleProp<ViewStyle>;
};

export const CustomPressable: React.FC<CustomPressableProps> = memo(
  ({ children, opacity = 0.7, backgroundColorOnPress, style, ...props }) => {
    return (
      <Pressable
        {...props}
        style={({ pressed }: PressableStateCallbackType) => [
          pressed && backgroundColorOnPress
            ? { backgroundColor: backgroundColorOnPress }
            : { opacity: pressed ? opacity : 1 },
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }
);
