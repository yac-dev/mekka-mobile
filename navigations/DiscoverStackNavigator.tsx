import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import Discover from '../features/Discover/pages/Discover';
import { SpaceDetailStackNavigator } from './SpaceDetailStackNavigator';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';

export type SpaceDetailStackNavigatorScreens = {
  SpaceDetail: undefined;
};

type DiscoverStackNavigatiorScreens = {
  Discover: undefined;
  SpaceDetailStackNavigator: { _id: string };
};

const DiscoverStack = createNativeStackNavigator<DiscoverStackNavigatiorScreens>();

export type DiscoverStackNavigatorProp = NativeStackNavigationProp<DiscoverStackNavigatiorScreens>;

export const DiscoverStackNavigator: React.FC = () => {
  return (
    <DiscoverStack.Navigator>
      <DiscoverStack.Group>
        <DiscoverStack.Screen
          name='Discover'
          component={Discover}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </DiscoverStack.Group>
      <DiscoverStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <DiscoverStack.Screen
          name='SpaceDetailStackNavigator'
          component={SpaceDetailStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            // こっちはheader見せないで、spaceDetail側でheaderを見せる様にするかね。
          })}
        />
      </DiscoverStack.Group>
    </DiscoverStack.Navigator>
  );
};
