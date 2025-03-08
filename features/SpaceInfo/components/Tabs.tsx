import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feature, Members } from '.';
import { Activities } from '../pages';

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
                  paddingVertical: 10,
                  marginHorizontal: 5,
                  borderBottomWidth: 1,
                  borderBottomColor: isFocused ? 'white' : null,
                }}
                onPress={onPress}
              >
                <Text style={{ color: isFocused ? 'white' : 'rgb(100,100,100)', fontSize: 17, fontWeight: 'bold' }}>
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
    <View style={{ flex: 1, marginTop: 15, backgroundColor: 'black' }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
        })}
      >
        <Tab.Screen name={'Features'} component={Feature} />
        <Tab.Screen name={'Members'} component={Members} />
        <Tab.Screen name={'Activities'} component={Activities} />
      </Tab.Navigator>
    </View>
  );
};
