import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import { Image as ExpoImage } from 'expo-image';
import { CreateNewPostStackProps } from '..';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostContext } from '../contexts';
import { useCreateTag } from '../hooks/useCreateTag';

const CreateNewTag = (props) => {
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const { defaultTagIcon } = useContext(CreateNewPostContext);
  const { onCreatingTagNameChange, creatingTag } = useCreateTag();

  const inputRef = useRef(null);

  useEffect(() => {
    createNewPostStackNavigation.setOptions({
      headerRight: () => {
        const normalizedName = creatingTag.name.trim().toLowerCase();
        const isValidLength = creatingTag.name.length > 0 && creatingTag.name.length <= 40;
        const isNotReservedWord = normalizedName !== 'all';
        const isEnabled = isValidLength && isNotReservedWord;

        return (
          <TouchableOpacity onPress={() => onDonePress()} disabled={!isEnabled}>
            <Text
              style={{
                color: isEnabled ? 'white' : 'rgb(117,117, 117)',
                fontSize: 20,
                fontWeight: 'bold',
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        );
      },
    });
  }, [creatingTag]);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDonePress = () => {
    const payload = {
      ...creatingTag,
      name: removeEmojis(creatingTag.name),
    };

    createNewPostStackNavigation.navigate({ name: 'AddTags', params: { createdTag: payload }, merge: true });
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
          Create New Tag
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Couldn't find a tag you want to add?{'\n'}Create one and share with members.
        </Text>
      </View>
      <Text
        style={{
          color: creatingTag.name.length <= 40 ? 'rgb(170,170,170)' : 'red',
          alignSelf: 'flex-end',
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        {creatingTag.name.length}/40
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: 'rgb(88, 88, 88)',
          borderBottomWidth: 1,
          paddingLeft: 10,
          paddingRight: 10,
        }}
      >
        <ExpoImage
          style={{ width: 20, height: 20 }}
          source={defaultTagIcon.url}
          contentFit='cover'
          tintColor={'rgb(170,170,170)'}
        />
        <TextInput
          style={{
            // backgroundColor: 'rgb(88, 88, 88)',
            padding: 10,
            // borderRadius: 5,
            fontSize: 17,
            flex: 1,
            color: 'white',
          }}
          ref={inputRef}
          placeholder='Tag name'
          placeholderTextColor={'rgb(170,170,170)'}
          autoCapitalize='none'
          value={creatingTag.name}
          onChangeText={(text) => onCreatingTagNameChange(text)}
        />
      </View>
    </View>
  );
};

export default CreateNewTag;
