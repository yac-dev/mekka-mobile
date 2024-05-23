import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { primaryBackgroundColor } from '../themes/color';
import SpaceDetail from '../features/Discover/pages/SpaceDetail';
import Members from '../features/Discover/pages/Members';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../themes';

const SpaceDetailStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SpaceDetail'
        component={SpaceDetail}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons name='close-circle-sharp' size={30} color={'white'} />
            </TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'rgb(38, 38, 38)',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.white,
          },
        })}
      />
      <Stack.Screen
        name='Members'
        component={Members}
        options={({ navigation }) => ({
          // headerLeft: () => (
          //   <TouchableOpacity onPress={() => navigation.goBack()}>
          //     <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
          //   </TouchableOpacity>
          // ),
          // headerShown: true,
          // headerTitle: 'Space detail',
          // headerStyle: {
          //   backgroundColor: primaryBackgroundColor,
          // },
          // headerTitleStyle: {
          //   fontWeight: 'bold',
          //   color: primaryTextColor,
          // },
        })}
      />
    </Stack.Navigator>
  );
};

export default SpaceDetailStackNavigator;
