import React, { useContext } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { GlobalContext } from '../contexts/GlobalContext';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from '../features/Home/pages/Home';
// import Signup from '../features/Home/pages/Signup';
import CreatePost from '../features/Space/pages/CreatePost';
// import SpaceRootStackNavigator from './SpaceRootStackNavigator';
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import SpacesTopTabNavigator from './SpacesTopTabNavigator';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
// create space
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';
import WriteDescription from '../features/CreateNewSpace/pages/WriteDescription';
import EmojiPicker from '../features/CreateNewSpace/pages/EmojiPicker';
import CreateNewSpaceStackNavigator from './CreateNewSpaceStackNavigator';

// secret key
import SecretKeyForm from '../features/SecretKey/pages/Form';
// create post
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
// import CreateNewPost from '../features/CreateNewPost/pages/Form';
import SpaceMenuBottomSheet from '../features/SpaceMenuBottomSheet/pages/BottomSheet';
import ActionMenuBottomSheet from '../features/SpaceMenuBottomSheet/pages/ActionMenuBottomSheet';
import AuthMenuBottomSheet from '../features/Utils/AuthMenuBottomSheet';
import SpacesDrawerNavigator from './SpacesDrawerNavigator';
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
import WelcomePage from '../features/NotAuthenticated/pages/WelcomePage';
import Login from '../features/NotAuthenticated/pages/Login';
import Signup from '../features/NotAuthenticated/pages/Signup';

import EditTag from '../features/EditTag/pages/Form';
import ReportSpace from '../features/SpaceInfo/pages/ReportSpace';

import { HomeStackNavContext } from '../contexts/HomeStackNavContext';
const HomeStackNavigator: React.FC = (props) => {
  const { isAuthenticated } = useContext(GlobalContext);

  return (
    <HomeStackNavContext.Provider value={{}}>
      <GestureHandlerRootView style={{ flex: 1 }}>
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
                  color: 'white',
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
            <Stack.Screen
              name='Login'
              component={Login}
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    // style={{
                    //   flexDirection: 'row',
                    //   alignItems: 'center',
                    //   paddingTop: 5,
                    //   paddingBottom: 5,
                    //   paddingLeft: 10,
                    //   paddingRight: 10,
                    //   backgroundColor: 'white',
                    //   borderRadius: 20,
                    // }}
                  >
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
            ></Stack.Screen>
            <Stack.Screen
              name='Signup'
              component={Signup}
              options={({ navigation }) => ({
                headerShown: true,
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    // style={{
                    //   flexDirection: 'row',
                    //   alignItems: 'center',
                    //   paddingTop: 5,
                    //   paddingBottom: 5,
                    //   paddingLeft: 10,
                    //   paddingRight: 10,
                    //   backgroundColor: 'white',
                    //   borderRadius: 20,
                    // }}
                  >
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
          </Stack.Group>
        </Stack.Navigator>
        <AuthMenuBottomSheet />
        {/* <SpaceMenuBottomSheet navigation={props.navigation} /> */}
        <ActionMenuBottomSheet navigation={props.navigation} />
      </GestureHandlerRootView>
    </HomeStackNavContext.Provider>
  );
};

export default HomeStackNavigator;
