import React, { useState, useEffect, useContext, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../apis/backend';
import GalleryNew from '../features/Space/components/GalleryNew';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import TaggedPosts from '../features/Space/components/TaggedPosts';
import FastImage from 'react-native-fast-image';
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

const Tab = createMaterialTopTabNavigator();

const TagViewTopTabNavigator = (props) => {
  const { spaceAndUserRelationship, navigation, space, hasSpaceBeenFetched, setHasSpaceBeenFetched } =
    useContext(SpaceRootContext);
  const { isIpad, spaceMenuBottomSheetRef, currentSpace, setCurrentSpace } = useContext(GlobalContext);
  const oneGridWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 4;
  const oneGridHeight = isIpad ? Dimensions.get('window').height / 7.5 : Dimensions.get('window').height / 6.5;
  const route = useRoute();
  // const [space, setSpace] = useState(null);
  const [tags, setTags] = useState({});
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  // const spaceMenuBottomSheetRef = useRef(null);

  // useEffect(() => {
  //   if (props.route.params.addedTags) {
  //     // これ、for in の方か？？
  //     props.route.params.addedTags.forEach((element) => {
  //       if (!(element in tags)) {
  //         setTags((previous) => {
  //           return {
  //             ...previous,
  //             [element._id]: element,
  //           };
  //         });
  //       }
  //     });
  //   }
  // }, [props.route.params.addedTags]);

  const getSpaceById = async () => {
    setHasSpaceBeenFetched(false);
    const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}`);
    const { space } = result.data;
    // setSpace(space);
    setCurrentSpace(space);
    setHasSpaceBeenFetched(true);
  };

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
    setHaveTagsBeenFetched(true);
  };

  // useEffect(() => {
  //   getSpaceById();
  // }, []);

  // console.log(props.route);

  // useEffect(() => {
  //   if (hasSpaceBeenFetched || props.route?.params?.afterPosted) {
  //     getTags();
  //     // setHasSpaceBeenFetched(false);
  //   }
  // }, [hasSpaceBeenFetched, props.route?.params?.afterPosted]);

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
            backgroundColor: 'black',
            paddingTop: 10,
            paddingBottom: 10,
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
                  marginRight: 10,
                  // backgroundColor: isFocused ? 'rgb(110,110,110)' : null,
                  padding: 10,
                  // borderRadius: 5,
                  width: 70,
                  height: 70,
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

  if (!hasSpaceBeenFetched || !haveTagsBeenFetched) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        tabBar={(props) => <CustomTabBar {...props} />}
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
        })}
      >
        {Object.values(tags).map((tagObject, index) => (
          <Tab.Screen
            key={index}
            name={`SpaceTab_${tagObject._id}-${index}`}
            options={{ title: tagObject.tag.name }} // Set the tab title to the space name
            initialParams={{ tagObject }}
          >
            {({ navigation }) => <TagView navigation={navigation} tagObject={tagObject} />}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
      <SnackBar />
    </View>
  );
};

export default TagViewTopTabNavigator;
