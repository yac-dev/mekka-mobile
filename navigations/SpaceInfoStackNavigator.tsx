import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SpaceInfo } from '../features/SpaceInfo/pages/SpaceInfo';
import { Colors } from '../themes/colors';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackNavigatorProps, HomeStackParams } from './HomeStackNavigator';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';

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
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='close' size={18} color={Colors.white} />
            </AppButton.Icon>
          ),
          headerRight: () => (
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='ellipsis-horizontal' size={18} color={Colors.white} />
            </AppButton.Icon>
          ),
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'black',
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
