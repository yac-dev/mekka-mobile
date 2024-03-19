import React, { useContext, useEffect } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Home from '../features/Home/pages/Home';
import CreatePost from '../features/Space/pages/CreatePost';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import SpacesTopTabNavigator from './SpacesTopTabNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';
import WriteDescription from '../features/CreateNewSpace/pages/WriteDescription';
import EmojiPicker from '../features/CreateNewSpace/pages/EmojiPicker';
import CreateNewSpaceStackNavigator from './CreateNewSpaceStackNavigator';
import { SnackBar } from '../components';

// secret key
import SecretKeyForm from '../features/SecretKey/pages/Form';
// create post
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
// import CreateNewPost from '../features/CreateNewPost/pages/Form';
import SpaceMenuBottomSheet from '../features/SpaceMenuBottomSheet/pages/BottomSheet';
import ActionMenuBottomSheet from '../features/SpaceMenuBottomSheet/pages/ActionMenuBottomSheet';
import AuthMenuBottomSheet from '../features/Utils/AuthMenuBottomSheet';
import SpaceInfoStackNavigator from './SpaceInfoStackNavigator';
import ViewPost from '../features/ViewPost/pages/ViewPost';
import Comments from '../features/ViewPost/pages/Comments';
import Discover from '../features/Discover/pages/Discover';
import ProfileStackNavigator from './ProfileStackNavigator';
import LocationPicker from '../features/CreateNewPost/pages/LocationPicker';
import CreateTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
import Report from '../features/Report/pages/Report';
import SpaceDetailStackNavigator from './SpaceDetailStackNavigator';
import EditAccountStackNavigator from './EditAccountStackNavigator';
// import DeleteMyAccount from '../features/DeleteAccount/pages/DeleteMyAccount';
import { DeleteMyAccount, WelcomePage } from '../features';
// import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';
import Login from '../features/NotAuthenticated/pages/Login';
import Signup from '../features/NotAuthenticated/pages/Signup';
import EULA from '../features/NotAuthenticated/pages/EULA';

import EditTag from '../features/EditTag/pages/Form';
import ReportSpace from '../features/SpaceInfo/pages/ReportSpace';
import backendAPI from '../apis/backend';
import { HomeStackNavContext } from '../contexts/HomeStackNavContext';
import { LoginStackNavigator } from './LoginStackNavigator';
import { SpacesDrawerNavigator } from './SpacesDrawerNavigator';
import { AuthContext } from '../providers';

const HomeStackNavigator: React.FC = (props) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <WelcomePage navigation={props.navigation} />;
  }

  return (
    <HomeStackNavContext.Provider value={{}}>
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
          // headerShown: true,
        })}
      >
        <Stack.Group>
          <Stack.Screen
            name='SpacesDrawerNavigator'
            component={SpacesDrawerNavigator}
            options={({ navigation }) => ({
              // headerShown: false,
            })}
          />
          <Stack.Screen
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
          <Stack.Screen
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
          <Stack.Screen
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
          <Stack.Screen
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
        </Stack.Group>

        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen
            name='CreateNewSpaceStackNavigator'
            component={CreateNewSpaceStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
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
                color: primaryTextColor,
              },
            })}
          />
          <Stack.Screen
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
                color: primaryTextColor,
              },
            })}
          />
          <Stack.Screen
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
                color: primaryTextColor,
              },
            })}
          />
          <Stack.Screen
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
          {/* <Stack.Screen
              name='LoginStackNavigator'
              component={LoginStackNavigator}
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
            ></Stack.Screen> */}
          <Stack.Screen
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
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          {/* EULA */}
          <Stack.Screen
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
          <Stack.Screen
            name='EditAccountStackNavigator'
            component={EditAccountStackNavigator}
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
          <Stack.Screen
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
                color: primaryTextColor,
              },
            })}
          />

          <Stack.Screen
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
                color: primaryTextColor,
              },
            })}
          />
          <Stack.Screen
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
          <Stack.Screen
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
          <Stack.Screen
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
          <Stack.Screen
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
          <Stack.Screen
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
          <Stack.Screen
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
        </Stack.Group>
      </Stack.Navigator>
      <AuthMenuBottomSheet navigation={props.navigation} />
      {/* <SpaceMenuBottomSheet navigation={props.navigation} /> */}
      <ActionMenuBottomSheet navigation={props.navigation} />
      {/* <SnackBar.Primary /> */}
    </HomeStackNavContext.Provider>
  );
};

export default HomeStackNavigator;
