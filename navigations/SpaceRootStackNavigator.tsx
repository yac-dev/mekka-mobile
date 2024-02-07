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
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import SpaceRootBottomTabNavigator from './SpaceRootBottomTabNavigator';
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewPostStackNavigator from './ViewPostStackNavigator';
const Stack = createNativeStackNavigator();

export const INITIAL_CREATE_NEW_POST_STATE = {
  postType: '',
  contents: [],
  caption: '',
  dummyCreatedTagId: 1,
  addedTags: {},
  tagOptions: [],
  addedLocationTag: null,
  location: null,
  locationTagOptions: [],
  moments: [],
};

const SpaceRootStackNavigator = (props) => {
  // const { spaceAndUserRelationship } = useContext(SpaceRootContext);
  const {
    isIpad,
    spaceMenuBottomSheetRef,
    currentSpace,
    setCurrentSpace,
    currentSpaceAndUserRelationship,
    // createNewPostFormData,
    // setCreateNewPostFormData,
    // setCreateNewPostResult,
    // createNewPostResult,
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
  const [currentPost, setCurrentPost] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  // ここでstateでいいんじゃないかな。。。
  const [createNewPostFormData, setCreateNewPostFormData] = useState(INITIAL_CREATE_NEW_POST_STATE);
  const [createNewPostResult, setCreateNewPostResult] = useState({
    isCreating: false, // responseが返ってくるまでは、ここをtrueにする。そんでsnakckbarで、"processing now"的なindicatorを出しておく。
    isSuccess: false,
    isError: false,
    responseData: null,
  });

  // ここが変わってなかったんだよ。。。なんでだろ？？
  // signupした後、spaceを作った後（多分spaceにjoinした後）が動いていない。
  useEffect(() => {
    // isCreating状態ならここのcreateを起こすと。
    if (createNewPostResult.isCreating) {
      createPost();
    }
  }, [createNewPostResult.isCreating]);

  const createPost = async () => {
    const filteredCreatedTags = Object.values(createNewPostFormData.addedTags).filter(
      (element, index) => element.created
    );
    const filteredAddedTags = Object.values(createNewPostFormData.addedTags)
      .filter((element, index) => !element.created)
      .map((element, index) => element._id);
    try {
      const payload = new FormData();
      payload.append('disappearAfter', currentSpaceAndUserRelationship.space.disappearAfter);
      payload.append('type', createNewPostFormData.postType);
      payload.append('reactions', JSON.stringify(currentSpaceAndUserRelationship.space.reactions));
      payload.append('caption', createNewPostFormData.caption);
      payload.append('createdTags', JSON.stringify(filteredCreatedTags));
      payload.append('addedTags', JSON.stringify(filteredAddedTags));
      payload.append('location', JSON.stringify(createNewPostFormData.location));

      // えーと。。。何したいんだっけ？？buffer側は
      const contents = [],
        bufferContents = [];
      createNewPostFormData.contents.forEach((content) => {
        if (content.type === 'photo') {
          const fileName = `${content.uri.split('/').pop().split('.')[0]}.png`;
          const contentObject = {
            fileName: fileName,
            type: 'photo',
            duration: null,
          };
          contents.push(contentObject);

          const bufferContent = {
            name: fileName,
            uri: content.uri,
            type: content.type === 'image/jpg',
          };
          bufferContents.push(bufferContent);
        } else if (content.type === 'video') {
          const fileName = `${content.uri.split('/').pop().split('.')[0]}.mp4`;
          const contentObject = {
            fileName: fileName,
            type: 'video',
            duration: content.duration,
          };

          contents.push(contentObject);
          const bufferContent = {
            name: fileName,
            uri: content.uri,
            type: 'video/mp4',
          };
          bufferContents.push(bufferContent);
        }
      });

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
      payload.append('contents', JSON.stringify(contents));
      console.log('createdTags -> ', filteredCreatedTags);
      console.log('addedTags -> ', filteredAddedTags);
      //  ----- 一回ここdebuggingでコメントアウト
      for (let content of createNewPostFormData.contents) {
        const fileName = `${content.uri.split('/').pop().split('.')[0]}.${content.type === 'photo' ? 'png' : 'mp4'}`;
        const obj = {
          name: fileName,
          uri: content.uri,
          type: content.type === 'photo' ? 'image/jpg' : 'video/mp4',
        };
        payload.append('bufferContents', JSON.parse(JSON.stringify(obj)));
      }
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'It takes couple seconds to finish processing....',
        duration: 4000,
      });
      const result = await backendAPI.post('/posts', payload, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setCreateNewPostResult((previous) => {
        return {
          ...previous,
          isCreating: false,
          isSuccess: true,
          responseData: result.data,
        };
      });
      setCreateNewPostFormData(INITIAL_CREATE_NEW_POST_STATE); // initialのstateに戻す。
      setSnackBar({
        isVisible: true,
        barType: 'success',
        message: 'Post has been created successfully.',
        duration: 5000,
      });
    } catch (error) {
      console.log(error);
    }
  };

  // というよりも、シンプルにsetCreatePostResultの更新じゃないかなー。。？paramsを使うと、その後のstate更新ができなくなるよね。。。
  // useEffect(() => {
  //   if (props.route?.params?.createdPost) {
  //     // ここでapiを起こして、setCreateとかのstate更新をしていく感じかな。。
  //     createPost();
  //     console.log('create post!!');
  //   }
  // }, [props.route?.params?.createdPost]);

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
  // うん。spaceRootの中にcreateNewPostを入れないといけないよね。。。
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
        createNewPostFormData,
        setCreateNewPostFormData,
        createNewPostResult,
        setCreateNewPostResult,
        currentPost,
        setCurrentPost,
        currentIndex,
        setCurrentIndex,
      }}
    >
      <Stack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
          // headerShown: true,
        })}
      >
        <Stack.Group>
          <Stack.Screen
            name='SpaceBottomTabNavigator'
            component={SpaceRootBottomTabNavigator}
            options={({ navigation }) => ({
              // headerShown: false,
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
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
          {/* <Stack.Screen
            name='ViewPostStackNavigator'
            component={ViewPostStackNavigator}
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
          /> */}
        </Stack.Group>
      </Stack.Navigator>
    </SpaceRootContext.Provider>
  );
};

export default SpaceRootStackNavigator;

// tabBar={(props) => <CustomTabBar {...props} />}
// screenOptions={({ route }) => ({
//   tabBarScrollEnabled: false,
//   lazy: true,
//   swipeEnabled: false,
// })}
