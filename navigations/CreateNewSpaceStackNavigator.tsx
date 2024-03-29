import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Overview from '../features/CreateNewSpace/pages/Overview';
import SelectSpaceVisibility from '../features/CreateNewSpace/pages/SelectSpaceVisibility';
import ContentType from '../features/CreateNewSpace/pages/ContentType';
import Moment from '../features/CreateNewSpace/pages/Moment';
import Reaction from '../features/CreateNewSpace/pages/Reaction';
import Description from '../features/CreateNewSpace/pages/Description';
import ReactionPicker from '../features/CreateNewSpace/pages/ReactionPicker';
import CreateNewSticker from '../features/CreateNewSpace/pages/CreateSticker';
import { Ionicons } from '@expo/vector-icons';
import { GlobalContext } from '../contexts/GlobalContext';
import { CreateNewSpaceContext } from '../features/CreateNewSpace/contexts/CreateNewSpace';
import backendAPI from '../apis/backend';
import CreateNewTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
import LoadingSpinner from '../components/LoadingSpinner';
import { AuthContext } from '../providers';
import { SnackBarContext } from '../providers';

const CreateNewSpaceStackNavigator = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const {
    setLoading,
    setSpaceAndUserRelationships,
    spaceAndUserRelationships,
    setUpdatesTable,
    setCurrentSpaceAndUserRelationship,
  } = useContext(GlobalContext);
  const [formData, setFormData] = useState({
    name: '',
    icon: '',
    contentType: '', // ここら辺は、全部選択式になる。
    isPublic: undefined,
    isCommentAvailable: true,
    isReactionAvailable: undefined,
    videoLength: 60,
    disappearAfter: 1439, // from 5 minutes to 1399 minutes(23 hours 59 min), 720 minutes(12 hours) defautlで23時間59分
    reactions: [],
    description: '',
  });

  // const {
  //   currentSpaceAndUserRelationship: { space },
  // } = props.route.params;

  const onCreatePress = async () => {
    const userData = {
      _id: auth._id,
      name: auth.name,
      avatar: auth.avatar,
    };
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('contentType', formData.contentType);
    payload.append('isPublic', formData.isPublic.toString()); // ここ、booleanのdata送るのも大変だよな。。。
    payload.append('isCommentAvailable', formData.isCommentAvailable.toString());
    payload.append('isReactionAvailable', formData.isReactionAvailable.toString());
    payload.append('reactions', JSON.stringify(formData.reactions));
    payload.append('videoLength', formData.videoLength.toString());
    payload.append('disappearAfter', formData.disappearAfter.toString());
    payload.append('description', formData.description);
    payload.append('createdBy', JSON.stringify(userData));
    const fileName = `${formData.icon.split('/').pop().split('.')[0]}.png`;
    const iconData = {
      name: fileName,
      uri: formData.icon,
      type: 'image/jpeg',
    };

    payload.append('icon', JSON.parse(JSON.stringify(iconData)));
    // console.log('payload', payload);
    setLoading(true);
    const result = await backendAPI.post('/spaces', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    setLoading(false);
    const { spaceAndUserRelationship } = result.data;
    // console.log('created!!!', spaceAndUserRelationship);
    setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
    // もし、ユーザーが何もspaceを持っていなかったら、currentSpaceAndUserに入れる。その後すぐにpostできる様に。
    if (!spaceAndUserRelationships.length) {
      setCurrentSpaceAndUserRelationship(spaceAndUserRelationship);
    }
    setUpdatesTable((previous) => {
      return {
        ...previous,
        [spaceAndUserRelationship.space._id]: {},
      };
    });
    setSnackBar({
      isVisible: true,
      status: 'success',
      message: 'The space has been created successfully. Invite your friends, share your moments and have fun.',
      duration: 7000,
    });
    props.navigation.navigate('SpacesDrawerNavigator');
  };

  return (
    <CreateNewSpaceContext.Provider
      value={{
        formData,
        setFormData,
        navigation: props.navigation,
      }}
    >
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            name='Overview'
            component={Overview}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('SelectSpaceVisibility')}
                  disabled={formData.icon.length && formData.name.length && formData.name.length <= 40 ? false : true}
                >
                  <Text
                    style={{
                      color:
                        formData.name.length && formData.icon.length && formData.name.length <= 40
                          ? 'white'
                          : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
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
            name='SelectSpaceVisibility'
            component={SelectSpaceVisibility}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('ContentType')}
                  disabled={formData.isPublic !== undefined ? false : true}
                >
                  <Text
                    style={{
                      color: formData.isPublic !== undefined ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
            name='ContentType'
            component={ContentType}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Moment')}
                  disabled={formData.contentType ? false : true}
                >
                  <Text
                    style={{
                      color: formData.contentType ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
            name='Moment'
            component={Moment}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Reaction')}
                  disabled={formData.disappearAfter ? false : true}
                >
                  <Text
                    style={{
                      color: formData.disappearAfter ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
            name='Reaction'
            component={Reaction}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate('Description')}
                  disabled={
                    (formData.isReactionAvailable && formData.reactions.length) || !formData.isReactionAvailable
                      ? false
                      : true
                  }
                >
                  <Text
                    style={{
                      color:
                        (formData.isReactionAvailable && formData.reactions.length) || !formData.isReactionAvailable
                          ? 'white'
                          : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Next
                  </Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
            name='Description'
            component={Description}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => onCreatePress()}
                  disabled={formData.name.length && formData.icon && formData.isPublic !== undefined ? false : true}
                >
                  <Text
                    style={{
                      color:
                        formData.description.length && formData.description.length >= 10 ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Create!
                  </Text>
                </TouchableOpacity>
              ),
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
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
        <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          {/* <Stack.Screen
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
          /> */}
        </Stack.Group>
        <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <Stack.Screen
            name='ReactionPicker'
            component={ReactionPicker}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              // headerRight: () => (
              //   <TouchableOpacity
              //     onPress={() => console.log('create done!!')}
              //     disabled={formData.name.length && formData.icon && formData.isPublic !== undefined ? false : true}
              //   >
              //     <Text
              //       style={{
              //         color: formData.name.length ? 'white' : 'rgb(170,170,170)',
              //         fontSize: 20,
              //         fontWeight: 'bold',
              //       }}
              //     >
              //       Add
              //     </Text>
              //   </TouchableOpacity>
              // ),
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
            name='CreateNewSticker'
            component={CreateNewSticker}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => console.log('create done!!')}
                  disabled={formData.name.length && formData.icon && formData.isPublic !== undefined ? false : true}
                >
                  <Text
                    style={{
                      color: formData.name.length ? 'white' : 'rgb(170,170,170)',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Create!
                  </Text>
                </TouchableOpacity>
              ),
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
    </CreateNewSpaceContext.Provider>
  );
};

export default CreateNewSpaceStackNavigator;
