import React, { useContext } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../contexts/GlobalContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
const Tab = createBottomTabNavigator();
import { primaryBackgroundColor } from '../themes/color';
import { icons } from '../utils/icons';
import MySpaces from '../features/Home/pages/Home';
import Mekkas from '../features/Discover/pages/Discover';
import HomeStackNavigator from './HomeStackNavigator';
import DiscoverStackNavigator from './DiscoverStackNavigator';
import SpaceMenuBottomSheet from '../features/Space/pages/SpaceMenuBottomSheet';
import Dummy from '../features/Utils/Dummy';
import Dummy2 from '../features/Space/pages/Dummy2';
const { MCI, MI, ET } = icons;

const BottomTab: React.FC = () => {
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarStyle: {
          backgroundColor: primaryBackgroundColor,
          borderTopWidth: 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        title: 'Mekka',
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: 'black',
          borderBottomWidth: 0,
        },
        tabBarLabel: 'Home',
        headerRight: () => {
          return (
            // 今はこれでとりあえず。
            <View style={{ flexDirection: 'row' }}>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => console.log('hello')}>
                <ET name='bell' size={25} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 10 }} onPress={() => console.log('hello')}>
                <MCI name='account-circle' size={25} color={'white'} />
              </TouchableOpacity>
            </View>
          );
        },
      })}
    >
      <Tab.Screen
        name='HomeStackNavigator'
        component={HomeStackNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          title: 'Mekka',
          headerTintColor: 'white',
          headerStyle: {
            backgroundColor: 'black',
            borderBottomWidth: 0,
          },
          tabBarLabel: 'Home',
          tabBarStyle: {
            backgroundColor: 'black',
            borderTopWidth: 0,
          },
          tabBarIcon: ({ size, color, focused }) => (
            <MI name='apps' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name='DiscoverStackNavigator'
        component={DiscoverStackNavigator}
        options={({ navigation }) => ({
          headerShown: true,
          tabBarIcon: ({ size, color, focused }) => (
            <MCI name='compass' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
          ),
          title: 'Discover',
        })}
      />
      {/* <Tab.Screen
          name='DiscoverStackNavigator'
          component={DiscoverStackNavigator}
          options={({ navigation }) => ({
            headerShown: true,
            tabBarIcon: ({ size, color, focused }) => (
              <MCI name='compass' color={focused ? 'white' : 'rgb(102, 104, 109)'} size={size} />
            ),
            title: 'Discover',
          })}
        /> */}
    </Tab.Navigator>
    // </GestureHandlerRootView>
  );
};

export default BottomTab;
