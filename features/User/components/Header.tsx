import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type IHeader = {
  userId: string;
};

export const Header: React.FC<IHeader> = ({ userId }) => {
  return (
    <View style={styles.container}>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
