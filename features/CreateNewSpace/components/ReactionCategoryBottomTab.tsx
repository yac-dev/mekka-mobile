import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { EmojisByCategory } from '.';
import Stickers from '../pages/Stickers';
import { VectorIcon } from '../../../Icons';

const Tab = createBottomTabNavigator();

const emojiCategories = ['People', 'Symbols', 'Nature', 'Food', 'Activity', 'Travel', 'Objects', 'Flags'];

export const ReactionCategoryBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName='People'
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'rgb(40,40,40)',
          // marginHorizontal: 90,
          // paddingBottom: 0, // きたー。これよ。これ。
          // borderRadius: 30,
          height: 60,
          borderTopWidth: 0,
          paddingTop: 5,
          paddingBottom: 5,
          // position: 'absolute',
          // bottom: 30,
          // justifyContent: 'center',
          // alignItems: 'center',
        },
      }}
    >
      <Tab.Group>
        <Tab.Screen
          name='Stickers'
          component={Stickers}
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.II name='hammer' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        />
        <Tab.Screen
          name='People'
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.FI name='smiley' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        >
          {(props) => <EmojisByCategory category={'people'} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name='Symbols'
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.II name='heart' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        >
          {(props) => <EmojisByCategory category={'symbols'} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name='Nature'
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.MCI name='dog' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        >
          {(props) => <EmojisByCategory category={'nature'} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name='Food'
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.II name='pizza' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        >
          {(props) => <EmojisByCategory category={'food'} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name='Activity'
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.II name='tennisball' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        >
          {(props) => <EmojisByCategory category={'activity'} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name='Travel'
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.MI name='flight' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        >
          {(props) => <EmojisByCategory category={'travel'} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name='Objects'
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.FD name='telephone' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        >
          {(props) => <EmojisByCategory category={'objects'} {...props} />}
        </Tab.Screen>
        <Tab.Screen
          name='Flags'
          options={({ navigation, route }) => ({
            tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <VectorIcon.ETP name='globe' color={focused ? 'white' : 'rgb(120,120,120)'} size={25} />
            ),
          })}
        >
          {(props) => <EmojisByCategory category={'flags'} {...props} />}
        </Tab.Screen>
      </Tab.Group>
    </Tab.Navigator>
  );
};
