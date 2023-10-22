import React, { useContext, useRef } from 'react';
import { View, Text, TextInput } from 'react-native';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpace';

const Description = () => {
  const { formData, setFormData } = useContext(CreateNewSpaceContext);
  const textInputRef = useRef(null);

  const renderDescriptionLength = () => {
    return (
      <Text
        style={{
          fontSize: 20,
          color: formData.description.length <= 300 ? 'rgb(170,170,170)' : 'red',
          textAlign: 'right',
          marginBottom: 10,
        }}
      >
        {formData.description.length}/300
      </Text>
    );
  };

  return (
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
          Description
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Please write the description about this space.
        </Text>
      </View>
      {renderDescriptionLength()}
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
          value={formData.description}
          onChangeText={(text) => {
            setFormData((previous) => {
              return {
                ...previous,
                description: text,
              };
            });
          }}
          autoCapitalize='none'
        />
      </View>
    </View>
  );
};

export default Description;
