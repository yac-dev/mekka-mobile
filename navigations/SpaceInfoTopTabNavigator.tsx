import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import backendAPI from '../apis/backend';
import Feature from '../features/SpaceInfo/pages/Feature';
import Description from '../features/SpaceInfo/pages/Description';
import Members from '../features/SpaceInfo/pages/Members';

const Tab = createMaterialTopTabNavigator();

const SpaceInfoTopTabNavigator = () => {
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
                key={index}
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
      <Tab.Screen name={'Feature'} component={Feature} />
      <Tab.Screen name={'Members'} component={Members} />
      <Tab.Screen name={'Description'} component={Description} />
    </Tab.Navigator>
  );
};

export default SpaceInfoTopTabNavigator;
