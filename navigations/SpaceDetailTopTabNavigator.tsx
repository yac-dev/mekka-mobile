import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import backendAPI from '../apis/backend';
import About from '../features/Discover/pages/About';
import Members from '../features/Discover/pages/Members';
import Posts from '../features/Discover/pages/Posts';
import Tags from '../features/Discover/pages/Tags';

const Tab = createMaterialTopTabNavigator();

const SpaceDetailTopTabNavigator = () => {
  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ alignItems: 'center', marginBottom: 15 }}>
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
                style={{
                  alignItems: 'center',
                  // backgroundColor: isFocused ? 'rgb(110,110,110)' : null,
                  padding: 15,
                  // borderRadius: 20,
                  borderBottomWidth: isFocused && 1,
                  borderBottomColor: isFocused && 'white',
                }}
                onPress={onPress}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>{label}</Text>
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
      <Tab.Screen name={'About'} component={About} />
      <Tab.Screen name={'Posts'} component={Posts} />
      <Tab.Screen name={'Tags'} component={Tags} />
      <Tab.Screen name={'Members'} component={Members} />
    </Tab.Navigator>
  );
};

export default SpaceDetailTopTabNavigator;
