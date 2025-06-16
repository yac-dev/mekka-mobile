import { useContext, useRef } from 'react';
import { View, Text, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { useCreateSpace } from '../hooks';
import { LoadingSpinner } from '../../../components';

const Description = () => {
  const { formData, onDescriptionChange } = useContext(CreateNewSpaceContext);
  const { apiResult, requestApi } = useCreateSpace();
  const textInputRef = useRef(null);

  const renderDescriptionLength = () => {
    return (
      <Text
        style={{
          fontSize: 20,
          color: 'rgb(170,170,170)',
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
          Share what your space is about. Let others know the purpose, vibe, or any rules.
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
