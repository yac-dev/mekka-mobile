import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { Colors } from '../themes';
import { primaryBackgroundColor } from '../themes/color';
import { Ionicons } from '@expo/vector-icons';
import WriteDescription from '../features/CreateNewSpace/pages/WriteDescription';
import EmojiPicker from '../features/CreateNewSpace/pages/EmojiPicker';
import CreateNewSpaceStackNavigator from './CreateNewSpaceStackNavigator';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EnterPrivateSpace } from '../features/EnterPrivateSpace/pages/EnterPrivateSpace';
import { SpaceInfoStackNavigator } from './SpaceInfoStackNavigator';
import ViewPost from '../features/ViewPost/pages/ViewPost';
import LocationPicker from '../features/CreateNewPost/pages/LocationPicker';
import CreateTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
import { EditProfileStackNavigator } from './EditProfileStackNavigator';
import { DeleteMyAccount, WelcomePage } from '../features';
import { HomeStackNavContext } from '../contexts/HomeStackNavContext';
import { SpacesDrawerNavigator } from './SpacesDrawerNavigator';
import { SpaceType } from '../types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { MembersStackNavigator } from './MembersStackNavigator';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { MomentsStackNavigator } from './MomentsStackNavigator';
import { DiscoverStackNavigator } from './DiscoverStackNavigator';

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

export type SpaceRootStackNavigatorProp = NativeStackNavigationProp<SpaceRootStackParams>;

type SpacesDrawerParams = {
  [key: string]: NavigatorScreenParams<SpaceRootStackParams>;
  MomentsStackNavigator: undefined;
};

export type HomeStackParams = {
  SpacesDrawerNavigator: NavigatorScreenParams<SpacesDrawerParams>;
  ViewPost: undefined;
  Comments: undefined;
  DiscoverStackNavigator: undefined;
  MomentsStackNavigator: undefined;
  CreateNewSpaceStackNavigator: undefined;
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
  MembersStackNavigator: undefined;
};

export type HomeStackNavigatorProps = NativeStackNavigationProp<HomeStackParams>;

const HomeStack = createNativeStackNavigator<HomeStackParams>();

export const HomeStackNavigator: React.FC = (props) => {
  return (
    <HomeStackNavContext.Provider value={{}}>
      <HomeStack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: true,
          title: '',
          headerStyle: {
            backgroundColor: 'black',
          },
        })}
      >
        <HomeStack.Group>
          <HomeStack.Screen
            name='SpacesDrawerNavigator'
            component={SpacesDrawerNavigator}
            options={({ navigation }) => ({})}
          />
          <HomeStack.Screen
            name='ViewPost'
            component={ViewPost}
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
                color: 'white',
              },
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
            name='MembersStackNavigator'
            component={MembersStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitle: 'Members',
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
            name='WriteDescription'
            component={WriteDescription}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
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

          <HomeStack.Screen
            name='EmojiPicker'
            component={EmojiPicker}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
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
          <HomeStack.Screen
            name='LocationPicker'
            component={LocationPicker}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
              headerTitle: 'Pick location',
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
            name='CreateTag'
            component={CreateTag}
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
          <HomeStack.Screen
            name='CreateNewLocationTag'
            component={CreateNewLocationTag}
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
      </HomeStack.Navigator>
    </HomeStackNavContext.Provider>
  );
};
