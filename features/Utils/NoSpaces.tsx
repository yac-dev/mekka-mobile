import React from 'react';
import { View, Text } from 'react-native';
import SnackBar from '../../components/SnackBar';

const NoSpaces = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 100, marginBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          No Spaces...
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          You haven't joined any spaces now. To get started, open menu from top left corner.
        </Text>
      </View>
      <SnackBar />
    </View>
  );
};

export default NoSpaces;
