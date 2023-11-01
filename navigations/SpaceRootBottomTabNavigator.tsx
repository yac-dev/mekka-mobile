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
import FastImage from 'react-native-fast-image';
import ViewPostsTopTabNavigator from './ViewPostsTopTabNavigator';
import TagsTopTabNavigator from './TagsTopTabNavigator';
import Projects from '../features/Space/pages/Projects';
import ChooseViewBottomSheet from '../features/Space/pages/ChooseViewBottomSheet';
import LocationsViewPostsBottomSheet from '../features/Space/components/LocationsViewPostsBottomSheet';
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
import MomentsViewStackNavigator from './MomentsViewStackNavigator';

const Tab = createBottomTabNavigator();
const viewTypeObject = {
  grid: <MaterialCommunityIcons name='dots-grid' color='black' size={25} />,
  map: (
    <FastImage source={require('../assets/forApp/globe.png')} style={{ width: 25, height: 25 }} tintColor={'black'} />
  ),
  people: <MaterialCommunityIcons name='account-multiple' color='black' size={25} />,
};

const SpaceRootBottomTabNavigator = (props) => {
  const { spaceAndUserRelationship } = useContext(SpaceRootContext);
  const {
    isIpad,
    spaceMenuBottomSheetRef,
    currentSpace,
    setCurrentSpace,
    currentSpaceAndUserRelationship,
    createNewPostFormData,
    setCreateNewPostResult,
    setSnackBar,
    authData,
  } = useContext(GlobalContext);
  const [space, setSpace] = useState(null);
  const [hasSpaceBeenFetched, setHasSpaceBeenFetched] = useState(false);
  const [tags, setTags] = useState({});
  const [haveTagsBeenFetched, setHaveTagsBeenFetched] = useState(false);
  const chooseViewBottomSheetRef = useRef(null);
  const locationsViewPostsBottomSheetRef = useRef(null);
  const [locationsViewPosts, setLocationsViewPosts] = useState([]);
  const [haveLocationsViewPostsBeenFetched, setHaveLocationsViewPostsBeenFetched] = useState(false);
  const [isFetchingLocationsViewPosts, setIsFetchingLocationsViewPosts] = useState(false);
  const [selectedLocationTag, setSelectedLocationTag] = useState(null);
  const [viewPostsType, setViewPostsType] = useState('grid'); // grid, map, people
  const [isAfterPosted, setIsAfterPosted] = useState(false);
  const [screenLoaded, setScreenLoaded] = useState({});

  const createPost = async () => {
    const filteredCreatedTags = Object.values(createNewPostFormData.addedTags).filter(
      (element, index) => element.created
    );
    const filteredAddedTags = Object.values(createNewPostFormData.addedTags)
      .filter((element, index) => !element.created)
      .map((element, index) => element._id);
    try {
      const payload = new FormData();
      payload.append('reactions', JSON.stringify(currentSpaceAndUserRelationship.space.reactions));
      payload.append('caption', createNewPostFormData.caption);
      payload.append('createdTags', JSON.stringify(filteredCreatedTags));
      payload.append('addedTags', JSON.stringify(filteredAddedTags));
      if (createNewPostFormData.addedLocationTag) {
        if (createNewPostFormData.addedLocationTag.created) {
          payload.append('createdLocationTag', JSON.stringify(createNewPostFormData.addedLocationTag)); // これがない場合もある。
        } else {
          payload.append('addedLocationTag', JSON.stringify(createNewPostFormData.addedLocationTag._id)); // これがない場合もある。
        }
      } else {
        payload.append('addedLocationTag', '');
      }
      payload.append('createdBy', authData._id);
      payload.append('spaceId', currentSpaceAndUserRelationship.space._id);
      for (let content of createNewPostFormData.contents) {
        const obj = {
          name: content.uri.split('/').pop(),
          uri: content.uri,
          type: content.type === 'image' ? 'image/jpg' : 'video/mp4',
        };
        payload.append('contents', JSON.parse(JSON.stringify(obj)));
      }
      console.log(payload);
      // setLoading(true);
      setCreateNewPostResult((previous) => {
        return {
          ...previous,
          isCreating: true,
        };
      });
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'It takes couple seconds to finish processing....',
        duration: 4000,
      });
      const result = await backendAPI.post('/posts', payload, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      // setLoading(false);
      setCreateNewPostResult((previous) => {
        return {
          ...previous,
          isCreating: false,
          isSuccess: true,
          responseData: result.data,
        };
      });
      // setCreateNewPostFormData((previou))// initialのstateに戻す。
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Post has been created successfully.',
        duration: 5000,
      });
      // なるほど、戻る時に必要になるのか。。。でもなーーーー。
      // props.navigation.navigate({
      //   name: `Space_${props.route?.params?.spaceAndUserRelationship._id}`,
      //   params: { afterPosted: true }, // 作ったtagをSpaceRootに入れる。
      //   merge: true,
      // });
      // setIsAfterPosted(true);
      // ここで、pageに戻った後に今いるこのspaceをrefreshすればいいんだけど。。。
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (props.route?.params?.createdPost) {
      // ここでapiを起こして、setCreateとかのstate更新をしていく感じかな。。
      createPost();
      console.log('create post!!');
    }
  }, [props.route?.params?.createdPost]);

  // const getSpaceById = async () => {
  //   setHasSpaceBeenFetched(false);
  //   const result = await backendAPI.get(`/spaces/${props.spaceAndUserRelationship.space._id}`);
  //   const { space } = result.data;
  //   setSpace(space);
  //   setCurrentSpace(space); // globalで持っているspaceだからねこれ。bottom sheetでrenderするためのもの。
  //   setHasSpaceBeenFetched(true);
  // };

  // const getTags = async () => {
  //   const result = await backendAPI.get(`/spaces/${props.spaceAndUserRelationship.space._id}/tags`);
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
  //   setHaveTagsBeenFetched(true);
  // };

  // useEffect(() => {
  //   getSpaceById();
  // }, []);

  // useEffect(() => {
  //   if(space){
  //     getTags();
  //   }
  // },[hasSpaceBeenFetched, space])

  // useEffect(() => {
  //   getTags();
  // }, []);

  // useNavigationでも使ってみようかね。
  // うん。とりあえず、ここでまんまnavigationをすることは難しそう。。。
  return (
    <SpaceRootContext.Provider
      value={{
        spaceAndUserRelationship: props.spaceAndUserRelationship,
        // space,
        hasSpaceBeenFetched,
        setHasSpaceBeenFetched,
        navigation: props.navigation,
        locationsViewPosts,
        setLocationsViewPosts,
        haveLocationsViewPostsBeenFetched,
        setHaveLocationsViewPostsBeenFetched,
        locationsViewPostsBottomSheetRef,
        selectedLocationTag,
        setSelectedLocationTag,
        isFetchingLocationsViewPosts,
        setIsFetchingLocationsViewPosts,
        chooseViewBottomSheetRef,
        viewPostsType,
        setViewPostsType,
        isAfterPosted,
        setIsAfterPosted,
        screenLoaded,
        setScreenLoaded,
      }}
    >
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
              // position: 'absolute',
              // bottom: 30,
              // justifyContent: 'center',
              // alignItems: 'center',
            },
            // tabBarLabel: navigation.isFocused() ? route.name : '',
          })}
        >
          <Tab.Screen
            name='ViewPostsTopTabNavigator'
            component={ViewPostsTopTabNavigator}
            options={({ navigation, route }) => ({
              // tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Octicons
                  name='hash'
                  color={focused ? 'white' : 'rgb(100, 100, 100)'}
                  size={23}
                  style={{ marginBottom: 5 }}
                />
              ),
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
              },
            })}
          />

          <Tab.Screen
            name='MomentsViewStackNavigator'
            component={MomentsViewStackNavigator}
            options={({ navigation }) => ({
              // tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <FastImage
                  source={require('../assets/forApp/ghost.png')}
                  style={{ width: 25, height: 25, marginBottom: 5 }}
                  tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
                />
              ),
              tabBarLabel: ({ focused }) => {
                return <Text style={{ color: focused ? 'white' : 'rgb(100, 100, 100)', fontSize: 13 }}>Moments</Text>;
              },
            })}
          />
          {/* <Tab.Screen
            name='Projects'
            component={Projects}
            options={({ navigation }) => ({
              // tabBarShowLabel: false,
              tabBarIcon: ({ size, color, focused }) => (
                <Ionicons name='musical-notes' color={focused ? 'white' : 'rgb(100, 100, 100)'} size={30} />
                // <FastImage
                //   source={require('../assets/forApp/cameraman.png')}
                //   style={{ width: 25, height: 25 }}
                //   tintColor={focused ? 'white' : 'rgb(100, 100, 100)'}
                // />
              ),
              tabBarLabel: ({ focused }) => {
                return <Text style={{ color: 'white' }}>{focused ? 'Projects' : null}</Text>;
              },
            })}
          /> */}
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
    </SpaceRootContext.Provider>
  );
};

export default SpaceRootBottomTabNavigator;

// tabBar={(props) => <CustomTabBar {...props} />}
// screenOptions={({ route }) => ({
//   tabBarScrollEnabled: false,
//   lazy: true,
//   swipeEnabled: false,
// })}
