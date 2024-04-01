import React, { useState, useEffect, useContext, useRef } from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { GlobalContext } from '../contexts/GlobalContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Platform,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import backendAPI from '../apis/backend';
import GalleryNew from '../features/Space/components/GalleryNew';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import TaggedPosts from '../features/Space/components/TaggedPosts';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CreatePost from '../features/Space/pages/CreatePost';
import SpaceMenuBottomSheet from '../features/Space/pages/SpaceMenuBottomSheet';
import PostsBottomNavigator from './PostsBottomNavigator';
// import Grid from '../features/Space/components/Grid';
import TagView from '../features/Space/pages/TagView';
import Map from '../features/Space/components/Map';
import ViewPostsTopTabNavigator from './ViewPostsTopTabNavigator';
import ChooseViewBottomSheet from '../features/Space/pages/ChooseViewBottomSheet';
import { TagViewRootContext } from '../features/SpaceMenuBottomSheet/contexts/TagViewRootContext';
import TagViewStackNavigator from './TagViewStackNavigator';
import { Image as ExpoImage } from 'expo-image';
import Dummy2 from '../features/Utils/Dummy2';
import Dummy from '../features/Utils/Dummy';
import { TabView, Route, SceneMap } from 'react-native-tab-view';

const Tab = createMaterialTopTabNavigator();

const TagsTopTabNavigator = (props) => {
  const {
    spaceAndUserRelationship,
    navigation,
    hasSpaceBeenFetched,
    setHasSpaceBeenFetched,
    chooseViewBottomSheetRef,
    viewPostsType,
    screenLoaded,
    setScreenLoaded,
    createNewPostResult,
  } = useContext(SpaceRootContext);
  const {
    isIpad,
    spaceMenuBottomSheetRef,
    currentSpace,
    setCurrentSpace,
    currentTagObject,
    setCurrentTagObject,
    isAfterPosted,
    setIsAfterPosted,
    spaceAndUserRelationshipsFetchingStatus,
    updatesTable,
    setUpdatesTable,
    setCurrentSpaceAndUserRelationship,
    currentSpaceAndUserRelationship,
  } = useContext(GlobalContext);
  const route = useRoute();
  const scrollViewRef = useRef(null);
  // const [space, setSpace] = useState(null);
  const [tags, setTags] = useState({});
  const [tagsFetchingStatus, setTagsFetchingState] = useState('idling'); // 'idling','loading','success', 'error'
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  const [isLoadningTags, setIsLoadingTags] = useState(false);
  const [fetchingState, setFetchingState] = useState({ isLoading: false, success: false, error: false });

  const getTags = async () => {
    // setIsLoadingTags(true);
    // setHaveTagsBeenFetched(false);
    setFetchingState((previous) => {
      return {
        ...previous,
        isLoading: true,
        success: false,
      };
    });
    setTagsFetchingState('loading');
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

    setScreenLoaded(() => {
      const table = {};
      tags.forEach((tag, index) => {
        table[tag._id] = false;
      });

      return table;
    });
    const defaultTagObject = {
      tag: tags[0],
      hasUnreadPosts: tags[0].updatedAt > props.route?.params?.lastCheckedIn ? true : false,
      createdPosts: false,
    };
    setCurrentTagObject(defaultTagObject);
    // setIsLoadingTags(false);
    // setHaveTagsBeenFetched(true);
    setTagsFetchingState('success');
    setFetchingState((previous) => {
      return {
        ...previous,
        isLoading: false,
        success: true,
      };
    });
  };

  useEffect(() => {
    if (spaceAndUserRelationshipsFetchingStatus === 'success') {
      getTags();
    }
  }, [spaceAndUserRelationshipsFetchingStatus]);

  useEffect(() => {
    if (createNewPostResult.isSuccess && createNewPostResult.responseData?.createdTags) {
      console.log('created tags', createNewPostResult.responseData?.createdTags);
      setTags((previous) => {
        const updating = { ...previous };
        createNewPostResult.responseData.createdTags.forEach((tag, index) => {
          updating[tag._id] = {
            tag,
            hasUnreadPosts: tag.updatedAt > props.route?.params?.lastCheckedIn ? true : false,
          };
        });
        return updating;
      });
      setUpdatesTable((previous) => {
        const updating = { ...previous };
        createNewPostResult.responseData.createdTags.forEach((tag, index) => {
          updating[tag.space][tag._id] = 0;
        });

        return updating;
      });
    }
  }, [createNewPostResult]);

  const onTabPress = (tab) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // viewPostsType === 'grid' ? 'TagViewStackNavigator' : 'MavViewStackNavigator'
    setCurrentTagObject(tab);
    navigation.navigate({
      name: `SpaceTab_${tab.tag._id}`,
      params: { screen: viewPostsType === 'grid' ? 'TagViewStackNavigator' : 'MavViewStackNavigator' },
    });
    if (updatesTable[spaceAndUserRelationship.space._id][tab.tag._id]) {
      setUpdatesTable((previous) => {
        const updatesTable = { ...previous };
        updatesTable[spaceAndUserRelationship.space._id][tab.tag._id] = 0;
        return updatesTable;
      });
    } // 一時停止。
  };

  const renderTab = ({ item }) => {
    const isActive = item.tag._id === currentTagObject.tag._id;
    // console.log(isActive);
    // console.log('current tag pbject', currentTagObject);
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
            source={{ uri: item.tag.icon.url }}
            // placeholder={blurhash}
            // contentFit='fill'
            // transition={100}
            // tintColor={item.tag.iconType === 'icon' ? item.tag.color : 'rgb(170,170,170)'}
            tintColor={isActive ? 'white' : 'rgb(150,150,150)'}
          />
          <Text numberOfLines={isActive ? null : 1} style={{ color: isActive ? 'white' : 'rgb(150,150,150)' }}>
            {item.tag.name}
          </Text>
          {/* <Text style={{ color: 'rgb(170,170,170)', position: 'absolute', top: 7, right: 10 }}>
                  {route.params?.tagObject.tag.count}
                </Text> */}
        </View>
        {updatesTable[spaceAndUserRelationship.space._id]?.[item.tag._id] ? (
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
            <Text style={{ color: 'white' }}>{updatesTable[spaceAndUserRelationship.space._id][item.tag._id]}</Text>
          </View>
        ) : null}

        {/* rgb(100, 100, 100) */}
      </TouchableOpacity>
    );
  };

  if (tagsFetchingStatus === 'loading') {
    return (
      <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ActivityIndicator />
      </View>
    );
  }

  // react native tab viewの実装だ。
  if (tagsFetchingStatus === 'success') {
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
          // tabBar={(props) => <CustomTabBar {...props} />}
          tabBar={() => null}
          screenOptions={({ route }) => ({
            lazy: true, // これでそれぞれのとこに足す方がいいのかな。ただな、、
            swipeEnabled: false,
            animationEnabled: true,
          })}
        >
          {Object.values(tags).map((tagObject, index) => (
            <Tab.Screen
              key={index}
              name={`SpaceTab_${tagObject.tag._id}`}
              options={{ title: tagObject.tag.name }}
              initialParams={{ tagObject }}
            >
              {({ navigation }) => (
                // <TagViewStackNavigator
                //   navigation={navigation}
                //   tagObject={tagObject}
                //   tagsFetchingStatus={tagsFetchingStatus}
                // />
                <ViewPostsTopTabNavigator
                  navigation={navigation}
                  tagObject={tagObject}
                  tagsFetchingStatus={tagsFetchingStatus}
                />
              )}
            </Tab.Screen>
          ))}
        </Tab.Navigator>
      </View>
    );
  }
};

export default TagsTopTabNavigator;
