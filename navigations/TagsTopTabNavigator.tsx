import React, { useState, useEffect, useContext, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions, Platform } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../apis/backend';
import GalleryNew from '../features/Space/components/GalleryNew';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import TaggedPosts from '../features/Space/components/TaggedPosts';
import FastImage from 'react-native-fast-image';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CreatePost from '../features/Space/pages/CreatePost';
import SpaceMenuBottomSheet from '../features/Space/pages/SpaceMenuBottomSheet';
import PostsBottomNavigator from './PostsBottomNavigator';
import SnackBar from '../components/SnackBar';
// import Grid from '../features/Space/components/Grid';
import TagView from '../features/Space/pages/TagView';
import Map from '../features/Space/components/Map';
import ViewPostsTopTabNavigator from './ViewPostsTopTabMavigator';
import ChooseViewBottomSheet from '../features/Space/pages/ChooseViewBottomSheet';
import { TagViewRootContext } from '../features/SpaceMenuBottomSheet/contexts/TagViewRootContext';
import TagViewStackNavigator from './TagViewStackNavigator';

const Tab = createMaterialTopTabNavigator();

const viewTypeObject = {
  grid: <MaterialCommunityIcons name='dots-grid' color='black' size={25} />,
  map: (
    <FastImage source={require('../assets/forApp/globe.png')} style={{ width: 25, height: 25 }} tintColor={'black'} />
  ),
  people: <MaterialCommunityIcons name='account-multiple' color='black' size={25} />,
};

const TagsTopTabNavigator = (props) => {
  const {
    spaceAndUserRelationship,
    navigation,
    hasSpaceBeenFetched,
    setHasSpaceBeenFetched,
    chooseViewBottomSheetRef,
    viewPostsType,
  } = useContext(SpaceRootContext);
  const { isIpad, spaceMenuBottomSheetRef, currentSpace, setCurrentSpace, currentTagObject, setCurrentTagObject } =
    useContext(GlobalContext);
  const route = useRoute();
  // const [space, setSpace] = useState(null);
  const [tags, setTags] = useState({});
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  // const spaceMenuBottomSheetRef = useRef(null);
  // const getSpaceById = async () => {
  //   setHasSpaceBeenFetched(false);
  //   const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}`);
  //   const { space } = result.data;
  //   // setSpace(space);
  //   setCurrentSpace(space);
  //   setHasSpaceBeenFetched(true);
  // };

  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}/tags`);
    const { tags } = result.data;
    setTags(() => {
      const table = {};
      tags.forEach((tag, index) => {
        table[tag._id] = {
          tag,
          hasUnreadPosts: tag.updatedAt > props.route?.params?.lastCheckedIn ? true : false,
          createdPosts: false,
        };
      });

      return table;
    });
    const defaultTagObject = {
      tag: tags[0],
      hasUnreadPosts: tags[0].updatedAt > props.route?.params?.lastCheckedIn ? true : false,
      createdPosts: false,
    };
    setCurrentTagObject(defaultTagObject);
    setHaveTagsBeenFetched(true);
  };

  useEffect(() => {
    getTags();
  }, []);

  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 0 }}
          style={{
            backgroundColor: 'transparent',
            paddingTop: 10,
            // paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            // padding: 5,
          }}
        >
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

              setCurrentTagObject(route.params?.tagObject);

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={route.key}
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 15,
                  // backgroundColor: isFocused ? 'rgb(110,110,110)' : null,
                  padding: 10,
                  // borderRadius: 5,
                  // width: 60,
                  // height: 60,
                  maxWidth: 100,
                  borderBottomWidth: isFocused && 1,
                  borderBottomColor: isFocused && 'white',
                }}
                // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
                onPress={onPress}
                // onLongPress={() => console.log('long press')} edit画面をここに出す。
              >
                {/* rgb(100, 100, 100) */}
                <FastImage
                  source={{ uri: route.params?.tagObject.tag.icon }}
                  style={{ width: 25, height: 25, marginBottom: 5 }}
                  // tintColor={route.params?.tagObject.tag.iconType === 'icon' ? route.params?.tagObject.tag.color : null}
                  tintColor={route.params?.tagObject.tag.iconType === 'icon' ? route.params?.tagObject.tag.color : null}
                />
                <Text numberOfLines={1} style={{ color: 'white' }}>
                  {route.params?.tagObject.tag.name}
                </Text>
                {/* <Text style={{ color: 'rgb(170,170,170)', position: 'absolute', top: 7, right: 10 }}>
                  {route.params?.tagObject.tag.count}
                </Text> */}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  };

  if (!haveTagsBeenFetched) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
          // animationEnabled: false,
        })}
      >
        {Object.values(tags).map((tagObject, index) => (
          <Tab.Screen
            key={index}
            name={`SpaceTab_${tagObject.tag._id}`}
            options={{ title: tagObject.tag.name }}
            initialParams={{ tagObject }}
          >
            {/* {({ navigation }) => <ViewPostsTopTabNavigator navigation={navigation} tagObject={tagObject} />} */}
            {({ navigation }) => <TagViewStackNavigator navigation={navigation} tagObject={tagObject} />}
          </Tab.Screen>
        ))}
        {/* <Tab.Screen
          name={`SpaceTab_${tagObject._id}-${index}`}
          options={{ title: tagObject.tag.name }} // Set the tab title to the space name
          initialParams={{ tagObject }}
          component={ViewPostsTopTabNavigator}
        /> */}
      </Tab.Navigator>
      {/* <ChooseViewBottomSheet /> */}
      {/* <TouchableOpacity
        style={{
          backgroundColor: 'white',
          width: 40,
          height: 40,
          borderRadius: 25,
          position: 'absolute',
          bottom: 30,
          left: 20,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
        }}
        onPress={() => chooseViewBottomSheetRef.current.snapToIndex(0)}
      >
        <MaterialCommunityIcons name='dots-grid' color='black' size={20} />
      </TouchableOpacity> */}
      {/* ここじゃだめ、viewPostTopにしないとあかん。 */}
      {/* <TouchableOpacity
        onPress={() => {
          chooseViewBottomSheetRef.current.snapToIndex(0);
        }}
        style={{
          backgroundColor: 'white',
          width: 40,
          height: 40,
          borderRadius: 20,
          position: 'absolute',
          bottom: 20,
          right: 10,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 10,
          ...Platform.select({
            ios: {
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.3,
              shadowRadius: 2,
            },
            android: {
              elevation: 2, // Works on Android
            },
          }),
        }}
      >
        {viewTypeObject[viewPostsType]}
      </TouchableOpacity> */}
      <SnackBar />
    </View>
  );
};

export default TagsTopTabNavigator;
