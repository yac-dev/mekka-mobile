import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const EditAccount = () => {
  const { authData, setAuthData } = useContext(GlobalContext);
  const [editingName, setEditingName] = useState('');
  const [editingEmail, setEditingEmail] = useState('');
  const [editingPassword, setEditingPassword] = useState('');
  const [editingAvatar, setEditingAvatar] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [isValidated, setIsValidated] = useState(false);

  const onDonePress = () => {
    console.log('ko');
  };

  useEffect(() => {
    if (editingName.length && editingEmail.length && editingPassword.length) {
      if (editingPassword.length >= 10) {
        setIsValidated(true);
      } else {
        setIsValidated(false);
      }
    } else {
      setIsValidated(false);
    }
  }, [editingName, editingEmail, editingPassword]);

  const onAvatarPress = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      console.log(pickedImage);
      setEditingAvatar(pickedImage.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <TouchableOpacity
        onPress={() => onAvatarPress()}
        style={{ width: 70, height: 70, alignSelf: 'center', marginBottom: 30 }}
      >
        <ExpoImage
          style={{ width: '100%', height: '100%' }}
          source={{ uri: authData.avatar }}
          placeholder={blurhash}
          contentFit='cover'
          transition={1000}
        />
      </TouchableOpacity>
      <View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            borderBottomWidth: 0.3,
            borderBottomColor: 'white',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'rgb(80,80,80)',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <MaterialCommunityIcons name='account' color='white' size={20} />
          </TouchableOpacity>
          <TextInput
            placeholder='Name'
            placeholderTextColor={'rgb(170,170,170)'}
            style={{
              // backgroundColor: 'rgb(80,80,80)',
              height: 50,
              padding: 10,
              flex: 1,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              color: 'white',
            }}
            autoCapitalize='none'
            value={editingName}
            onChangeText={(text) => setEditingName(text)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            borderBottomWidth: 0.3,
            borderBottomColor: 'white',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'rgb(80,80,80)',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <MaterialCommunityIcons name='email' color='white' size={20} />
          </TouchableOpacity>
          <TextInput
            placeholder='Email'
            placeholderTextColor={'rgb(170,170,170)'}
            style={{
              // backgroundColor: 'rgb(80,80,80)',
              height: 50,
              padding: 10,
              flex: 1,
              borderTopRightRadius: 10,
              borderBottomRightRadius: 10,
              color: 'white',
            }}
            autoCapitalize='none'
            value={editingEmail}
            onChangeText={(text) => setEditingEmail(text)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 30,
            borderBottomWidth: 0.3,
            borderBottomColor: 'white',
            marginLeft: 10,
            marginRight: 10,
          }}
        >
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'rgb(80,80,80)',
              borderTopLeftRadius: 10,
              borderBottomLeftRadius: 10,
            }}
          >
            <MaterialCommunityIcons name='key' color='white' size={20} />
          </TouchableOpacity>
          <TextInput
            placeholder='Password at least 10 characters'
            placeholderTextColor={'rgb(170,170,170)'}
            style={{
              // backgroundColor: 'rgb(80,80,80)',
              height: 50,
              padding: 10,
              flex: 1,

              color: 'white',
            }}
            secureTextEntry={isPasswordHidden}
            autoCapitalize='none'
            value={editingPassword}
            onChangeText={(text) => setEditingPassword(text)}
          />
          <TouchableWithoutFeedback onPress={() => setIsPasswordHidden((previous) => !previous)}>
            <View
              style={{
                width: 50,
                height: 50,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'rgb(80,80,80)',
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              <Ionicons name={`${isPasswordHidden ? 'eye' : 'eye-off'}`} color='white' size={20} />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default EditAccount;
