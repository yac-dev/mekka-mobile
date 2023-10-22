import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import * as ImagePicker from 'expo-image-picker';
import AddPhoto from '../components/AddPhoto';
import AddCaption from '../components/AddCaption';
import AddLocation from '../components/AddLocation';
import AddTags from '../components/AddTags';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';
import { Video } from 'expo-av';
import SnackBar from '../../../components/SnackBar';

const NormalPost = () => {
  const { isIpad, setSnackBar } = useContext(GlobalContext);
  const { contents, setContents, caption, setCaption, space, navigation, addedTags } = useContext(CreateNewPostContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;

  const renderContents = () => {
    const list = contents.map((content, index) => {
      return (
        <View key={index} style={{ width: oneAssetWidth, height: oneAssetWidth, padding: 2 }}>
          {content.type === 'image' ? (
            <FastImage
              source={{ uri: content.uri }}
              style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            />
          ) : (
            <Video
              source={{ uri: content.uri }}
              style={{ width: '100%', height: '100%', borderRadius: 12, marginRight: 10 }}
            />
          )}
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: -10,
              right: 0,
              backgroundColor: 'red',
              width: 30,
              height: 30,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() =>
              setContents((previous) => {
                const updating = [...previous];
                const updated = updating.filter((content, idx) => index !== idx);
                return updated;
              })
            }
          >
            <Ionicons name='trash' size={20} color={'white'} />
          </TouchableOpacity>
        </View>
      );
    });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        {contents.length >= 6 ? null : (
          <TouchableOpacity
            style={{
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
              width: oneAssetWidth,
              height: oneAssetWidth,
              padding: 2,
              borderRadius: oneAssetWidth / 2,
            }}
            onPress={() => pickContents()}
          >
            <AntDesign name='plus' size={30} color='black' style={{ marginBottom: 10 }} />
            <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 20 }}>Add</Text>
          </TouchableOpacity>
        )}

        {/* {contents.length && list} この記法、react native ではダメらしい。reactではいいんだけど。。。 */}
        {/* Error: Text strings must be rendered within a <Text> component.って言われる。 */}
        {contents.length ? list : null}
      </View>
    );
  };

  const renderContentType = useCallback(() => {
    if (space.contentType === 'photo') {
      return <Text style={{ color: 'rgb(180, 180, 180)' }}>Photos</Text>;
    } else if (space.contentType === 'video') {
      return <Text style={{ color: 'rgb(180, 180, 180)' }}>Videos</Text>;
    } else {
      return <Text style={{ color: 'rgb(180, 180, 180)' }}>Photos or Videos</Text>;
    }
  }, []);

  const pickContents = async () => {
    const pickerOption = {
      mediaTypes:
        space.contentType === 'photo'
          ? ImagePicker.MediaTypeOptions.Images
          : space.contentType === 'video'
          ? ImagePicker.MediaTypeOptions.Videos
          : ImagePicker.MediaTypeOptions.All,
      allowsMultipleSelection: true,
      quality: 1,
      // duration: space.videoLength ? space.videoLength : 3000,
    };
    console.log(pickerOption);
    let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
    if (!result.canceled && result.assets) {
      // result assets それぞれのassetに対して、dataを作る様にすると。
      setContents((previous) => {
        console.log(result.assets);
        const adding = [];
        result.assets.forEach((asset) => {
          if (asset.type === 'video') {
            // 基本は, videoの時はdurationがspaceのvideo length以下の時だけ入れる様にする。
            if (asset.duration / 1000 <= space.videoLength) {
              adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
            } else {
              // addingのarrayに入れないで、snacbarを出してあげる。無理ですって。
              setSnackBar({
                isVisible: true,
                barType: 'warning',
                message: `OOPS. Video length is limited to ${space.videoLength} in this space.`,
                duration: 5000,
              });
            }
          } else if (asset.type === 'image') {
            adding.push({ uri: asset.uri, type: 'image', duration: asset.duration ? asset.duration : null });
          }
        });

        return [...previous, ...adding];
      });

      // Determine media type based on file extension
      // if (uri.endsWith('.jpg') || uri.endsWith('.png')) {
      //   // The picked content is a photo.
      //   console.log('Picked photo:', uri);
      // } else if (uri.endsWith('.mp4') || uri.endsWith('.mov')) {
      //   // The picked content is a video.
      //   console.log('Picked video:', uri);
      // } else {
      //   console.log('Unknown media type:', uri);
      // }

      // setFormData((previous) => {
      //   return {
      //     ...previous,
      //     photos: [...previous.photos, result.assets[0].uri],
      //   };
      // });
    }
  };

  return (
    <KeyboardAvoidingView
      // これ動かねーな。
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, backgroundColor: 'black' }}
      // keyboardVerticalOffset={Platform.select({
      //   ios: Header.HEIGHT, // iOS
      //   android:Header.HEIGHT + StatusBar.currentHeight, // android
      // })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
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
              Normal post
            </Text>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              Please select at most 6 {renderContentType()} at first. {'\n'}The caption is optional.
            </Text>
          </View>
          {renderContents()}
          <TextInput
            style={{
              // backgroundColor: 'rgb(88, 88, 88)',
              padding: 10,
              // borderRadius: 5,
              marginBottom: 20,
              color: 'white',
              borderBottomColor: 'rgb(88, 88, 88)',
              borderBottomWidth: 1,
            }}
            placeholder='Add caption...'
            placeholderTextColor={'rgb(170,170,170)'}
            autoCapitalize='none'
            value={caption}
            onChangeText={(text) => setCaption(text)}
          />
          <SnackBar />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default NormalPost;
