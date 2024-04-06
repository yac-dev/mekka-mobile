import React, { useState, useEffect, useContext, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View, Text, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../apis/backend';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import Grid from '../features/Space/components/Grid';

import { PostsTopTabNavigator } from './PostsTopTabNavigator';
import { Image as ExpoImage } from 'expo-image';
import { TabView, Route, SceneMap } from 'react-native-tab-view';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';
import { CurrentTagContext, SpaceUpdatesContext } from '../providers';
import { TagType } from '../types';
import { useNavigation } from '@react-navigation/native';
import { SpaceRootStackNavigatorProp } from './SpaceRootStackNavigator';

const Tab = createMaterialTopTabNavigator();

export const SpaceTopTabNavigator = (props) => {
  const { space, viewPostsType, screenLoaded, setScreenLoaded, tags, getTagsStatus } = useContext(SpaceRootContext);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const { spaceUpdates, setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const route = useRoute();
  const scrollViewRef = useRef(null);
  const navigation = useNavigation<SpaceRootStackNavigatorProp>();

  // これも、SpaceRootの方に移したい。
  // const getTags = async () => {
  //   // setIsLoadingTags(true);
  //   // setHaveTagsBeenFetched(false);
  //   setFetchingState((previous) => {
  //     return {
  //       ...previous,
  //       isLoading: true,
  //       success: false,
  //     };
  //   });
  //   setTagsFetchingState('loading');
  //   const result = await backendAPI.get(`/spaces/${spaceAndUserRelationship.space._id}/tags`);
  //   const { tags } = result.data;
  //   setTags(() => {
  //     const table = {};
  //     tags.forEach((tag, index) => {
  //       table[tag._id] = {
  //         tag,
  //         hasUnreadPosts: tag.updatedAt > props.route?.params?.lastCheckedIn ? true : false,
  //         createdPosts: false,
  //       };
  //     });

  //     return table;
  //   });

  //   setScreenLoaded(() => {
  //     const table = {};
  //     tags.forEach((tag, index) => {
  //       table[tag._id] = false;
  //     });

  //     return table;
  //   });
  //   const defaultTagObject = {
  //     tag: tags[0],
  //     hasUnreadPosts: tags[0].updatedAt > props.route?.params?.lastCheckedIn ? true : false,
  //     createdPosts: false,
  //   };
  //   setCurrentTagObject(defaultTagObject);
  //   // setIsLoadingTags(false);
  //   // setHaveTagsBeenFetched(true);
  //   setTagsFetchingState('success');
  //   setFetchingState((previous) => {
  //     return {
  //       ...previous,
  //       isLoading: false,
  //       success: true,
  //     };
  //   });
  // };

  // useEffect(() => {
  //   if (createNewPostResult.isSuccess && createNewPostResult.responseData?.createdTags) {
  //     console.log('created tags', createNewPostResult.responseData?.createdTags);
  //     setTags((previous) => {
  //       const updating = { ...previous };
  //       createNewPostResult.responseData.createdTags.forEach((tag, index) => {
  //         updating[tag._id] = {
  //           tag,
  //           hasUnreadPosts: tag.updatedAt > props.route?.params?.lastCheckedIn ? true : false,
  //         };
  //       });
  //       return updating;
  //     });
  //     setUpdatesTable((previous) => {
  //       const updating = { ...previous };
  //       createNewPostResult.responseData.createdTags.forEach((tag, index) => {
  //         updating[tag.space][tag._id] = 0;
  //       });

  //       return updating;
  //     });
  //   }
  // }, [createNewPostResult]);

  const onTabPress = (tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentTag(tab);
    // navigation.navigate({
    //   name: `Tag_${tab._id}`,
    //   // params: { screen: viewPostsType === 'grid' ? 'TagViewStackNavigator' : 'MavViewStackNavigator' },
    // });
    navigation.navigate('SpaceBottomTabNavigator', {
      screen: 'TagsTopTabNavigator',
      params: {
        screen: `Tag_${tab._id}`,
        params: { screen: viewPostsType === 'grid' ? 'grid' : 'map' },
      },
    });
    if (spaceUpdates[space._id][tab._id]) {
      setSpaceUpdates((previous) => {
        const updatesTable = { ...previous };
        updatesTable[space._id][tab._id] = 0;
        return updatesTable;
      });
    } // 一時停止。
  };

  const renderTab = ({ item }) => {
    const isActive = item._id === currentTag._id;
    return (
      <TouchableOpacity
        key={route.key}
        onPress={() => onTabPress(item)}
        onLongPress={() => console.log('hello')}
        // onLongPress={() => console.log('long press')} edit画面をここに出す。
      >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 10,
            // backgroundColor: isFocused ? 'rgb(110,110,110)' : null,
            padding: 5,
            // borderRadius: 5,
            // width: 60,
            // height: 60,
            maxWidth: isActive ? null : 100,
            // borderBottomWidth: isActive && 1,
            // borderBottomColor: isActive && 'white',
          }}
          // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
        >
          <ExpoImage
            style={{ width: 25, height: 25, marginBottom: 5 }}
            source={{ uri: item.icon.url }}
            // placeholder={blurhash}
            // contentFit='fill'
            // transition={100}
            // tintColor={item.tag.iconType === 'icon' ? item.tag.color : 'rgb(170,170,170)'}
            tintColor={isActive ? 'white' : 'rgb(150,150,150)'}
          />
          <Text numberOfLines={isActive ? null : 1} style={{ color: isActive ? 'white' : 'rgb(150,150,150)' }}>
            {item.name}
          </Text>
          {/* <Text style={{ color: 'rgb(170,170,170)', position: 'absolute', top: 7, right: 10 }}>
                  {route.params?.tagObject.tag.count}
                </Text> */}
        </View>
        {spaceUpdates[space._id]?.[item._id] ? (
          <View
            style={{
              width: 18,
              height: 18,
              borderRadius: 9,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 0,
              right: 0,
            }}
          >
            <Text style={{ color: 'white' }}>{spaceUpdates[space._id][item._id]}</Text>
          </View>
        ) : null}

        {/* rgb(100, 100, 100) */}
      </TouchableOpacity>
    );
  };

  if (getTagsStatus === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (tags?.length) {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ padding: 10 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            data={Object.values(tags)}
            renderItem={renderTab}
            keyExtractor={(item, index) => `${item._id}-${index}`}
          />
        </View>
        <Tab.Navigator
          tabBar={() => null}
          screenOptions={({ route }) => ({
            lazy: true,
            swipeEnabled: false,
            animationEnabled: true,
          })}
        >
          {Object.values(tags).map((tag: TagType, index: number) => (
            <Tab.Screen
              key={index}
              name={`Tag_${tag._id}`}
              options={{ title: tag.name }}
              // initialParams={{ tag }}
            >
              {({ navigation }) => (
                <PostsTopTabNavigator tag={tag} />
                // <View style={{ backgroundColor: 'black', flex: 1 }}>
                //   <Text style={{ color: 'white' }}>Hello puta madres interviewers</Text>
                // </View>
              )}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </View>
    );
  }
};