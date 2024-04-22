import React, { useContext, useRef, useEffect } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform, TouchableOpacity } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';

const Description = () => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onDescriptionChange } = useContext(CreateNewSpaceContext);
  const textInputRef = useRef(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          // onPress={() => onCreatePress()}
          disabled={formData.description.isValidated ? false : true}
        >
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
  }, []);

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
    </KeyboardAvoidingView>
  );
};

export default Description;
