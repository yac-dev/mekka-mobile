import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const CreateNewPosyStack = createNativeStackNavigator();
import SelectPostType from '../features/CreateNewPost/pages/SelectPostType';
import { Ionicons } from '@expo/vector-icons';
import NormalPost from '../features/CreateNewPost/pages/NormalPost';
import AddTags from '../features/CreateNewPost/pages/AddTags';
import AddLocation from '../features/CreateNewPost/pages/AddLocation';
import AddLocationTag from '../features/CreateNewPost/pages/AddLocationTag';
import MomentPost from '../features/CreateNewPost/pages/MomentPost';
import { GlobalContext } from '../contexts/GlobalContext';
import { SpaceRootContext } from '../features/Space/contexts/SpaceRootContext';
import backendAPI from '../apis/backend';
import CreateNewTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
// import { INITIAL_CREATE_NEW_POST_STATE } from '../App';
import { AuthContext, SnackBarContext } from '../providers';
import { SnackBar, LoadingSpinner, AppButton } from '../components';
import { useLoadingSpinner } from '../hooks/useLoadingSpinner';
import { CurrentSpaceContext } from '../providers';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreateNewPostProvider } from '../features/CreateNewPost/contexts';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { CreatedTagType } from '../features/CreateNewPost/contexts';

export type CreateNewPostStackParams = {
  SelectPostType: undefined;
  NormalPost: undefined;
  AddTags?: {
    createdTag: CreatedTagType;
  };
  AddLocation: undefined;
  MomentPost: undefined;
  CreateNewTag: undefined;
};

export type CreateNewPostStackProps = NativeStackNavigationProp<CreateNewPostStackParams>;

const CreateNewPostStackNavigator = () => {
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

  // const getTags = async () => {
  //   const result = await backendAPI.get(`/spaces/${space._id}/tags`);
  //   const { tags } = result.data;
  //   setTagOptions(() => {
  //     const options = tags.map((tag, index) => {
  //       return {
  //         ...tag,
  //         created: false,
  //       };
  //     });
  //     return options;
  //   });
  // };

  // const getLocationTags = async () => {
  //   const result = await backendAPI.get(`/spaces/${space._id}/locationtags`);
  //   const { locationTags } = result.data;
  //   setLocationTagOptions(() => {
  //     const options = locationTags.map((locationTag, index) => {
  //       return {
  //         ...locationTag,
  //         created: false,
  //       };
  //     });
  //     return options;
  //   });
  // };

  // const onMomentPostPress = async () => {
  //   const payload = new FormData();
  //   payload.append('disappearAfter', space.disappearAfter);
  //   payload.append('createdBy', auth._id);
  //   payload.append('spaceId', space._id);
  //   for (let content of moments) {
  //     const obj = {
  //       name: content.uri.split('/').pop(),
  //       uri: content.uri,
  //       type: content.type === 'image' ? 'image/jpg' : 'video/mp4',
  //     };
  //     payload.append('contents', JSON.parse(JSON.stringify(obj)));
  //   }
  //   console.log(payload);
  //   const result = await backendAPI.post('/moments', payload, {
  //     headers: { 'Content-type': 'multipart/form-data' },
  //   });
  //   const { post } = result.data;
  //   setSnackBar({
  //     isVisible: true,
  //     status: 'success',
  //     message: 'Post has been created successfully.',
  //     duration: 7000,
  //   });
  //   props.navigation.navigate({
  //     name: `Space_${props.route?.params?.spaceAndUserRelationship._id}`,
  //     params: { afterPosted: true }, // 作ったtagをSpaceRootに入れる。
  //     merge: true,
  //   });
  // };

  return (
    <CreateNewPostProvider>
      <CreateNewPosyStack.Navigator>
        <CreateNewPosyStack.Group>
          <CreateNewPosyStack.Screen
            name='SelectPostType'
            component={SelectPostType}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='close' size={18} color={Colors.white} />
                </AppButton.Icon>
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
          <CreateNewPosyStack.Screen
            name='NormalPost'
            component={NormalPost}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <CreateNewPosyStack.Screen
            name='AddTags'
            component={AddTags}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              // headerRight: () => (
              //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              //     {/* <TouchableOpacity
              //       onPress={() => navigation.navigate('CreateNewTag')}
              //       style={{ marginRight: 10 }}
              //       // disabled={validateAddedTags() ? false : true}
              //     >
              //       <Text
              //         style={{
              //           color: 'white',
              //           fontSize: 20,
              //           fontWeight: 'bold',
              //         }}
              //       >
              //         Create
              //       </Text>
              //     </TouchableOpacity> */}
              //     <TouchableOpacity
              //       onPress={() => navigation.navigate('AddLocation')}
              //       disabled={Object.keys(createNewPostFormData.addedTags).length ? false : true}
              //       // disabled={validateAddedTags() ? false : true}
              //     >
              //       <Text
              //         style={{
              //           color: Object.keys(createNewPostFormData.addedTags).length ? 'white' : 'rgb(170,170,170)',
              //           fontSize: 20,
              //           fontWeight: 'bold',
              //         }}
              //       >
              //         Next
              //       </Text>
              //     </TouchableOpacity>
              //   </View>
              // ),
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <CreateNewPosyStack.Screen
            name='AddLocation'
            component={AddLocation}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              // headerRight: () => {
              //   return (
              //     <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              //       <TouchableOpacity onPress={() => onPostPress()}>
              //         <Text
              //           style={{
              //             color: 'white',
              //             fontSize: 20,
              //             fontWeight: 'bold',
              //           }}
              //         >
              //           Post
              //         </Text>
              //       </TouchableOpacity>
              //     </View>
              //   );
              // },
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <CreateNewPosyStack.Screen
            name='MomentPost'
            component={MomentPost}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              // headerRight: () => {
              //   return (
              //     <TouchableOpacity onPress={() => onMomentPostPress()} disabled={moments.length ? false : true}>
              //       <Text
              //         style={{
              //           color: moments.length ? 'white' : 'rgb(70,70,70)',
              //           fontSize: 20,
              //           fontWeight: 'bold',
              //         }}
              //       >
              //         Done
              //       </Text>
              //     </TouchableOpacity>
              //   );
              // },
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
        </CreateNewPosyStack.Group>
        <CreateNewPosyStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          <CreateNewPosyStack.Screen
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
          <CreateNewPosyStack.Screen
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
        </CreateNewPosyStack.Group>
      </CreateNewPosyStack.Navigator>
      <SnackBar.Primary />
    </CreateNewPostProvider>
  );
};

export default CreateNewPostStackNavigator;
