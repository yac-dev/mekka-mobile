import React, { useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import { useLoadMe } from '../hooks';
import { AuthContext } from '../../../providers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import HomeStackNavigator from '../../../navigations/HomeStackNavigator';

export const Booting = () => {
  const { auth } = useContext(AuthContext);
  const { apiResult, requestApi: requestLoadMe } = useLoadMe();

  useEffect(() => {
    requestLoadMe();
  }, []);

  useEffect(() => {
    if (auth) {
      // ここでgetSpacesをやる。
    }
  }, [auth]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HomeStackNavigator'
          component={HomeStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
