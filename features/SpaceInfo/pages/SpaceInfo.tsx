import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Share, Platform, ScrollView } from 'react-native';
import { SpaceInfoTopTabNavigator } from '../../../navigations/SpaceInfoTopTabNavigator';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { SpaceInfoStackNavigatorProps } from '../../../navigations';
import { CurrentSpaceContext } from '../../../providers';

export const SpaceInfo = () => {
  const { currentSpace } = useContext(CurrentSpaceContext);
  const navigation = useNavigation<SpaceInfoStackNavigatorProps>();

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <ExpoImage
            style={{ width: 80, height: 80, borderRadius: 40, marginRight: 20 }}
            source={{ uri: currentSpace.icon }}
            contentFit='cover'
          />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 25,
            }}
          >
            {currentSpace.name}
          </Text>
        </View>
      </View>
      <SpaceInfoTopTabNavigator />
    </View>
  );
};
