import React, { useState, useEffect, useContext, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { removeEmojis } from '../utils/removeEmoji';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const CreateNewTag = (props) => {
  const { navigation, defaultTagIcon } = useContext(CreateNewPostContext);
  const [tagName, setTagName] = useState('');
  const inputRef = useRef(null);
  const [tag, setTag] = useState({
    _id: new Date(),
    iconType: 'icon',
    icon: defaultTagIcon,
    image: '',
    name: '',
    color: 'white',
    added: true,
    created: true,
  });
  console.log('default icon ', defaultTagIcon);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onDonePress()}
          disabled={tag.name.length && tag.name.length <= 40 ? false : true}
        >
          <Text
            style={{
              color: tag.name.length && tag.name.length <= 40 ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [tag]);
  // createNewPostStackNavigatorに移動って、まさにこのcreateNewTagが今いる場所だもんね。だからpageが変わらないんだわ。

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const onDonePress = () => {
    const payload = {
      ...tag,
      name: removeEmojis(tag.name),
    };

    navigation.navigate({
      name: 'AddTags',
      params: { createdTag: payload },
      merge: true,
    });
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
          color: tag.name.length <= 40 ? 'rgb(170,170,170)' : 'red',
          alignSelf: 'flex-end',
          marginRight: 10,
          marginBottom: 10,
        }}
      >
        {tag.name.length}/40
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
          value={tag.name}
          onChangeText={(text) =>
            setTag((previous) => {
              return {
                ...previous,
                name: text,
              };
            })
          }
        />
      </View>
      {/* <TextInput
        placeholder='Type tag name and press "Done"'
        placeholderTextColor={'rgb(170, 170, 170)'}
        value={tagName}
        onChangeText={(text) => setTagName(text)}
        style={{ padding: 10, backgroundColor: 'rgb(88,88,88)', borderRadius: 5, color: 'white' }}
      /> */}
    </View>
  );
};

export default CreateNewTag;
