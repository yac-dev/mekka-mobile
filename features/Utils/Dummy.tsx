import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../../apis/backend';

const Dummy = (props) => {
  // const route = useRoute();
  // const tagId = route.params.relationship; // Access the tagId parameter
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Text style={{ color: 'white', padding: 20 }}>Dummy</Text>
    </View>
  );
};

export default Dummy;
