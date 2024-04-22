import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { icons } from '../utils/icons';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
const CreateNewSpaceStack = createNativeStackNavigator();
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
import { AuthContext, SnackBarContext } from '../providers';
import { SnackBar, LoadingSpinner } from '../components';
import { useLoadingSpinner } from '../hooks';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons/VectorIcons';
import { Colors } from '../themes';
import { CreateNewSpaceProvider } from '../features/CreateNewSpace/contexts/CreateNewSpaceProvider';
import { ReactionType } from '../features/CreateNewSpace/contexts/ReactionPickerProvider';

export type CreateNewSpaceStackParams = {
  Overview: undefined;
  SelectSpaceVisibility: undefined;
  ContentType: undefined;
  Moment: undefined;
  Reaction: {
    selectedReactions?: ReactionType[];
  };
  Description: undefined;
  ReactionPicker: {
    reactions?: ReactionType[];
  };
  CreateNewSticker: undefined;
};

export type CreateNewSpaceStackProps = NativeStackNavigationProp<CreateNewSpaceStackParams>;

const CreateNewSpaceStackNavigator = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const { isVisibleLoadingSpinner, showLoadingSpinner, hideLoadingSpinner } = useLoadingSpinner();
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
    <CreateNewSpaceProvider>
      <CreateNewSpaceStack.Navigator>
        <CreateNewSpaceStack.Group>
          <CreateNewSpaceStack.Screen
            name='Overview'
            component={Overview}
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
          <CreateNewSpaceStack.Screen
            name='SelectSpaceVisibility'
            component={SelectSpaceVisibility}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
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
          <CreateNewSpaceStack.Screen
            name='ContentType'
            component={ContentType}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
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
          <CreateNewSpaceStack.Screen
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
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
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
          <CreateNewSpaceStack.Screen
            name='Reaction'
            component={Reaction}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
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
          <CreateNewSpaceStack.Screen
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
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
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
        </CreateNewSpaceStack.Group>
        <CreateNewSpaceStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <CreateNewSpaceStack.Screen
            name='ReactionPicker'
            component={ReactionPicker}
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
          <CreateNewSpaceStack.Screen
            name='CreateNewSticker'
            component={CreateNewSticker}
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
        </CreateNewSpaceStack.Group>
      </CreateNewSpaceStack.Navigator>
      <SnackBar.Primary />
      <LoadingSpinner isVisible={isVisibleLoadingSpinner} message={'Processing now'} />
    </CreateNewSpaceProvider>
  );
};

export default CreateNewSpaceStackNavigator;
