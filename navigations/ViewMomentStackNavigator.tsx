import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ViewMoment from '../features/ViewMoment/pages/ViewMoment';
import CommentsPage from '../features/Comments/pages/CommentsPage';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../contexts/GlobalContext';
import FastImage from 'react-native-fast-image';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import backendAPI from '../apis/backend';

const ViewMomentStackNavigator = () => {
  const { isIpad } = useContext(GlobalContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  return (
    <Stack.Navigator
      screenOptions={({ navigation, route }) => ({
        tabBarStyle: {
          backgroundColor: 'black',
          headerStyle: {
            backgroundColor: 'black',
          },
        },
      })}
    >
      <Stack.Group>
        <Stack.Screen
          name='ViewMoment'
          component={ViewMoment}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTransparent: true,
            headerTitle: '',
            // headerStyle: {
            //   backgroundColor: 'black',
            // },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default ViewMomentStackNavigator;
