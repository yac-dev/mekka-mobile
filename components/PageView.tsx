import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle } from 'react-native';

type IPageView = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
};

export const PageView: React.FC<IPageView> = ({ style = styles.container, children }) => {
  return <View style={style}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
});
