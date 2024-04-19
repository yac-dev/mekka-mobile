import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Colors, TextColor } from '../themes';
import Home from '../features/Home/pages/Home';
import { primaryBackgroundColor } from '../themes/color';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';
import WriteDescription from '../features/CreateNewSpace/pages/WriteDescription';
import EmojiPicker from '../features/CreateNewSpace/pages/EmojiPicker';
import CreateNewSpaceStackNavigator from './CreateNewSpaceStackNavigator';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import SecretKeyForm from '../features/SecretKey/pages/Form';
import { SpaceInfoStackNavigator } from './SpaceInfoStackNavigator';
import ViewPost from '../features/ViewPost/pages/ViewPost';
import Comments from '../features/ViewPost/pages/Comments';
import Discover from '../features/Discover/pages/Discover';
import ProfileStackNavigator from './ProfileStackNavigator';
import LocationPicker from '../features/CreateNewPost/pages/LocationPicker';
import CreateTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
import Report from '../features/Report/pages/Report';
import SpaceDetailStackNavigator from './SpaceDetailStackNavigator';
import { EditProfileStackNavigator } from './EditProfileStackNavigator';
// import DeleteMyAccount from '../features/DeleteAccount/pages/DeleteMyAccount';
import { DeleteMyAccount, WelcomePage } from '../features';
// import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';
import Signup from '../features/NotAuthenticated/pages/Signup';
import EULA from '../features/NotAuthenticated/pages/EULA';

import EditTag from '../features/EditTag/pages/Form';
import ReportSpace from '../features/SpaceInfo/pages/ReportSpace';
import { HomeStackNavContext } from '../contexts/HomeStackNavContext';
import { SpacesDrawerNavigator } from './SpacesDrawerNavigator';
import { AuthContext } from '../providers/AuthProvider';
import { SpaceType } from '../types';
import { NavigatorScreenParams } from '@react-navigation/native';
import { MembersStackNavigator } from './MembersStackNavigator';
// import { SpacesDrawerParams } from './SpacesDrawerNavigator';

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
};

export type SpaceRootStackNavigatorProp = NativeStackNavigationProp<SpaceRootStackParams>;

type SpacesDrawerParams = {
  [key: string]: NavigatorScreenParams<SpaceRootStackParams>;
};

export type HomeStackParams = {
  SpacesDrawerNavigator: NavigatorScreenParams<SpacesDrawerParams>;
  ViewPost: undefined;
  Comments: undefined;
  Discover: undefined;
  ProfileStackNavigator: undefined;
  CreateNewSpaceStackNavigator: undefined;
  EditTag: undefined;
  SecretKeyForm: undefined;
  SpaceDetailStackNavigator: undefined;
  Signup: undefined;
  EULA: undefined;
  EditProfileStackNavigator: {
    screen: 'EditProfile';
  };
  WriteDescription: undefined;
  LocationPicker: undefined;
  EmojiPicker: undefined;
  CreateTag: undefined;
  CreateNewLocationTag: undefined;
  ReportSpace: undefined;
  SpaceInfoStackNavigator: { space: SpaceType };
  DeleteMyAccount: undefined;
  MembersStackNavigator: undefined;
};

export type HomeStackNavigatorProps = NativeStackNavigationProp<HomeStackParams>;

const HomeStack = createNativeStackNavigator<HomeStackParams>();
// export type HomeStackNavigatorProps =

export const HomeStackNavigator: React.FC = (props) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <WelcomePage />;
  }

  return (
    <HomeStackNavContext.Provider value={{}}>
      <HomeStack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
          // headerShown: true,
        })}
      >
        <HomeStack.Group>
          <HomeStack.Screen
            name='SpacesDrawerNavigator'
            component={SpacesDrawerNavigator}
            options={({ navigation }) => ({
              // headerShown: false,
            })}
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
            name='Comments'
            component={Comments}
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
            name='Discover'
            component={Discover}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
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
            name='ProfileStackNavigator'
            component={ProfileStackNavigator}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                  </TouchableOpacity>
                );
              },
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
            name='EditTag'
            component={EditTag}
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
                color: TextColor.primary,
              },
            })}
          />
          <HomeStack.Screen
            name='SecretKeyForm'
            component={SecretKeyForm}
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
            name='SpaceDetailStackNavigator'
            component={SpaceDetailStackNavigator}
            options={({ navigation }) => ({
              // headerShown: true, // ここtrueにすると、,,,
              headerShown: false, // ここtrueにすると、,,,
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
            name='Signup'
            component={Signup}
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
          {/* EULA */}
          <HomeStack.Screen
            name='EULA'
            component={EULA}
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
            name='EditProfileStackNavigator'
            component={EditProfileStackNavigator}
            options={({ navigation }) => ({
              // headerShown: true, // ここtrueにすると、,,,
              headerShown: false, // ここtrueにすると、,,,
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
                color: TextColor.primary,
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
                color: TextColor.primary,
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
            name='ReportSpace'
            component={ReportSpace}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle' size={30} color={'white'} />
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
      {/* <AuthMenuBottomSheet navigation={props.navigation} /> */}
      {/* <SpaceMenuBottomSheet navigation={props.navigation} /> */}
      {/* <ActionMenuBottomSheet navigation={props.navigation} /> */}
      {/* <SnackBar.Primary /> */}
    </HomeStackNavContext.Provider>
  );
};
