import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import SpaceDetail from '../features/Discover/pages/SpaceDetail';
import Members from '../features/Discover/pages/Members';
import { Ionicons } from '@expo/vector-icons';

const SpaceDetailStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='SpaceDetail'
        component={SpaceDetail}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{
                backgroundColor: 'white',
                borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center',
                padding: 5,
              }}
            >
              <Ionicons name='close' size={20} color={'black'} />
              <Text style={{ color: 'black', fontWeight: 'bold' }}>Close</Text>
            </TouchableOpacity>
          ),
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'rgb(38, 38, 38)',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: primaryTextColor,
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
