import React, { useState, useEffect, useRef, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  SafeAreaView,
  Platform,
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import backendAPI from '../apis/backend';
import { PostsContext } from '../contexts/PostsContext';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { MaterialIcons } from '@expo/vector-icons';
import TagViewTopTabNavigator from './TagViewTopTabNavigator';
import PeopleViewTopTabNavigator from './PeopleViewTopTabNavigator';
import LocationsViewTopTabNavigator from './LocationsViewTopTabNavigator';
import MomentsView from '../features/Space/pages/MomentsView';
import ViewPostsTopTabNavigator from './ViewPostsTopTabNavigator';
import TagsTopTabNavigator from './TagsTopTabNavigator';
import Projects from '../features/Space/pages/Projects';
import ChooseViewBottomSheet from '../features/Space/pages/ChooseViewBottomSheet';
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
import MomentsViewStackNavigator from './MomentsViewStackNavigator';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const Tab = createBottomTabNavigator();
const viewTypeObject = {
  tags: (
    <Octicons
      name='hash'
      // color={focused ? 'white' : 'rgb(100, 100, 100)'}
      size={23}
      style={{ marginBottom: 5 }}
      color={'white'}
    />
  ),
  map: (
    <ExpoImage
      style={{ width: 25, height: 25 }}
      source={require('../assets/forApp/globe.png')}
      placeholder={blurhash}
      contentFit='contain'
      transition={1000}
      tintColor={'white'}
    />
  ),
  people: <MaterialCommunityIcons name='account-multiple' color='white' size={25} />,
};

const getViewTypeObject = (isFocused, viewPostsType) => {
  const viewTypeObject = {
    tags: (
      <Octicons name='hash' color={isFocused ? 'white' : 'rgb(100, 100, 100)'} size={23} style={{ marginBottom: 5 }} />
    ),
    map: (
      <ExpoImage
        style={{ width: 25, height: 25 }}
        source={require('../assets/forApp/globe.png')}
        contentFit='contain'
        tintColor='white'
      />
    ),
    people: (
      <MaterialCommunityIcons name='account-multiple' color={isFocused ? 'white' : 'rgb(100, 100, 100)'} size={25} />
    ),
  };

  return viewTypeObject[viewPostsType];
};

export const INITIAL_CREATE_NEW_POST_STATE = {
  postType: '',
  contents: [],
  caption: '',
  dummyCreatedTagId: 1,
  addedTags: {},
  tagOptions: [],
  addedLocationTag: null,
  locationTagOptions: [],
  moments: [],
};

const SpaceRootBottomTabNavigator = (props) => {
  const { viewPostsType, navigation, spaceAndUserRelationship } = useContext(SpaceRootContext);

  return (
    // <SpaceRootContext.Provider
    //   value={{
    //     spaceAndUserRelationship: props.spaceAndUserRelationship,
    //     // space,
    //     hasSpaceBeenFetched,
    //     setHasSpaceBeenFetched,
    //     navigation: props.navigation,
    //     locationsViewPosts,
    //     setLocationsViewPosts,
    //     haveLocationsViewPostsBeenFetched,
    //     setHaveLocationsViewPostsBeenFetched,
    //     locationsViewPostsBottomSheetRef,
    //     selectedLocationTag,
    //     setSelectedLocationTag,
    //     isFetchingLocationsViewPosts,
    //     setIsFetchingLocationsViewPosts,
    //     chooseViewBottomSheetRef,
    //     viewPostsType,
    //     setViewPostsType,
    //     isAfterPosted,
    //     setIsAfterPosted,
    //     screenLoaded,
    //     setScreenLoaded,
    //     createNewPostFormData,
    //     setCreateNewPostFormData,
    //     createNewPostResult,
    //     setCreateNewPostResult,
    //   }}
    // >
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ navigation, route }) => ({
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'black',
            // marginHorizontal: 90,
            // paddingBottom: 0, // きたー。これよ。これ。
            // borderRadius: 30,
            height: 60,
            borderTopWidth: 0,
            paddingTop: 5,
            paddingBottom: 5,
            display: 'none', // ver1では、bottom tabを表示しない様にする。今後のupdateで少し足すかも。。。
            // position: 'absolute',
            // bottom: 30,
            // justifyContent: 'center',
            // alignItems: 'center',
          },
          // tabBarLabel: navigation.isFocused() ? route.name : '',
        })}
      >
        {/* ここでは、tagsのtopTabを入れていくことになるわな。。。大きなrefactorだな。。。 */}
        <Tab.Screen
          name='TagsTopTabNavigator'
          component={TagsTopTabNavigator}
          options={({ navigation, route }) => ({
            // tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) =>
              // <Octicons
              //   name='hash'
              //   color={focused ? 'white' : 'rgb(100, 100, 100)'}
              //   size={23}
              //   style={{ marginBottom: 5 }}
              // />
              // viewTypeObject[viewPostsType],
              getViewTypeObject(focused, viewPostsType),
            tabBarLabel: ({ focused }) => {
              return <Text style={{ color: focused ? 'white' : 'rgb(100, 100, 100)', fontSize: 13 }}>Home</Text>;
            },
          })}
        />
        <Tab.Screen
          name='Post'
          component={CreateNewPostStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ size, color, focused }) => (
              <MaterialCommunityIcons
                name='plus'
                color={focused ? 'white' : 'rgb(100, 100, 100)'}
                size={30}
                style={{ marginBottom: 5 }}
              />
            ),
            tabBarLabel: ({ focused }) => {
              return <Text style={{ color: focused ? 'white' : 'rgb(100, 100, 100)', fontSize: 13 }}>Post</Text>;
            },
          }}
          listeners={({ navigation }) => ({
            tabPress: (event) => {
              event.preventDefault();
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
              navigation?.navigate(
                'CreateNewPostStackNavigator',
                { spaceAndUserRelationship }
                // {
                //   screen: 'SelectPostType',
                //   params: {
                //     // space: currentSpace,
                //     // spaceAndUserRelationship: currentSpaceAndUserRelationship,
                //     spaceAndUserRelationship: props.spaceAndUserRelationship,
                //   }, // なんで、spaceUserRelが必要？？いらなくね。。。
                //   merge: true,
                // }
              );
            },
          })}
        />

        <Tab.Screen
          name='MomentsViewStackNavigator'
          component={MomentsViewStackNavigator}
          options={({ navigation }) => ({
            // tabBarShowLabel: false,
            tabBarIcon: ({ size, color, focused }) => (
              <ExpoImage
                style={{ width: 25, height: 25, marginBottom: 5 }}
                source={require('../assets/forApp/ghost.png')}
                contentFit='contain'
                tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
              />
            ),
            tabBarLabel: ({ focused }) => {
              return <Text style={{ color: focused ? 'white' : 'rgb(100, 100, 100)', fontSize: 13 }}>Moments</Text>;
            },
          })}
        />
      </Tab.Navigator>
      {/* <TouchableOpacity もともとのpost button
          onPress={() => {
            props.navigation?.navigate(
              'CreateNewPostStackNavigator',
              { spaceAndUserRelationship: props.spaceAndUserRelationship }
              // {
              //   screen: 'SelectPostType',
              //   params: {
              //     // space: currentSpace,
              //     // spaceAndUserRelationship: currentSpaceAndUserRelationship,
              //     spaceAndUserRelationship: props.spaceAndUserRelationship,
              //   }, // なんで、spaceUserRelが必要？？いらなくね。。。
              //   merge: true,
              // }
            );
          }}
          style={{
            backgroundColor: 'white',
            width: 50,
            height: 50,
            borderRadius: 25,
            position: 'absolute',
            bottom: 80,
            right: 10,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
          }}
        >
          <MaterialCommunityIcons name='plus' color='black' size={30} />
        </TouchableOpacity> */}
      <ChooseViewBottomSheet />
      <LocationsViewPostsBottomSheet />
    </View>
    // </SpaceRootContext.Provider>
  );
};

export default SpaceRootBottomTabNavigator;

// tabBar={(props) => <CustomTabBar {...props} />}
// screenOptions={({ route }) => ({
//   tabBarScrollEnabled: false,
//   lazy: true,
//   swipeEnabled: false,
// })}
