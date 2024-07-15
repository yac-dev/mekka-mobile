import React, { useEffect, useContext } from 'react';
import { View } from 'react-native';
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { CurrentSpaceContext, MySpacesContext } from '../providers';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';
import { NavigatorScreenParams } from '@react-navigation/native';
import { Colors } from '../themes/colors';
import { SpaceTopTabNavigator } from './SpaceTopTabNavigator';
import { SpaceInfoStackNavigator } from './SpaceInfoStackNavigator';
import { useSnackBar } from '../hooks';
import { SnackBar } from '../components';
import { showMessage } from 'react-native-flash-message';
import { SpaceRootProvider } from '../features/Space/providers/SpaceRootProvider';
import { Space } from '../features';
import { ViewPostStackNavigator } from './ViewPostStackNavigator';
import { PostType, SpaceType, TagType } from '../types';
import { CreatedTagType } from '../features/CreateNewPost/contexts';

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
const processingPostMessage = 'It takes couple seconds to finish processing.';
const postSucceededMessage = 'Your post has been created successfully.';

// 命名的に、SpaceStackNavigator の方がいいね。そんで、最初のscreenにspaceを割り当てる感じだな。
export const SpaceStackNavigator: React.FC = (props) => {
  const { snackBar, showSnackBar, hideSnackBar } = useSnackBar();
  const { createPostResult } = useContext(SpaceRootContext);
  const { setMySpaces } = useContext(MySpacesContext);
  const { currentSpace } = useContext(CurrentSpaceContext);

  useEffect(() => {
    if (createPostResult.status === 'loading') {
      // showSnackBar('info', processingPostMessage, 5000);
      showMessage({ message: 'Takes couple seconds to finish.', type: 'info' });
    }
    if (createPostResult.status === 'success' && createPostResult.data?.createdTags) {
      // NOTE: 新しく作ったtagをここに追加する。
      showMessage({ message: 'Created new post.', type: 'success' });
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
  // ここはあくまで、spaceのtagを増やしているだけね。

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
      {/* viewPostsStackをここで持っておいた方がいいのかね。。 */}
    </SpaceStack.Navigator>
  );
};
