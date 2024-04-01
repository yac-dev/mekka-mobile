import React, { useState, useEffect, useRef, useContext } from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SpaceTopTabNavigator } from './SpaceTopTabNavigator';
import { Image as ExpoImage } from 'expo-image';
const Tab = createBottomTabNavigator();

export const SpaceBottomTabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator screenOptions={({ navigation, route }) => ({ headerShown: false })}>
        <Tab.Screen name='TagsTopTabNavigator' component={SpaceTopTabNavigator} />
      </Tab.Navigator>
    </View>
  );
};

// bottomtabのcustomization方法
// tabBarStyle: {
//   backgroundColor: 'black',
//   // marginHorizontal: 90,
//   // paddingBottom: 0, // きたー。これよ。これ。
//   // borderRadius: 30,
//   // position: 'absolute',
//   // bottom: 30,
//   // justifyContent: 'center',
//   // alignItems: 'center',
//   height: 60,
//   borderTopWidth: 0,
//   paddingTop: 5,
//   paddingBottom: 5,
//   display: 'none', // ver1では、bottom tabを表示しない様にする。今後のupdateで少し足すかも。。。
// },

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
