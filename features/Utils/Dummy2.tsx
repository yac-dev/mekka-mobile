import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import backendAPI from '../../../apis/backend';

const Dummy2 = () => {
  console.log('hello from dummy2');

  const a = async () => {
    const v = await backendAPI.get('http://192.168.11.30:3500/');
    console.log('success');
  };

  useEffect(() => {
    a();
  }, []);
  return (
    <View>
      <Text>ko</Text>
    </View>
  );
};

export default Dummy2;
