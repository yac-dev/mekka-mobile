import React, { useContext, useRef, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';
import { AuthContext } from '../../../providers';
import { useCreateSpace } from '../hooks';
import { HomeStackNavigatorProps, RootStackNavigatorProps } from '../../../navigations';
import { MySpacesContext } from '../../../providers';
import { LoadingSpinner } from '../../../components';
import { CurrentSpaceContext } from '../../../providers';
import { CurrentTagContext } from '../../../providers';
import { LogsTableContext } from '../../../providers';

const Description = () => {
  const { auth } = useContext(AuthContext);
  const { setMySpaces, mySpaces } = useContext(MySpacesContext);
  const { setCurrentSpace } = useContext(CurrentSpaceContext);
  const { setCurrentTag } = useContext(CurrentTagContext);
  const { setLogsTable } = useContext(LogsTableContext);
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const { formData, onDescriptionChange } = useContext(CreateNewSpaceContext);
  const { apiResult, requestApi } = useCreateSpace();
  const textInputRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onCreate()} disabled={formData.description.isValidated ? false : true}>
          <Text
            style={{
              color: formData.description.isValidated ? 'white' : 'rgb(170,170,170)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Create
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.description]);

  useEffect(() => {
    if (apiResult.status === 'success') {
      setMySpaces((previous) => [...previous, apiResult.data.space]);
      if (!mySpaces?.length) {
        setCurrentSpace(apiResult.data?.space);
        setCurrentTag(apiResult.data?.space.tags[0]);
        setLogsTable((previous) => {
          return {
            ...previous,
            [apiResult.data?.space._id]: {
              [apiResult.data?.space.tags[0]._id]: 0,
            },
          };
        });
      }
      homeStackNavigation.navigate('SpacesDrawerNavigator');
    }
  }, [apiResult.status]);

  const onCreate = () => {
    const input = { ...formData, user: { _id: auth._id, name: auth.name, avatar: auth.avatar } };
    requestApi(input);
  };

  const renderDescriptionLength = () => {
    return (
      <Text
        style={{
          fontSize: 20,
          color: formData.description.isValidated ? 'rgb(170,170,170)' : 'red',
          textAlign: 'right',
          marginBottom: 10,
        }}
      >
        {formData.description.value.length}/300
      </Text>
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: 'black', padding: 10 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={120}
    >
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
          Description
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Please write the description about this space.
        </Text>
      </View>
      {renderDescriptionLength()}
      <ScrollView>
        <View style={{ height: '100%', flexDirection: 'row' }}>
          <TextInput
            ref={textInputRef}
            multiline={true}
            placeholder={'Write in here...'}
            placeholderTextColor={'rgb(170,170,170)'}
            // inputAccessoryViewID={inputAccessoryViewID}
            style={{
              borderRadius: 10,
              height: '100%',
              // padding: 10,
              // backgroundColor: 'rgb(235, 235, 235)',
              width: '100%', // ここも、下の修正に沿って80 90%に変える。
              fontSize: 18,
              color: 'white',
            }}
            value={formData.description.value}
            onChangeText={(text) => onDescriptionChange(text)}
            autoCapitalize='none'
          />
        </View>
      </ScrollView>
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Processing' textColor={'white'} />
    </KeyboardAvoidingView>
  );
};

export default Description;
