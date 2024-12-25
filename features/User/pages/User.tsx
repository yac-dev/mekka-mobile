import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { UserStackNavigatorParams } from '../navigations/UserStackNavigation';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// type UserScreenProps = NativeStackScreenProps<UserStackNavigatorParams, 'User'>;
type IUser = {
  userId: string;
};

export const User: React.FC<IUser> = ({ userId }) => {
  return (
    <View style={styles.container}>
      <Text style={{ color: 'red' }}>This is the User page</Text>
      <Text style={{ color: 'white' }}>{userId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
