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

export const SpaceInfoStackNavigator: React.FC<NativeStackScreenProps<HomeStackParams, 'SpaceInfoStackNavigator'>> = ({
  route,
}) => {
  const { space } = route.params;

  return (
    <SpaceInfoStack.Navigator>
      <SpaceInfoStack.Screen
        name='SpaceInfo'
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
      >
        {(props) => <SpaceInfo space={space} {...props} />}
      </SpaceInfoStack.Screen>
    </SpaceInfoStack.Navigator>
  );
};
