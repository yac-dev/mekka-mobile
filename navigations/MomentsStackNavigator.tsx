import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { SpaceInfo } from '../features/SpaceInfo/pages/SpaceInfo';
import { Colors } from '../themes/colors';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackNavigatorProps, HomeStackParams } from './HomeStackNavigator';
import { Moments } from '../features/Moments/pages/Moments';
import { ViewPostStackNavigator } from './ViewPostStackNavigator';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';

type MomentsStackParams = {
  Moments: undefined;
  ViewPostStackNavigator: undefined;
};
export type MomentsStackNavigatorProps = NativeStackNavigationProp<MomentsStackParams>;
const MomentsStack = createNativeStackNavigator();

// : React.FC<NativeStackScreenProps<HomeStackParams, 'SpaceInfoStackNavigator'>>

export const MomentsStackNavigator = () => {
  return (
    <MomentsStack.Navigator>
      <MomentsStack.Screen
        name='Moments'
        component={Moments}
        options={({ navigation }) => ({
          // headerShown: false,
          headerLeft: () => (
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
            </AppButton.Icon>
          ),
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
      <MomentsStack.Screen
        name='ViewPostStackNavigator'
        component={ViewPostStackNavigator}
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
    </MomentsStack.Navigator>
  );
};
