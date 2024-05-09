import React, { useState, useContext } from 'react';
import { View } from 'react-native';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions } from '@react-navigation/material-top-tabs';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';
import { GridView } from '../features/Space/components/GridView';
import { MapPosts } from '../features/Space/components/MapPosts';

const Tab = createMaterialTopTabNavigator();

const screenOptions: MaterialTopTabNavigationOptions = {
  lazy: true,
  swipeEnabled: false,
  animationEnabled: true,
};

export const TagScreenTopTabNavigator: React.FC = () => {
  const { viewPostsType } = useContext(SpaceRootContext);

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={() => null}
        screenOptions={screenOptions}
        initialRouteName={viewPostsType === 'grid' ? 'GridView' : 'MapView'}
      >
        <Tab.Screen name='GridView'>{() => <GridView />}</Tab.Screen>
        <Tab.Screen name='MapView'>{() => <MapPosts />}</Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};
