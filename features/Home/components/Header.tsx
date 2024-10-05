import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Share, ScrollView } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../navigations';
import { urls } from '../../../settings';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';

export const Header = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();

  const handleInvite = async () => {
    Share.share({
      title: 'Share Var',
      message: `Access here to download Var: ${urls.appStore}${'\n'} and then enter this private key: ${
        currentSpace.secretKey
      }`,
    });
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 10,
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        style={{ width: 55, height: 55, borderRadius: 40, marginRight: 20 }}
        onPress={() => homeStackNavigation.navigate('SpaceInfoStackNavigator')}
        activeOpacity={0.7}
      >
        <ExpoImage
          style={{ width: '100%', height: '100%', borderRadius: 40 }}
          source={{ uri: currentSpace.icon }}
          contentFit='cover'
        />
      </TouchableOpacity>
      <View style={{ flexDirection: 'column' }}>
        <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 20, marginBottom: 8 }}>
          {currentSpace.name}
        </Text>
        {/* <TouchableOpacity
          activeOpacity={0.7}
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 100,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => handleInvite()}
        >
          <VectorIcon.MCI name='human-greeting-variant' size={15} color={'white'} style={{ marginRight: 10 }} />
          <Text style={{ color: 'white', fontSize: 13, textAlign: 'center' }}>Invite Friend</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};
