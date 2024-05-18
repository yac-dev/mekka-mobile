import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const EULAText = () => {
  return (
    <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
      <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
        <Text style={{ color: 'rgb(150,150,150)' }}>By signing up, you accept and read Mekka's&nbsp;</Text>
        <TouchableOpacity
          style={{ borderBottomWidth: 0.5, borderBottomColor: 'rgb(150, 150,150)' }}
          onPress={() => console.log()}
        >
          <Text style={{ color: 'rgb(150,150,150)' }}>EULA.</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
