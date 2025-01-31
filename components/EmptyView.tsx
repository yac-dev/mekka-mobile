import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type IEmptyView = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  action?: React.ReactNode;
};

export const EmptyView: React.FC<IEmptyView> = ({ icon, title, action, subtitle }) => {
  return (
    <View style={styles.container}>
      {icon}
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
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
    marginBottom: 10,
    color: 'white',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 30,
    color: 'rgb(170,170,170)',
    textAlign: 'center',
  },
});
