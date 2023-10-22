import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';

const WriteDescription = (props) => {
  const inputAccessoryViewID = 'MEETUP_DESCRIPTION_INPUT';
  const textInputRef = useRef(null);
  const [writingText, setWritingText] = useState('');

  useEffect(() => {
    textInputRef.current.focus();
  }, []);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate({
              name: 'CreateNewSpace',
              params: { writtenDescription: writingText },
              merge: true,
            })
          }
          disabled={writingText && writingText.length <= 300 ? false : true}
        >
          <Text
            style={{
              color: writingText ? 'white' : 'rgb(110,110,110)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [writingText]);

  useEffect(() => {
    if (props.route.params?.description) {
      setWritingText(props.route.params.description);
    }
  }, [props.route.params?.description]);

  const renderDescriptionLength = () => {
    return (
      <Text
        style={{
          fontSize: 13,
          color: writingText.length <= 300 ? 'rgb(170,170,170)' : 'red',
          textAlign: 'right',
          marginBottom: 10,
        }}
      >
        {writingText.length}/300
      </Text>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      {renderDescriptionLength()}
      <View style={{ height: '100%', flexDirection: 'row' }}>
        <TextInput
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
          }}
          color={'white'}
          ref={textInputRef}
          value={writingText}
          onChangeText={setWritingText}
          autoCapitalize='none'
        />
      </View>
    </View>
  );
};

export default WriteDescription;
