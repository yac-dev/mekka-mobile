import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import SelectPostType from '../features/CreateNewPost/pages/SelectPostType';
import { Ionicons } from '@expo/vector-icons';
import NormalPost from '../features/CreateNewPost/pages/NormalPost';
import AddTags from '../features/CreateNewPost/pages/AddTags';
import AddLocation from '../features/CreateNewPost/pages/AddLocation';
import AddLocationTag from '../features/CreateNewPost/pages/AddLocationTag';
import MomentPost from '../features/CreateNewPost/pages/MomentPost';
import { GlobalContext } from '../contexts/GlobalContext';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import { CreateNewPostContext } from '../features/CreateNewPost/contexts/CreateNewPostContext';
import backendAPI from '../apis/backend';
import CreateNewTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
import LoadingSpinner from '../components/LoadingSpinner';
import { INITIAL_CREATE_NEW_POST_STATE } from '../App';
import { AuthContext, SnackBarContext } from '../providers';

const CreateNewPostStackNavigator = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const {
    setLoading,
    isAfterPosted,
    setIsAfterPosted,
    // createNewPostFormData,
    // setCreateNewPostFormData,
    // createNewPostResult,
    // setCreateNewPostResult,
  } = useContext(GlobalContext);
  const { createNewPostFormData, setCreateNewPostFormData, createNewPostResult, setCreateNewPostResult } =
    useContext(SpaceRootContext);
  const [postType, setPostType] = useState('');
  const [contents, setContents] = useState([]);
  const [caption, setCaption] = useState('');
  const [dummyCreatedTagId, setDummyCreatedTagId] = useState(1);
  const [addedTags, setAddedTags] = useState({});
  const [tagOptions, setTagOptions] = useState([]);
  const [addedLocationTag, setAddedLocationTag] = useState(null);
  const [locationTagOptions, setLocationTagOptions] = useState([]);
  const [moments, setMoments] = useState([]);
  const [defaultTagIcon, setDefaultTagIcon] = useState({});

  const {
    spaceAndUserRelationship: { space },
  } = props.route.params;
  // console.log('navigation??', props.navigation);

  const getTags = async () => {
    const result = await backendAPI.get(`/spaces/${space._id}/tags`);
    const { tags } = result.data;
    setTagOptions(() => {
      const options = tags.map((tag, index) => {
        return {
          ...tag,
          created: false,
        };
      });
      return options;
    });
  };

  const getLocationTags = async () => {
    const result = await backendAPI.get(`/spaces/${space._id}/locationtags`);
    const { locationTags } = result.data;
    setLocationTagOptions(() => {
      const options = locationTags.map((locationTag, index) => {
        return {
          ...locationTag,
          created: false,
        };
      });
      return options;
    });
  };

  const getDefaultTagIcon = async () => {
    const result = await backendAPI.get('/icons?name=hash');
    const { icon } = result.data;
    setDefaultTagIcon(icon);
  };

  useEffect(() => {
    getTags();
    getLocationTags();
    getDefaultTagIcon();
  }, []);

  const onPostPress = async () => {
    // app.tsxにはいけないんだよね。まあ、globalだしどこで実行してもいいのだろうけど、、、
    setCreateNewPostResult((previous) => {
      return {
        ...previous,
        isCreating: true,
      };
    });
    // ここ、なんでnavigationしてくんないんだろ。。。
    // props.navigation.navigate(`Space_${props.route?.params?.spaceAndUserRelationship._id}`);
    props.navigation.navigate('SpaceBottomTabNavigator');
  };

  const onMomentPostPress = async () => {
    const payload = new FormData();
    payload.append('disappearAfter', space.disappearAfter);
    payload.append('createdBy', auth._id);
    payload.append('spaceId', space._id);
    for (let content of moments) {
      const obj = {
        name: content.uri.split('/').pop(),
        uri: content.uri,
        type: content.type === 'image' ? 'image/jpg' : 'video/mp4',
      };
      payload.append('contents', JSON.parse(JSON.stringify(obj)));
    }
    console.log(payload);
    setLoading(true);
    const result = await backendAPI.post('/moments', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    setLoading(false);
    const { post } = result.data;
    setSnackBar({
      isVisible: true,
      status: 'success',
      message: 'Post has been created successfully.',
      duration: 7000,
    });
    props.navigation.navigate({
      name: `Space_${props.route?.params?.spaceAndUserRelationship._id}`,
      params: { afterPosted: true }, // 作ったtagをSpaceRootに入れる。
      merge: true,
    });
  };

  return (
    <CreateNewPostContext.Provider
      value={{
        postType,
        setPostType,
        contents,
        setContents,
        caption,
        setCaption,
        addedTags,
        setAddedTags,
        tagOptions,
        setTagOptions,
        addedLocationTag,
        setAddedLocationTag,
        locationTagOptions,
        setLocationTagOptions,
        space,
        navigation: props.navigation,
        route: props.route,
        dummyCreatedTagId,
        setDummyCreatedTagId,
        moments,
        setMoments,
        defaultTagIcon,
      }}
    >
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='SelectPostType'
            component={SelectPostType}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => null,
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => {
                    navigation.goBack();
                    setCreateNewPostFormData(INITIAL_CREATE_NEW_POST_STATE);
                  }}
                >
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
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
          <Stack.Screen
            name='NormalPost'
            component={NormalPost}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                  </TouchableOpacity>
                );
              },
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('AddTags')}
                  disabled={createNewPostFormData.contents.length ? false : true}
                >
                  <Text
                    style={{
                      color: createNewPostFormData.contents.length ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <Stack.Screen
            name='AddTags'
            component={AddTags}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                  </TouchableOpacity>
                );
              },
              headerRight: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  {/* <TouchableOpacity
                    onPress={() => navigation.navigate('CreateNewTag')}
                    style={{ marginRight: 10 }}
                    // disabled={validateAddedTags() ? false : true}
                  >
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      Create
                    </Text>
                  </TouchableOpacity> */}
                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddLocation')}
                    disabled={Object.keys(createNewPostFormData.addedTags).length ? false : true}
                    // disabled={validateAddedTags() ? false : true}
                  >
                    <Text
                      style={{
                        color: Object.keys(createNewPostFormData.addedTags).length ? 'white' : 'rgb(170,170,170)',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>
              ),
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <Stack.Screen
            name='AddLocation'
            component={AddLocation}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                  </TouchableOpacity>
                );
              },
              headerRight: () => {
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('CreateNewLocationTag')}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                          marginRight: 10,
                        }}
                      >
                        Create
                      </Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity onPress={() => onPostPress()}>
                      <Text
                        style={{
                          color: 'white',
                          fontSize: 20,
                          fontWeight: 'bold',
                        }}
                      >
                        Post
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              },
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <Stack.Screen
            name='MomentPost'
            component={MomentPost}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => {
                return (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
                  </TouchableOpacity>
                );
              },
              headerRight: () => {
                return (
                  <TouchableOpacity onPress={() => onMomentPostPress()} disabled={moments.length ? false : true}>
                    <Text
                      style={{
                        color: moments.length ? 'white' : 'rgb(70,70,70)',
                        fontSize: 20,
                        fontWeight: 'bold',
                      }}
                    >
                      Done
                    </Text>
                  </TouchableOpacity>
                );
              },
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
              // title: 'Mekka',
              // headerTintColor: 'red',
              // headerStyle: {
              //   backgroundColor: 'black',
              //   borderBottomWidth: 0,
              // },
              // tabBarLabel: 'Home',
              // tabBarStyle: {
              //   backgroundColor: 'black',
              //   borderTopWidth: 0,
              // },
            })}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          <Stack.Screen
            name='CreateNewTag'
            component={CreateNewTag}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
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
          <Stack.Screen
            name='CreateNewLocationTag'
            component={CreateNewLocationTag}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
              ),
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
      <LoadingSpinner />
    </CreateNewPostContext.Provider>
  );
};

export default CreateNewPostStackNavigator;
