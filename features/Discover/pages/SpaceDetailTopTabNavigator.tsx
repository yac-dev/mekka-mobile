import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import backendAPI from '../../../apis/backend';
import { Feature } from './Feature';
import { Members } from './Members';
import Posts from './Posts';
import { Tags } from './Tags';

const Tab = createMaterialTopTabNavigator();

export const SpaceDetailTopTabNavigator = () => {
  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingBottom: 10,
                }}
                onPress={onPress}
              >
                <Text style={{ color: isFocused ? 'white' : 'rgb(170,170,170)', fontSize: 17, fontWeight: 'bold' }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        lazy: true,
        swipeEnabled: false,
      })}
    >
      <Tab.Screen name={'Feature'} component={Feature} />
      <Tab.Screen name={'Members'} component={Members} />
      <Tab.Screen name={'Tags'} component={Tags} />
    </Tab.Navigator>
  );
};
