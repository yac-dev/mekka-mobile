import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';

const AddTag = (props) => {
  const [tagName, setTagName] = useState('');

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={tagName.length ? false : true}>
          <Text
            style={{
              color: tagName.length ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [tagName]);

  const onDonePress = () => {
    props.navigation.navigate({ name: 'CreateNewSpace', params: { addedTag: tagName }, merge: true });
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
          Create tag
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Couldn't find a tag you wanna add?{'\n'}Create one and share with members.
        </Text>
      </View>
      <TextInput
        placeholder='Type tag name and press "Done".'
        placeholderTextColor={'rgb(170, 170, 170)'}
        value={tagName}
        onChangeText={(text) => setTagName(text)}
        style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, color: 'white' }}
      />
    </View>
  );
};

export default AddTag;
