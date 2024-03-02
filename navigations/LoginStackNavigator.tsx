import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { VectorIcon } from '../Icons';
import { BackgroundColor } from '../themes';

export const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Login'
          component={EditAccount}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <VectorIcon.II name='close-circle-sharp' size={30} color={BackgroundColor.primary} />
              </TouchableOpacity>
            ),
            headerTitle: 'Login',
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
