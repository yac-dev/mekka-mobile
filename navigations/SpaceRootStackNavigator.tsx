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
const Stack = createNativeStackNavigator();

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
  const [viewPostsType, setViewPostsType] = useState('tags'); // grid, map, people
  const [isAfterPosted, setIsAfterPosted] = useState(false);
  const [screenLoaded, setScreenLoaded] = useState({});
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
      payload.append('reactions', JSON.stringify(currentSpaceAndUserRelationship.space.reactions));
      payload.append('caption', createNewPostFormData.caption);
      payload.append('createdTags', JSON.stringify(filteredCreatedTags));
      payload.append('addedTags', JSON.stringify(filteredAddedTags));

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
      // payload.append('bufferContents', JSON.parse(JSON.stringify(bufferContents)));
      for (let content of createNewPostFormData.contents) {
        const fileName = `${content.uri.split('/').pop().split('.')[0]}.${content.type === 'photo' ? 'png' : 'mp4'}`;
        const obj = {
          name: fileName,
          uri: content.uri,
          type: content.type === 'photo' ? 'image/jpg' : 'video/mp4',
        };
        payload.append('bufferContents', JSON.parse(JSON.stringify(obj)));
      }
      // console.log('buffer contents', JSON.stringify(createNewPostFormData.contents, null, 4));
      // setLoading(true);
      // setCreateNewPostResult((previous) => {
      //   return {
      //     ...previous,
      //     isCreating: true,
      //   };
      // });
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
      // ここのuseEffectを反応させれば良いのかね多分。
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
