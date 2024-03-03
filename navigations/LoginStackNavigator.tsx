import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { VectorIcon } from '../Icons';
import { BackgroundColor } from '../themes';
import { Login, ForgotPassword } from '../features';

export const LoginStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Login'
          component={Login}
          options={({}) => ({
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('HomeStackNavigator')}>
                <VectorIcon.II name='close-circle-sharp' size={30} color={BackgroundColor.white} />
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='ForgotPassword'
          component={ForgotPassword}
          options={({}) => ({
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('HomeStackNavigator')}>
                <VectorIcon.II name='close-circle-sharp' size={30} color={BackgroundColor.white} />
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};
