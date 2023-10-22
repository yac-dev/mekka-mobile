import React, { useReducer, useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { primaryBackgroundColor, inputBackgroundColor, modalBackgroundColor } from '../../../themes/color';
import { primaryTextColor, placeholderTextColor } from '../../../themes/text';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';
import backendAPI from '../../../apis/backend';
import Form from '../components/Form';
import { NavigationProp, RouteProp } from '@react-navigation/native';

type FormDataStateType = {
  name: string;
  icon: string;
  contentType: string;
  isPublic: boolean;
  isCommentAvailable: boolean;
  isReactionAvailable: boolean;
  // reactions: string[];
  // tags: string[];
};

type RouterProps = {
  navigation: NavigationProp<any, any>;
};

const CreateNewSpace: React.FC<RouterProps> = (props) => {
  // ここに、stateを持たせるのって、よくないのかね。。。分からん。。。
  const { globalState } = useContext(GlobalContext);
  const [formData, setFormData] = useState<FormDataStateType>({
    name: '',
    icon: '',
    contentType: 'photo', // ここら辺は、全部選択式になる。
    isPublic: true,
    isCommentAvailable: true,
    isReactionAvailable: true,
    // reactions: [],
    // tags: []
  });

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={false}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  const onDonePress = async () => {
    // const payload = {
    //   name: formData.name,
    //   icon: formData.icon,
    //   contentType: formData.contentType,
    //   isPublic: formData.isPublic,
    //   isCommentAvailable: formData.isCommentAvailable,
    //   isReactionAvailable: formData.isReactionAvailable,
    //   createdBy: '64ab71ebc5bab81dcfe7d2fd',
    // };
    const payload = new FormData();
    payload.append('name', formData.name);
    payload.append('contentType', formData.contentType);
    payload.append('isPublic', formData.isPublic.toString());
    payload.append('isCommentAvailable', formData.isCommentAvailable.toString());
    payload.append('isReactionAvailable', formData.isReactionAvailable.toString());
    payload.append('createdBy', '64ab71ebc5bab81dcfe7d2fd');

    const iconFile = new File([formData.icon], `64ab71ebc5bab81dcfe7d2fd-${new Date()}`, {
      type: 'image/jpeg',
    });

    const iconData = {
      name: `64ab71ebc5bab81dcfe7d2fd-${new Date()}`,
      uri: formData.icon,
      type: 'image/jpeg',
    };

    payload.append('icon', JSON.parse(JSON.stringify(iconData)));
    const result = await backendAPI.post('/spaces', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  };

  return (
    <CreateNewSpaceContext.Provider value={{ formData, setFormData }}>
      <SafeAreaView style={{ flex: 1, backgroundColor: modalBackgroundColor }}>
        <View style={{ flex: 1, backgroundColor: modalBackgroundColor, padding: 10 }}>
          <Form />
          {/* <Text style={{ color: primaryTextColor }}>Create your photos/videos sharing space from scratch</Text>
          <TextInput
            placeholder='Space name'
            placeholderTextColor={placeholderTextColor}
            onChangeText={(text) => {
              dispatch({ type: 'SET_NAME', payload: text });
            }}
            value={state.name}
            style={{
              color: primaryTextColor,
              backgroundColor: inputBackgroundColor,
              borderRadius: 5,
              padding: 10,
              marginBottom: 10,
            }}
          />
          <Text style={{ color: primaryTextColor }}>Content type</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_CONTENT_TYPE', payload: 'photo' })}
            >
              <Text style={{ color: primaryTextColor }}>Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_CONTENT_TYPE', payload: 'video' })}
            >
              <Text style={{ color: primaryTextColor }}>Video</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: primaryTextColor }}>visibility</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_PUBLIC', payload: true })}
            >
              <Text style={{ color: primaryTextColor }}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_PUBLIC', payload: false })}
            >
              <Text style={{ color: primaryTextColor }}>no</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: primaryTextColor }}>is comment available</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_COMMENT_AVAILABLE', payload: true })}
            >
              <Text style={{ color: primaryTextColor }}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_COMMENT_AVAILABLE', payload: false })}
            >
              <Text style={{ color: primaryTextColor }}>no</Text>
            </TouchableOpacity>
          </View>

          <Text style={{ color: primaryTextColor }}>isReaction available</Text>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_REACTION_AVAILABLE', payload: true })}
            >
              <Text style={{ color: primaryTextColor }}>yes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ backgroundColor: 'blue', padding: 10 }}
              onPress={() => dispatch({ type: 'SET_IS_REACTION_AVAILABLE', payload: false })}
            >
              <Text style={{ color: primaryTextColor }}>no</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ backgroundColor: 'yellow', padding: 10 }} onPress={() => onDonePress()}>
            <Text style={{ color: 'red' }}>Create</Text>
          </TouchableOpacity> */}
        </View>
      </SafeAreaView>
    </CreateNewSpaceContext.Provider>
  );
};

export default CreateNewSpace;
