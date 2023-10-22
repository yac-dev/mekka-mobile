import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../../apis/backend';

const Dummy = (props) => {
  // const route = useRoute();
  // const tagId = route.params.relationship; // Access the tagId parameter

  console.log('hello from dummy1');

  const a = async () => {
    const v = await backendAPI.get('http://192.168.11.30:3500/');
    console.log('success');
  };

  useEffect(() => {
    a();
  }, []);
  return (
    <View>
      <Text>Dummy</Text>
    </View>
  );
};

export default Dummy;
