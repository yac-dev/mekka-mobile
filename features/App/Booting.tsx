import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { useBootApp } from '../../hooks';
import { AuthContext } from '../../providers';

export const Booting = () => {
  const { auth } = useContext(AuthContext);
  const { loadMe } = useBootApp();

  useEffect(() => {
    loadMe();
  }, []);

  useEffect(() => {
    if (auth) {
      // ここで、
    }
  }, [auth]);

  return (
    <View>
      <Text></Text>
    </View>
  );
};
