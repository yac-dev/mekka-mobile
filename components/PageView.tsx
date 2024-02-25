import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '../themes';

type BlackPageViewProps = {};

export const PageView: React.FC = () => {
  return (
    <View>
      <Text>Page view</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
