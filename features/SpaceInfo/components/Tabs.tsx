import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feature, Members } from '.';

const Tab = createMaterialTopTabNavigator();

type SpaceInfoTopTabNavigatorProps = {};

export const Tabs: React.FC<SpaceInfoTopTabNavigatorProps> = () => {
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
    <View style={{ flex: 1, marginTop: 15 }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
        })}
      >
        <Tab.Screen name={'About'} component={Feature} />
        <Tab.Screen name={'Members'} component={Members} />
      </Tab.Navigator>
    </View>
  );
};
