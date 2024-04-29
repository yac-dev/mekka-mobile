import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SpaceInfo } from '../features/SpaceInfo/pages/SpaceInfo';
import { Colors } from '../themes/colors';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackNavigatorProps, HomeStackParams } from './HomeStackNavigator';

type SpaceInfoStackParams = {
  SpaceInfo: undefined;
};
export type SpaceInfoStackNavigatorProps = NativeStackNavigationProp<SpaceInfoStackParams>;
const SpaceInfoStack = createNativeStackNavigator();

// : React.FC<NativeStackScreenProps<HomeStackParams, 'SpaceInfoStackNavigator'>>

export const SpaceInfoStackNavigator = () => {
  return (
    <SpaceInfoStack.Navigator>
      <SpaceInfoStack.Screen
        name='SpaceInfo'
        component={SpaceInfo}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='close-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'rgb(30, 30, 30)',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.white,
          },
        })}
      />
    </SpaceInfoStack.Navigator>
  );
};
