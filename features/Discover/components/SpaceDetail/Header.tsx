import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { useGetSpaceByIdState } from '../../hooks/useGetSpaceByIdState';

const Header = () => {
  const { apiResult } = useGetSpaceByIdState();

  return (
    <View style={{ padding: 10 }}>
      <View style={{ width: '100%', height: 200 }}>
        <ExpoImage
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
          source={{ uri: apiResult.data?.space.icon }}
          contentFit='cover'
        />
        <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, marginBottom: 10 }}>{space.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
