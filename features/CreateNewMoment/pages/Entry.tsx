import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export const Entry = () => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>
        Adding caption, tags, location to share your photos/videos with your peers.
      </Text>

      <TouchableOpacity style={{ alignSelf: 'center', padding: 10, borderRadius: 10, backgroundColor: 'red' }}>
        <Text style={{ color: 'white' }}>Get started</Text>
      </TouchableOpacity>
    </View>
  );
};
