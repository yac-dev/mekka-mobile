import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { SpaceDetailContext } from '../../contexts/SpaceDetailContext';

const Header = () => {
  const { space } = useContext(SpaceDetailContext);

  return (
    <View style={{ padding: 10 }}>
      <View style={{ width: '100%', height: 200 }}>
        <FastImage
          source={{ uri: space.icon }}
          style={{ width: '100%', height: '100%', borderRadius: 10 }}
          resizeMode='cover'
        />
        <View style={{ position: 'absolute', bottom: 10, left: 10 }}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 24, marginBottom: 10 }}>{space.name}</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
