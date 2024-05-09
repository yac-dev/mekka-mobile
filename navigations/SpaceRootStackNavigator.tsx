import React, { useState, useEffect, useContext } from 'react';
import { View } from 'react-native';
import { GlobalContext } from '../contexts/GlobalContext';
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthContext, CurrentSpaceContext, CurrentTagContext, MySpacesContext } from '../providers';
import { SnackBarContext } from '../providers';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';
import { useGetTags } from '../features/Space/hooks/useGetTags';
import { NavigatorScreenParams } from '@react-navigation/native';
import * as Haptics from 'expo-haptics';
import { Colors } from '../themes/colors';
import { SpaceTopTabNavigator } from './SpaceTopTabNavigator';
import { SpaceInfoStackNavigator } from './SpaceInfoStackNavigator';

export type SpaceRootStackNavigatorProp = NativeStackNavigationProp<SpaceRootStackParams>;

export type SpaceRootStackParams = {
  TagsTopTabNavigator: NavigatorScreenParams<SpaceTopTabNavigatorParams>;
  CreateNewPostStackNavigator: undefined;
  MomentsStackNavigator: undefined;
  SpaceInfoStackNavigator: undefined;
};

type SpaceTopTabNavigatorParams = {
  [key: string]: NavigatorScreenParams<PostsTopTabNavigatorParams>;
};

type PostsTopTabNavigatorParams = {
  GridView: undefined;
  MapView: undefined;
};

const SpaceRootStack = createNativeStackNavigator<SpaceRootStackParams>();

export const SpaceRootStackNavigator: React.FC = () => {
  const { createPostResult } = useContext(SpaceRootContext);
  const { setMySpaces } = useContext(MySpacesContext);
  const { currentSpace } = useContext(CurrentSpaceContext);

  useEffect(() => {
    if (createPostResult.status === 'success' && createPostResult.data?.createdTags) {
      // 新しく作ったtagをここに追加する。
      setMySpaces((previous) => {
        const updatingSpace = [...previous].map((space) => {
          if (space._id === currentSpace._id) {
            space.tags.push(...createPostResult.data?.createdTags);
          }
          return space;
        });
        return updatingSpace;
      });
    }
  }, [createPostResult]);
  // reloadでpropsの影響でバグる。

  return (
    <View style={{ flex: 1 }}>
      <SpaceRootStack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
        })}
      >
        <SpaceRootStack.Group>
          <SpaceRootStack.Screen name='TagsTopTabNavigator' component={SpaceTopTabNavigator} />
        </SpaceRootStack.Group>
        <SpaceRootStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <SpaceRootStack.Screen
            name='CreateNewPostStackNavigator'
            component={CreateNewPostStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
        </SpaceRootStack.Group>
        <SpaceRootStack.Group screenOptions={{ presentation: 'modal' }}>
          <SpaceRootStack.Screen
            name='SpaceInfoStackNavigator'
            component={SpaceInfoStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
        </SpaceRootStack.Group>
      </SpaceRootStack.Navigator>
    </View>
  );
};
