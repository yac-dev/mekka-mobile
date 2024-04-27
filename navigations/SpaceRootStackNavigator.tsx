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
import { useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import backendAPI from '../apis/backend';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { SpaceBottomTabNavigator } from './SpaceBottomTabNavigator';
import CreateNewPostStackNavigator from './CreateNewPostStackNavigator';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ViewPostStackNavigator } from './ViewPostStackNavigator';
import { AuthContext, CurrentTagContext } from '../providers';
import { SnackBarContext } from '../providers';
import { SnackBar } from '../components';
import { SpaceType } from '../types';
import { Composer } from '../providers/Providers';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';
import { useGetTags } from '../features/Space/hooks/useGetTags';
import { NavigatorScreenParams } from '@react-navigation/native';
import { VectorIcon } from '../Icons';
import { AppButton } from '../components';
import * as Haptics from 'expo-haptics';
import { Colors } from '../themes/colors';
import { SpaceTopTabNavigator } from './SpaceTopTabNavigator';
import { SpaceInfoStackNavigator } from './SpaceInfoStackNavigator';

// こうやって書くと、nestedな形がよく分かっていいね

// type SpaceBottomTabNavigatorParams = {
//   TagsTopTabNavigator: NavigatorScreenParams<SpaceTopTabNavigatorParams>;
// };
export type SpaceRootStackNavigatorProp = NativeStackNavigationProp<SpaceRootStackParams>;

export type SpaceRootStackParams = {
  TagsTopTabNavigator: NavigatorScreenParams<SpaceTopTabNavigatorParams>;
  CreateNewPostStackNavigator: undefined;
  SpaceInfoStackNavigator: undefined;
};

type SpaceTopTabNavigatorParams = {
  [key: string]: NavigatorScreenParams<PostsTopTabNavigatorParams>;
};

type PostsTopTabNavigatorParams = {
  GridView: undefined;
  MapView: undefined;
};

const SpaceRootStack = createNativeStackNavigator<SpaceRootStackParams>();

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

type SpaceRootStackNavigatorProps = {
  // space: SpaceType;
};

export const SpaceRootStackNavigator: React.FC<SpaceRootStackNavigatorProps> = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const { apiResult: getTagsResult, requestApi: requestGetTags } = useGetTags();
  const { setCurrentTag } = useContext(CurrentTagContext);
  // const { spaceAndUserRelationship } = useContext(SpaceRootContext);

  const {
    isIpad,
    // spaceMenuBottomSheetRef,
    // currentSpace,
    // setCurrentSpace,
    // currentSpaceAndUserRelationship,
    // createNewPostFormData,
    // setCreateNewPostFormData,
    // setCreateNewPostResult,
    // createNewPostResult,
  } = useContext(GlobalContext);
  // const [tags, setTags] = useState({});
  // const [viewPostsType, setViewPostsType] = useState('grid'); // grid, map, people
  // const [screenLoaded, setScreenLoaded] = useState({});
  // ここでstateでいいんじゃないかな。。。
  // もうシンプルに、、、formDataはpostのpageだけで持っておけば良くね？？シンプルにここで重要なのは、stateなわけでさ。。。
  const [createNewPostFormData, setCreateNewPostFormData] = useState(INITIAL_CREATE_NEW_POST_STATE);
  const [createNewPostResult, setCreateNewPostResult] = useState({
    isCreating: false, // responseが返ってくるまでは、ここをtrueにする。そんでsnakckbarで、"processing now"的なindicatorを出しておく。
    isSuccess: false,
    isError: false,
    responseData: null,
  });
  // apiの

  // ここが変わってなかったんだよ。。。なんでだろ？？
  // signupした後、spaceを作った後（多分spaceにjoinした後）が動いていない。
  useEffect(() => {
    // isCreating状態ならここのcreateを起こすと。
    if (createNewPostResult.isCreating) {
      // createPost();
    }
  }, [createNewPostResult.isCreating]);

  // hooksはここでやるよね。。。
  // const createPost = async () => {
  //   const filteredCreatedTags = Object.values(createNewPostFormData.addedTags).filter(
  //     (element, index) => element.created
  //   );
  //   const filteredAddedTags = Object.values(createNewPostFormData.addedTags)
  //     .filter((element, index) => !element.created)
  //     .map((element, index) => element._id);
  //   try {
  //     const payload = new FormData();
  //     payload.append('disappearAfter', currentSpaceAndUserRelationship.space.disappearAfter);
  //     payload.append('type', createNewPostFormData.postType);
  //     payload.append('reactions', JSON.stringify(currentSpaceAndUserRelationship.space.reactions));
  //     payload.append('caption', createNewPostFormData.caption);
  //     payload.append('createdTags', JSON.stringify(filteredCreatedTags));
  //     payload.append('addedTags', JSON.stringify(filteredAddedTags));
  //     payload.append('location', JSON.stringify(createNewPostFormData.location));

  //     // えーと。。。何したいんだっけ？？buffer側は
  //     const contents = [],
  //       bufferContents = [];
  //     createNewPostFormData.contents.forEach((content) => {
  //       if (content.type === 'photo') {
  //         const fileName = `${content.uri.split('/').pop().split('.')[0]}.png`;
  //         const contentObject = {
  //           fileName: fileName,
  //           type: 'photo',
  //           duration: null,
  //         };
  //         contents.push(contentObject);

  //         const bufferContent = {
  //           name: fileName,
  //           uri: content.uri,
  //           type: content.type === 'image/jpg',
  //         };
  //         bufferContents.push(bufferContent);
  //       } else if (content.type === 'video') {
  //         const fileName = `${content.uri.split('/').pop().split('.')[0]}.mp4`;
  //         const contentObject = {
  //           fileName: fileName,
  //           type: 'video',
  //           duration: content.duration,
  //         };

  //         contents.push(contentObject);
  //         const bufferContent = {
  //           name: fileName,
  //           uri: content.uri,
  //           type: 'video/mp4',
  //         };
  //         bufferContents.push(bufferContent);
  //       }
  //     });

  //     if (createNewPostFormData.addedLocationTag) {
  //       if (createNewPostFormData.addedLocationTag.created) {
  //         payload.append('createdLocationTag', JSON.stringify(createNewPostFormData.addedLocationTag)); // これがない場合もある。
  //       } else {
  //         payload.append('addedLocationTag', JSON.stringify(createNewPostFormData.addedLocationTag._id)); // これがない場合もある。
  //       }
  //     } else {
  //       payload.append('addedLocationTag', '');
  //     }
  //     payload.append('createdBy', auth._id);
  //     payload.append('spaceId', currentSpaceAndUserRelationship.space._id);
  //     payload.append('contents', JSON.stringify(contents));
  //     console.log('createdTags -> ', filteredCreatedTags);
  //     console.log('addedTags -> ', filteredAddedTags);
  //     //  ----- 一回ここdebuggingでコメントアウト
  //     for (let content of createNewPostFormData.contents) {
  //       const fileName = `${content.uri.split('/').pop().split('.')[0]}.${content.type === 'photo' ? 'png' : 'mp4'}`;
  //       const obj = {
  //         name: fileName,
  //         uri: content.uri,
  //         type: content.type === 'photo' ? 'image/jpg' : 'video/mp4',
  //       };
  //       payload.append('bufferContents', JSON.parse(JSON.stringify(obj)));
  //     }
  //     setSnackBar({
  //       isVisible: true,
  //       status: 'success',
  //       message: 'It takes couple seconds to finish processing....',
  //       duration: 4000,
  //     });
  //     const result = await backendAPI.post('/posts', payload, {
  //       headers: { 'Content-type': 'multipart/form-data' },
  //     });
  //     setCreateNewPostResult((previous) => {
  //       return {
  //         ...previous,
  //         isCreating: false,
  //         isSuccess: true,
  //         responseData: result.data,
  //       };
  //     });
  //     setCreateNewPostFormData(INITIAL_CREATE_NEW_POST_STATE); // initialのstateに戻す。
  //     setSnackBar({
  //       isVisible: true,
  //       status: 'success',
  //       message: 'Post has been created successfully.',
  //       duration: 5000,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const onCreateNewPostButtonPress = () => {
    console.log('create new post');
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // navigation?.navigate('CreateNewPostStackNavigator', { spaceAndUserRelationship });
  };

  // というよりも、シンプルにsetCreatePostResultの更新じゃないかなー。。？paramsを使うと、その後のstate更新ができなくなるよね。。。
  // useEffect(() => {
  //   if (props.route?.params?.createdPost) {
  //     // ここでapiを起こして、setCreateとかのstate更新をしていく感じかな。。
  //     createPost();
  //     console.log('create post!!');
  //   }
  // }, [props.route?.params?.createdPost]);

  return (
    <View style={{ flex: 1 }}>
      <SpaceRootStack.Navigator
        screenOptions={({ navigation }) => ({
          headerShown: false,
        })}
      >
        <SpaceRootStack.Group>
          <SpaceRootStack.Screen name='TagsTopTabNavigator' component={SpaceTopTabNavigator} />
        </SpaceRootStack.Group>
        <SpaceRootStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <SpaceRootStack.Screen
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
                color: Colors.white,
              },
            })}
          />
        </SpaceRootStack.Group>
        <SpaceRootStack.Group screenOptions={{ presentation: 'modal' }}>
          <SpaceRootStack.Screen
            name='SpaceInfoStackNavigator'
            component={SpaceInfoStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
        </SpaceRootStack.Group>
      </SpaceRootStack.Navigator>
    </View>
  );
};

// spaceRootでもcreateのstateを持っておかないといけない。もしくは、シンプルにformで入力したobjectをこっちに持ってきて、ここでcreateを実行すればいいのかね、別にformのstateをここで持っておく必要はないよね。

{
  /* <Composer components={[({ children }) => <SpaceRootProvider defaultSpace={space}>{children}</SpaceRootProvider>]}></Composer> */
}

// tabBar={(props) => <CustomTabBar {...props} />}
// screenOptions={({ route }) => ({
//   tabBarScrollEnabled: false,
//   lazy: true,
//   swipeEnabled: false,
// })}
