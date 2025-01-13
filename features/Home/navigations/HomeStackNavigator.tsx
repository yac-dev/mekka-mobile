import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../../../themes';
import { primaryBackgroundColor } from '../../../themes/color';
import { Ionicons } from '@expo/vector-icons';
import {
  CreateNewPostStackNavigator,
  CreateNewPostStackParams,
  CreateNewSpaceStackNavigator,
  SpacesHeader,
  ViewPostStackNavigator,
} from '../..';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import { EnterPrivateSpace } from '../../EnterPrivateSpace/pages/EnterPrivateSpace';
import { SpaceInfoStackNavigator } from '../../SpaceInfo/navigations/SpaceInfoStackNavigator';
import { EditProfileStackNavigator } from '../../EditAccount/navigations/EditProfileStackNavigator';
import { DeleteMyAccount } from '../..';
import { PostType, SpaceType } from '../../../types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { MomentsStackNavigator } from '../../Moments/navigations/MomentsStackNavigator';
import { DiscoverStackNavigator } from '../../Discover/navigations/DiscoverStackNavigator';
import { Home } from '../pages';
import { SpaceStackNavigator } from '../../Space/navigations/SpaceStackNavigator';
import { SpaceStackParams } from '../../Space/navigations/SpaceStackNavigator';
import { AboutApp } from '../..';

type TagScreenTopTabNavigatorParams = {
  GridView: undefined;
  MapView: undefined;
};

type TagScreenStackNavigatorParams = {
  TagScreenTopTabNavigator: NavigatorScreenParams<TagScreenTopTabNavigatorParams>;
  ViewPostStackNavigator: undefined; // いや、これ多分params必要になる。
};

export type SpaceTopTabNavigatorParams = {
  [key: string]: NavigatorScreenParams<TagScreenStackNavigatorParams>;
};

export type SpaceRootStackParams = {
  TagsTopTabNavigator: NavigatorScreenParams<SpaceTopTabNavigatorParams>;
  CreateNewPostStackNavigator: undefined;
  MomentsStackNavigator: undefined;
};

export type MomentsStackParams = {
  Moments: undefined;
};

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

export type MomentsStackNavigatorProps = NativeStackNavigationProp<MomentsStackParams>;
export type SpaceRootStackNavigatorProp = NativeStackNavigationProp<SpaceRootStackParams>;

// これviewPost共通となるとさ、、、多分ここにViewStackNavigatorを入れた方がいいのかね。。。なんかそんな感じする。
// userのstack navigatorとかもここに入れる感じになるよね。。。
export type HomeStackParams = {
  // Home: NavigatorScreenParams<SpacesDrawerParams>;
  Home: undefined;
  SpaceStackNavigator: NavigatorScreenParams<SpaceStackParams>;
  MomentsStackNavigator: NavigatorScreenParams<MomentsStackParams>;
  ViewPostStackNavigator: NavigatorScreenParams<ViewPostStackNavigatorParams>;
  ViewPost: undefined;
  DiscoverStackNavigator: undefined;
  CreateNewSpaceStackNavigator: undefined;
  CreateNewPostStackNavigator: NavigatorScreenParams<CreateNewPostStackParams>;
  EnterPrivateSpace: undefined;
  SpaceDetailStackNavigator: undefined;
  Signup: undefined;
  EditProfileStackNavigator: {
    screen: 'EditProfile';
  };
  WriteDescription: undefined;
  LocationPicker: undefined;
  EmojiPicker: undefined;
  CreateTag: undefined;
  CreateNewLocationTag: undefined;
  SpaceInfoStackNavigator: { space: SpaceType };
  DeleteMyAccount: undefined;
  AboutApp: { url: string };
};

export type HomeStackNavigatorProps = NativeStackNavigationProp<HomeStackParams>;
export type SpaceStackNavigatorProps = NativeStackNavigationProp<SpaceStackParams>;

const HomeStack = createNativeStackNavigator<HomeStackParams>();

// あと、ここにbottom sheetを入れるようにしたいね。ここpassするのもめんどうだし、recoilを使うのいいかも。
export const HomeStackNavigator: React.FC = (props) => {
  return (
    <HomeStack.Navigator
      screenOptions={({ navigation }) => ({
        // headerShown: false,
        title: '',
        headerStyle: {
          backgroundColor: 'black',
        },
      })}
    >
      {/* customのdrawerを入れないといけないな。。。 */}
      <HomeStack.Group>
        <HomeStack.Screen
          name='Home'
          component={Home}
          options={({ navigation }) => ({
            headerShown: false,
            // headerStyle: {
            //   backgroundColor: 'black',
            //   borderWidth: 1,
            //   borderBottomColor: 'white',
            // },
          })}
        />
        <HomeStack.Screen
          name='SpaceStackNavigator'
          component={SpaceStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
        {/* ここに、spaceRootStackを入れる感じか。home component内で、SpaceRootStackへnavigationするようにしたいよね。そういう流れだ。 */}
        <HomeStack.Screen
          name='AboutApp'
          component={AboutApp}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
          })}
        />
        <HomeStack.Screen
          name='DiscoverStackNavigator'
          component={DiscoverStackNavigator}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTitle: 'Discover',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <HomeStack.Screen
          name='MomentsStackNavigator'
          component={MomentsStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTitle: 'Moments',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </HomeStack.Group>

      <HomeStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <HomeStack.Screen
          name='CreateNewSpaceStackNavigator'
          component={CreateNewSpaceStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            headerTitle: '',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: Colors.white,
            },
          })}
        />
        <HomeStack.Screen
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
        <HomeStack.Screen
          name='EnterPrivateSpace'
          component={EnterPrivateSpace}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: Colors.white,
            },
          })}
        />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <HomeStack.Screen
          name='EditProfileStackNavigator'
          component={EditProfileStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <HomeStack.Screen
          name='SpaceInfoStackNavigator'
          component={SpaceInfoStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: 'SPInfo',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <HomeStack.Screen
          name='DeleteMyAccount'
          component={DeleteMyAccount}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </HomeStack.Group>
      <HomeStack.Group screenOptions={{ presentation: 'fullScreenModal', animation: 'fade', animationDuration: 200 }}>
        <HomeStack.Screen
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
      </HomeStack.Group>
    </HomeStack.Navigator>
  );
};
