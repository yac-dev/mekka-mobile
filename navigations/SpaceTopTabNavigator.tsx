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
import { Image as ExpoImage } from 'expo-image';
import { TabView, Route, SceneMap } from 'react-native-tab-view';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';
import { CurrentSpaceContext, CurrentTagContext, SpaceUpdatesContext } from '../providers';
import { TagType } from '../types';
import { useNavigation } from '@react-navigation/native';
import { SpaceRootStackNavigatorProp } from './SpaceRootStackNavigator';
import { TagScreenProvider } from '../features';
import { TagScreenStackNavigator } from './TagScreenStackNavigator';
import { SpacesDrawerStackNavigatorProps } from './SpacesDrawerNavigator';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons/VectorIcons';
import { HomeStackNavigatorProps } from '.';
import { SpaceTopTabNavigatorParams } from '.';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ViewPostsTypeToggleButton } from '../features/Space/components';

export type SpaceTopTabNavigationProp = NativeStackNavigationProp<SpaceTopTabNavigatorParams>;

const Tab = createMaterialTopTabNavigator<SpaceTopTabNavigatorParams>();

export const SpaceTopTabNavigator = (props) => {
  // const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const drawerNavigation = useNavigation<SpacesDrawerStackNavigatorProps>();
  const { screenLoaded, setScreenLoaded, viewPostsType, setViewPostsType, space } = useContext(SpaceRootContext);
  const { currentTag, setCurrentTag } = useContext(CurrentTagContext);
  const { spaceUpdates, setSpaceUpdates } = useContext(SpaceUpdatesContext);
  const { currentSpace } = useContext(CurrentSpaceContext);
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
    navigation.navigate('TagsTopTabNavigator', {
      screen: `Tag_${tab._id}`,
      params: {
        screen: 'TagScreenTopTabNavigator',
        params: { screen: viewPostsType === 'grid' ? 'GridView' : 'MapView' },
      },
    });
    // if (spaceUpdates[space._id][tab._id]) {
    //   setSpaceUpdates((previous) => {
    //     const updatesTable = { ...previous };
    //     updatesTable[space._id][tab._id] = 0;
    //     return updatesTable;
    //   });
    // } // 一時停止。
  };

  const onGridViewPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // navigation.navigate({
    //   name: `Tag_${tab._id}`,
    //   // params: { screen: viewPostsType === 'grid' ? 'TagViewStackNavigator' : 'MavViewStackNavigator' },
    // });
    setViewPostsType('grid');
    navigation.navigate('TagsTopTabNavigator', {
      screen: `Tag_${currentTag._id}`,
      params: { screen: 'TagScreenTopTabNavigator', params: { screen: 'GridView' } },
    });
    // if (spaceUpdates[space._id][tab._id]) {
    //   setSpaceUpdates((previous) => {
    //     const updatesTable = { ...previous };
    //     updatesTable[space._id][tab._id] = 0;
    //     return updatesTable;
    //   });
    // } // 一時停止。
  };

  const onMapViewPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // navigation.navigate({
    //   name: `Tag_${tab._id}`,
    //   // params: { screen: viewPostsType === 'grid' ? 'TagViewStackNavigator' : 'MavViewStackNavigator' },
    // });
    setViewPostsType('map');
    navigation.navigate('TagsTopTabNavigator', {
      screen: `Tag_${currentTag._id}`,
      params: { screen: 'TagScreenTopTabNavigator', params: { screen: 'MapView' } },
    });
    // TagScreenTopTabNavigator
    //
  };

  // わかんね・・・まじどうしよ。。。

  const renderTab = ({ item }) => {
    // const isActive = item._id === currentTag._id;
    const isFocused = currentTag._id === item._id;
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
            // maxWidth: isActive ? null : 100,
            // borderBottomWidth: isActive && 1,
            // borderBottomColor: isActive && 'white',
          }}
          // contentTypeによって、いくnavigatorが変わるわけですよ。。。そう、つまりここでnavigatingを分ければいいわけね。
        >
          <ExpoImage
            style={{ width: 20, height: 20, marginBottom: 5 }}
            source={{ uri: item.icon?.url }}
            // placeholder={blurhash}
            // contentFit='fill'
            // transition={100}
            // tintColor={item.tag.iconType === 'icon' ? item.tag.color : 'rgb(170,170,170)'}
            tintColor={isFocused ? 'white' : 'rgb(100,100,100)'}
          />
          <Text numberOfLines={1} style={{ color: isFocused ? 'white' : 'rgb(100,100,100)', fontSize: 13 }}>
            {item.name}
          </Text>
          {/* <Text style={{ color: 'rgb(170,170,170)', position: 'absolute', top: 7, right: 10 }}>
                  {route.params?.tagObject.tag.count}
                </Text> */}
        </View>
        {/* {spaceUpdates[space._id]?.[item._id] ? (
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
        ) : null} */}

        {/* rgb(100, 100, 100) */}
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingTop: 30, flexDirection: 'row' }}>
        <AppButton.Icon
          onButtonPress={() => drawerNavigation.toggleDrawer()}
          customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)', marginHorizontal: 10 }}
          hasShadow={false}
        >
          <VectorIcon.MCI name='arrow-left' size={18} color={'rgb(190,190,190)'} />
          {/* {calcurateSumUpdates() ? (
                        <View
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: 'red',
                            position: 'absolute',
                            top: -3,
                            right: -3,
                          }}
                        >
                          <View
                            style={{
                              justifyContent: 'center',
                              alignItems: 'center',
                              width: '100%',
                              height: '100%',
                            }}
                          ></View>
                        </View>
                      ) : null} */}
        </AppButton.Icon>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          ref={scrollViewRef}
          data={space?.tags}
          renderItem={renderTab}
          keyExtractor={(item, index) => `${item._id}-${index}`}
          style={{ marginBottom: 10 }}
        />
      </View>
      <Tab.Navigator
        tabBar={() => null}
        // initialRouteName={`Tag_${currentTag?._id}`}
        screenOptions={({ route }) => ({
          lazy: true,
          swipeEnabled: false,
          animationEnabled: true,
        })}
      >
        {space?.tags.map((tag: TagType, index: number) => (
          <Tab.Screen key={index} name={`Tag_${tag._id}`} options={{ title: tag.name }}>
            {({ navigation }) => (
              <TagScreenProvider tag={tag}>
                <TagScreenStackNavigator />
              </TagScreenProvider>
            )}
          </Tab.Screen>
        ))}
      </Tab.Navigator>
      <AppButton.Icon
        customStyle={{ position: 'absolute', bottom: 50, right: 20 }}
        onButtonPress={() => console.log('create post')}
        isPressDisabled={false} // createのstatusをここに足す感じだな。
        hasShadow
      >
        <VectorIcon.II name='add' size={32} color={'black'} />
        {/* {createNewPostResult.isCreating ? (
          <ActivityIndicator size={'small'} />
          ) : (
          <Ionicons name='add' size={32} color={'black'} />
        )} */}
      </AppButton.Icon>
      <ViewPostsTypeToggleButton onGridViewPress={onGridViewPress} onMapViewPress={onMapViewPress} />
    </View>
  );
};
