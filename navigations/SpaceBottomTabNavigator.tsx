import React, { useState, useEffect, useRef, useContext } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SpaceTopTabNavigator } from './SpaceTopTabNavigator';
import { Image as ExpoImage } from 'expo-image';
import { NativeStackNavigatorProps } from '@react-navigation/native-stack/lib/typescript/src/types';

// Define parameters for the screens within SpaceBottomTabNavigator
type SpaceBottomTabNavigatorParams = {
  TagsTopTabNavigator: undefined; // Add other screens as needed
  TagScreen: {
    tagId: string;
  }; // This is for dynamic tag screens
};

const Tab = createBottomTabNavigator();

// backgroundColor: 'black', // marginHorizontal: 90, // paddingBottom: 0, // きたー。これよ。これ。 // borderRadius: 30, height: 60, borderTopWidth: 0, paddingTop: 5, paddingBottom: 5, display: 'none',
export const SpaceBottomTabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black',
            // marginHorizontal: 90,
            // paddingBottom: 0, // きたー。これよ。これ。
            // borderRadius: 30,
            // position: 'absolute',
            // bottom: 30,
            // justifyContent: 'center',
            // alignItems: 'center',
            height: 60,
            borderTopWidth: 0,
            paddingTop: 5,
            paddingBottom: 5,
            display: 'none', // ver1では、bottom tabを表示しない様にする。今後のupdateで少し足すかも。。。
          },
        })}
      >
        <Tab.Screen name='TagsTopTabNavigator' component={SpaceTopTabNavigator} />
      </Tab.Navigator>
    </View>
  );
};

// 後でこれ足すかも。。
{
  /* <Tab.Screen
          name='Post'
          component={CreateNewPostStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color, focused }) => (
              <MaterialCommunityIcons
                name='plus'
                color={focused ? 'white' : 'rgb(100, 100, 100)'}
                size={30}
                style={{ marginBottom: 5 }}
              />
            ),
            tabBarLabel: ({ focused }) => {
              return <Text style={{ color: focused ? 'white' : 'rgb(100, 100, 100)', fontSize: 13 }}>Post</Text>;
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              navigation?.navigate(
                'CreateNewPostStackNavigator',
                { spaceAndUserRelationship }
              );
            },
          })}
        /> */
}
