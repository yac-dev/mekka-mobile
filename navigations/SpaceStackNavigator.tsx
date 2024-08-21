import React from 'react';
import { CreateNewPostStackNavigator } from '../features';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SpaceInfoStackNavigator } from './SpaceInfoStackNavigator';
import { Colors } from '../themes/colors';
import { Space } from '../features';
import { ViewPostStackNavigator } from '../features/ViewPost/navigations/ViewPostStackNavigator';
import { PostType, SpaceType } from '../types';
import { CreatedTagType } from '../features/CreateNewPost/contexts';
import { useCreatePushNotificationsResult } from '../api/hooks';

export type ViewPostStackNavigatorParams = {
  ViewPost: {
    posts: PostType[];
    index: number;
  };
  ViewGridPost: undefined;
  ViewRegionPost: undefined;
  CommentsPage: undefined;
  ReportPost: undefined;
  ReportComment: undefined;
};

export type CreateNewPostStackParams = {
  SelectPostType: undefined;
  NormalPost: undefined;
  AddTags?: {
    createdTag: CreatedTagType;
  };
  AddLocation: undefined;
  MomentPost: undefined;
  CreateNewTag: undefined;
};

export type SpaceStackParams = {
  Space: {
    space: SpaceType;
  };
  CreateNewPostStackNavigator: NavigatorScreenParams<CreateNewPostStackParams>;
  ViewPostStackNavigator: NavigatorScreenParams<ViewPostStackNavigatorParams>;
  SpaceInfoStackNavigator: undefined;
};

export type SpaceStackNavigatorProps = NativeStackNavigationProp<SpaceStackParams>;
export type ViewPostStackNavigatorProps = NativeStackNavigationProp<ViewPostStackNavigatorParams>;

type SpaceTopTabNavigatorParams = {
  [key: string]: NavigatorScreenParams<PostsTopTabNavigatorParams>;
};

type PostsTopTabNavigatorParams = {
  GridView: undefined;
  MapView: undefined;
};

const SpaceStack = createNativeStackNavigator<SpaceStackParams>();

export const SpaceStackNavigator: React.FC = () => {
  // NOTE: これは逆にこの後使うぞ。。。
  // const { requestCreatePushNotifications } = useCreatePushNotificationsResult();
  // requestCreatePushNotifications({
  //   postId: createPostResult.data?.post._id,
  //   spaceId: currentSpace._id,
  //   userId: auth._id,
  // });

  return (
    <SpaceStack.Navigator
      screenOptions={({ navigation }) => ({
        headerShown: false,
      })}
    >
      <SpaceStack.Group>
        <SpaceStack.Screen name='Space' component={Space} />
      </SpaceStack.Group>
      <SpaceStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <SpaceStack.Screen
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
        <SpaceStack.Screen
          name='ViewPostStackNavigator'
          component={ViewPostStackNavigator}
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
      </SpaceStack.Group>
      <SpaceStack.Group screenOptions={{ presentation: 'modal' }}>
        <SpaceStack.Screen
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
      </SpaceStack.Group>
    </SpaceStack.Navigator>
  );
};
