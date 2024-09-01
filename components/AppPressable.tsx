import React, { memo } from 'react';
import { Pressable, PressableProps, PressableStateCallbackType, StyleProp, ViewStyle } from 'react-native';

export type IAppPressable = PressableProps & {
  opacity?: number;
  backgroundColorOnPress?: string;
  style?: StyleProp<ViewStyle>;
};

export const AppPressable: React.FC<IAppPressable> = memo(
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
