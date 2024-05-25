import React, { useReducer, useContext, useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { primaryBackgroundColor, inputBackgroundColor, modalBackgroundColor } from '../../../themes/color';
import { primaryTextColor, placeholderTextColor } from '../../../themes/text';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import backendAPI from '../../../apis/backend';
import Form from '../components/Form';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { AuthContext, SnackBarContext } from '../../../providers';
import { SnackBar, LoadingSpinner } from '../../../components';
import { useLoadingSpinner } from '../../../hooks';

type StickerType = {
  _id: string;
  name: string;
  url: string;
};

type ReactionType = {
  type: 'emoji' | 'sticker';
  emoji: string;
  sticker: StickerType | undefined;
};

type FormDataStateType = {
  name: string;
  icon: string;
  contentType: string;
  isPublic: boolean | undefined;
  isCommentAvailable: boolean | undefined;
  isReactionAvailable: boolean | undefined;
  videoLength: number;
  disappearAfter: number;
  reactions: ReactionType[];
  description: string;
};

type RouterProps = {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
};

const CreateNewSpace: React.FC<RouterProps> = (props) => {
  const { auth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const { isVisibleLoadingSpinner, showLoadingSpinner, hideLoadingSpinner } = useLoadingSpinner();
  const { setSpaceAndUserRelationships } = useContext(GlobalContext);
  const [formData, setFormData] = useState<FormDataStateType>({
    name: '',
    icon: '',
    contentType: '', // ここら辺は、全部選択式になる。
    isPublic: undefined,
    isCommentAvailable: undefined,
    isReactionAvailable: undefined,
    videoLength: 60,
    disappearAfter: 24, // from 5 minutes to 1440 minutes(24 hours), 720 minutes(12 hours)
    reactions: [],
    description: '',
  });
  const [validation, setValidation] = useState({
    name: false,
    icon: false,
    contentType: false,
    isPublic: false,
    isCommentAvailable: false,
    reactions: false,
    videoLength: false,
    disappearAfter: false,
    description: false,
  });
  // objectのvalueが全部trueかをチェックするだけね。

  // const validateForm = useCallback(() => {
  //   const bools = Object.values(validation);
  //   for (let bool of bools) {
  //     if (!bool) {
  //       return false;
  //     }
  //   }
  //   return true;
  // }, [validation]);

  const validateForm = () => {
    const bools = Object.values(validation);
    for (let bool of bools) {
      if (!bool) {
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={
            validation.name &&
            validation.icon &&
            validation.contentType &&
            validation.isPublic &&
            validation.isCommentAvailable &&
            validation.reactions &&
            validation.description
              ? false
              : true
          }
        >
          <Text
            style={{
              color:
                validation.name &&
                validation.icon &&
                validation.contentType &&
                validation.isPublic &&
                validation.isCommentAvailable &&
                validation.reactions &&
                validation.description
                  ? 'white'
                  : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData, validation]);

  const onDonePress = async () => {
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('contentType', formData.contentType);
    payload.append('isPublic', formData.isPublic.toString());
    payload.append('isCommentAvailable', formData.isCommentAvailable.toString());
    payload.append('isReactionAvailable', formData.isReactionAvailable.toString());
    payload.append('reactions', JSON.stringify(formData.reactions));
    payload.append('videoLength', formData.videoLength.toString());
    payload.append('disappearAfter', formData.disappearAfter.toString());
    payload.append('description', formData.description);
    payload.append('createdBy', auth._id);
    const iconData = {
      name: `${auth._id}-${Date.now()}`,
      uri: formData.icon,
      type: 'image/jpeg',
    };

    payload.append('icon', JSON.parse(JSON.stringify(iconData)));
    showLoadingSpinner(); // こういうの多分必要ないかも、api resultを使っていれば。。。
    const result = await backendAPI.post('/spaces', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    hideLoadingSpinner();
    const { spaceAndUserRelationship } = result.data;
    setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
    setSnackBar({
      isVisible: true,
      status: 'success',
      message: `The space has been created successfully. Invite your friends, share your moments${'\n'}and have fun.`,
      duration: 7000,
    });
    props.navigation.navigate('SpacesDrawerNavigator');
  };

  return (
    <CreateNewSpaceContext.Provider
      value={{ formData, setFormData, validation, setValidation, navigation: props.navigation, route: props.route }}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
          <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              Create new Space
            </Text>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              The space is where you and your friends get together and share photos/videos. {'\n'}Make yours and start
              sharing.
            </Text>
          </View>
          <Form />
        </View>
      </SafeAreaView>
      <LoadingSpinner isVisible={isVisibleLoadingSpinner} message={'Processing now'} />
    </CreateNewSpaceContext.Provider>
  );
};

export default CreateNewSpace;
