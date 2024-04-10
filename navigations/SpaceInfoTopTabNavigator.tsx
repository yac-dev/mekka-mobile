import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import backendAPI from '../apis/backend';
import Feature from '../features/SpaceInfo/pages/Feature';
import Description from '../features/SpaceInfo/pages/Description';
import Members from '../features/SpaceInfo/pages/Members';
import ReportBottomSheet from '../features/SpaceInfo/components/ReportBottomSheet';
import { SpaceType } from '../types';

const Tab = createMaterialTopTabNavigator();

type SpaceInfoTopTabNavigatorProps = {
  space: SpaceType;
};

const SpaceInfoTopTabNavigator: React.FC<SpaceInfoTopTabNavigatorProps> = ({ space }) => {
  const reportBottomSheetRef = useRef(null);

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
                  padding: 15,
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
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
        })}
      >
        {/* bottomrefをpropsで渡して、user tapでbottomを出す。 */}
        <Tab.Screen name={'Feature'}>{() => <Feature space={space} />}</Tab.Screen>
        <Tab.Screen name={'Members'}>{() => <Members space={space} />}</Tab.Screen>
        <Tab.Screen name={'Description'}>{() => <Description space={space} />}</Tab.Screen>
      </Tab.Navigator>
      {/* <ReportBottomSheet reportBottomSheetRef={reportBottomSheetRef} /> */}
    </View>
  );
};

export default SpaceInfoTopTabNavigator;
