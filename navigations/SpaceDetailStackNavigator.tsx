import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { primaryBackgroundColor } from '../themes/color';
import SpaceDetail from '../features/Discover/pages/SpaceDetail';
import Members from '../features/Discover/pages/Members';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../themes';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';

export const SpaceDetailStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SpaceDetail'
        component={SpaceDetail}
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
          headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      />
      <Stack.Screen
        name='Members'
        component={Members}
        options={({ navigation }) => ({
          headerLeft: () => (
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
            </AppButton.Icon>
          ),
          headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      />
    </Stack.Navigator>
  );
};
