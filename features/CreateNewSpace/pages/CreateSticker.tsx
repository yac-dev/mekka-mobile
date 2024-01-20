import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import backendAPI from '../../../apis/backend';
import baseURL from '../../../apis/baseURL';
import { Ionicons } from '@expo/vector-icons';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { AntDesign } from '@expo/vector-icons';

const CreateCustomEmoji = (props) => {
  const { authData, setLoading } = useContext(GlobalContext);
  const [previewEmoji, setPreviewEmoji] = useState('');
  const [fileName, setFileName] = useState('');
  // const [stickerName, setStickerName] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const onClose = async () => {
    if (fileName) {
      setLoading(true);
      const result = await backendAPI.patch('/stickers/preview', { fileName });
      setLoading(false);
      props.navigation.goBack();
    } else {
      props.navigation.goBack();
    }
  };

  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        // <TouchableOpacity onPress={() => onClose()}>
        //   <Text style={{ color: 'white', fontSize: 20 }}>Close</Text>
        // </TouchableOpacity>
        <TouchableOpacity onPress={() => onClose()}>
          <Ionicons name='close-circle-sharp' size={30} color={'white'} />
        </TouchableOpacity>
      ),
    });
  }, [fileName]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => createSticker()} disabled={fileName ? false : true}>
          <Text
            style={{
              color: fileName ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Add
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [fileName]);

  // pickしたら、その画像をそのままserverに送って、removebgのcodeを動かす感じ。
  const pickImage = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    let creatingFileName = `${pickedImage.assets[0].uri.split('/').pop().split('.')[0]}.png`;
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      const payload = new FormData();

      payload.append('createdBy', authData._id);
      // payload.append('isPublic', '')
      if (fileName) {
        payload.append('exFileName', fileName);
      }
      // const fileName = pickedImage.assets[0].uri;
      // const fileName = `${pickedImage.assets[0].uri.split('/').pop().split('.')[0]}.png`;
      const iconData = {
        name: creatingFileName,
        uri: pickedImage.assets[0].uri,
        type: 'image/jpeg',
      };
      payload.append('originalStickerImage', JSON.parse(JSON.stringify(iconData)));
      setLoading(true);
      const result = await backendAPI.post('/stickers/preview', payload, {
        headers: { 'Content-type': 'multipart/form-data' },
      });
      setLoading(false);
      // const { previewEmoji } = result.data;
      setFileName(creatingFileName);
      // setPreviewEmoji(previewEmoji);
    }

    // user idと日付でfile名を確保しておく。
    // let creatingFileName = `${auth.data._id}-${Date.now()}`;
    // if (!pickedImage.cancelled && pickedImage.uri) {
    // }
  };

  const createSticker = async () => {
    setLoading(true);
    const result = await backendAPI.post('/stickers', { fileName, userId: authData._id });
    setLoading(false);
    const { sticker } = result.data;
    props.navigation.navigate({
      name: 'Stickers',
      params: { createdSticker: { type: 'sticker', emoji: undefined, sticker } },
      merge: true,
    });
  };

  console.log(fileName);
  console.log('source', `${baseURL}/buffer/removed-${fileName}`);
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, marginBottom: 20 }}>
        <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}>
          Create sticker
        </Text>
        <Text style={{ color: 'rgb(170, 170, 170)', textAlign: 'center' }}>
          Couldn't find the sticker you want to use?{'\n'}Create one from an image easily and quickly.{'\n'}This sticker
          will be only usable to space members.
        </Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 30, alignSelf: 'center' }}>
        <Image
          source={require('../../../assets/forApp/elon-wtf-original.png')}
          style={{ width: 100, height: 70, marginRight: 20 }}
        />
        <MaterialCommunityIcons name='chevron-right' color='white' size={25} style={{ marginRight: 20 }} />
        <Image
          source={require('../../../assets/forApp/elon-wtf.png')}
          style={{ width: 70, height: 70, marginRight: 20 }}
        />
      </View>
      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => pickImage()}
        activeOpacity={1}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Ionicons name='add' color='white' size={20} style={{ marginRight: 20 }} />
          <View>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Choose</Text>
          </View>
        </View>
        <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
      </TouchableOpacity>

      {fileName ? (
        <Image
          style={{
            width: 80,
            height: 80,
            alignSelf: 'center',
            marginBottom: 20,
            // backgroundColor: 'white',
          }}
          source={{
            uri: `${baseURL}/buffer/removed-${fileName}`,
          }}
          onLoad={() => setImageLoaded(true)}
          // tintColor={'red'}
        />
      ) : null}

      {/* {fileName ? (
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => console.log('isPublic')}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='add' color='white' size={20} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Sticker visibility</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                {isPublic
                  ? 'This sticker will be publicly accessible to everybody'
                  : 'This sticker is only availbale to this space.'}
              </Text>
            </View>
          </View>
          <Text style={{ color: 'white', fontSize: 17, marginRight: 10 }}>{isPublic ? 'Public' : 'Private'}</Text>
        </TouchableOpacity>
      ) : null} */}
      <LoadingSpinner />
    </View>
  );
};

export default CreateCustomEmoji;
