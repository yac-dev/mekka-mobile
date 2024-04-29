import React, { useContext, useCallback, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, Share, Platform, ScrollView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SpaceInfoTopTabNavigator } from '../../../navigations/SpaceInfoTopTabNavigator';
import { SpaceInfoContext } from '../contexts/SpaceInfoContext';
import { Image as ExpoImage } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { SpaceInfoStackNavigatorProps } from '../../../navigations';
import { SpaceType } from '../../../types';
import { CurrentSpaceContext } from '../../../providers';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { AppButton } from '../../../components';
import { Members } from '../components';

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
