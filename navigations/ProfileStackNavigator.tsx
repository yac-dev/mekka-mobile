import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ProfileHome from '../features/Profile/pages/Home';
import { Ionicons } from '@expo/vector-icons';

const ProfileStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        // bottomSheetをやめた。
        name='Profile'
        component={ProfileHome}
        options={({ navigation }) => ({
          // headerShown: true,
          headerShown: false,
          headerLeft: () => {
            return (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            );
          },
          // title: 'Mekka',
          // headerTintColor: 'red',
          // headerStyle: {
          //   backgroundColor: 'black',
          //   borderBottomWidth: 0,
          // },
          // tabBarLabel: 'Home',
          // tabBarStyle: {
          //   backgroundColor: 'black',
          //   borderTopWidth: 0,
          // },
        })}
      />
    </Stack.Navigator>
  );
};

export default ProfileStackNavigator;
