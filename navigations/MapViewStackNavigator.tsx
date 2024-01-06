import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { primaryTextColor } from '../themes/text';
import { Ionicons } from '@expo/vector-icons';
import TagView from '../features/Space/pages/TagView';
import ViewPost from '../features/ViewPost/pages/ViewPost';
import backendAPI from '../apis/backend';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { GlobalContext } from '../contexts/GlobalContext';
import { TagViewContext } from '../features/Space/contexts/TagViewContext';
import { Video } from 'expo-av';
import ViewPostStackNavigator from './ViewPostStackNavigator';
import { Image as ExpoImage } from 'expo-image';
import Map from '../features/MapView/pages/Map';
const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const MapViewStackNavigator: React.FC = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Map'
            component={Map}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen
            name='ViewPostStackNavigator'
            component={ViewPostStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              // headerTransparent: true,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: primaryTextColor,
              },
            })}
          />
        </Stack.Group>
      </Stack.Navigator>
    </View>
  );
};

export default MapViewStackNavigator;
