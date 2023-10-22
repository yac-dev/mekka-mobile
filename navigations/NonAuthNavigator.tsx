import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ProfileHome from '../features/Profile/pages/Home';
import { Ionicons } from '@expo/vector-icons';
import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';
import Login from '../features/NotAuthenticated/pages/Login';
import Signup from '../features/NotAuthenticated/pages/Signup';

const NonAuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={({ navigation }) => ({ headerShown: false })}>
      <Stack.Group>
        <Stack.Screen name='Welcome' component={WelcomePage}></Stack.Screen>
        <Stack.Screen
          name='Login'
          component={Login}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
        ></Stack.Screen>
        <Stack.Screen
          name='Signup'
          component={Signup}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
        ></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default NonAuthNavigator;
