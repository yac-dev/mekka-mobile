import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import ViewPost from '../features/ViewPost/pages/ViewPost';
import CommentsPage from '../features/Comments/pages/CommentsPage';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../contexts/GlobalContext';
import FastImage from 'react-native-fast-image';

const ViewPostStackNavigator = () => {
  const { currentTagObject } = useContext(GlobalContext);

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
          name='ViewPost'
          component={ViewPost}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTransparent: true,
            headerTitle: () => (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <FastImage
                  source={{ uri: currentTagObject.tag.icon }}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                  tintColor={currentTagObject.tag.iconType === 'icon' ? currentTagObject.tag.color : null}
                />
                <Text style={{ color: 'white', fontSize: 20 }}>{currentTagObject.tag.name}</Text>
              </View>
            ),
            // headerStyle: {
            //   backgroundColor: 'black',
            // },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <Stack.Screen
          name='CommentsPage'
          component={CommentsPage}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
        {/* all comments */}
        {/* all reactions */}
      </Stack.Group>
      {/* postのreport機能ね。 */}
      {/* <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          <Stack.Screen
            name='ViewPost'
            component={ViewPost}
            options={({ navigation }) => ({
              headerShown: true,
              // headerTransparent: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: primaryTextColor,
              },
            })}
          />
        </Stack.Group> */}
    </Stack.Navigator>
  );
};

export default ViewPostStackNavigator;
