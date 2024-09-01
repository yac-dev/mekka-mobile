import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type IEmptyView = {
  title: string;
  action?: React.ReactNode;
};

export const EmptyView: React.FC<IEmptyView> = ({ title, action }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {action}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
});
