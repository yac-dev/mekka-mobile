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
import { Video } from 'expo-av';
import SnackBar from '../../../components/SnackBar';
import ContentThumbnail from '../components/Content';
import { Video as VideoCompressor, Image as ImageCompressor } from 'react-native-compressor';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

const NormalPost = () => {
  const { isIpad, setSnackBar } = useContext(GlobalContext);
  const { createNewPostFormData, setCreateNewPostFormData } = useContext(SpaceRootContext);
  const { contents, setContents, caption, setCaption, space, navigation, addedTags } = useContext(CreateNewPostContext);
  const oneAssetWidth = isIpad ? Dimensions.get('window').width / 6 : Dimensions.get('window').width / 3;
  const [onProgress, setOnProgress] = useState(false);

  const renderContents = () => {
    const list = createNewPostFormData.contents.map((content, index) => {
      return <ContentThumbnail key={index} content={content} index={index} />;
    });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
        {createNewPostFormData.contents.length >= 6 ? null : (
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
        {createNewPostFormData.contents.length ? list : null}
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
      storageOptions: {
        skipBackup: true,
      },
      // duration: space.videoLength ? space.videoLength : 3000,
    };

    // 多分、ここのstate changeがおかしいな。。。
    let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
    if (!result.canceled && result.assets) {
      const adding = [];
      for (const asset of result.assets) {
        if (asset.type === 'video') {
          // 基本は, videoの時はdurationがspaceのvideo length以下の時だけ入れる様にする。
          if (asset.duration / 1000 <= space.videoLength) {
            // const compressed = await VideoCompressor.compress(
            //   asset.uri,
            //   {
            //     compressionMethod: 'manual',
            //   },
            //   (progress) => {
            //     // 本当は、ここでprogress使ってsnakcbarを出したりしたいよね。。。
            //   }
            // );
            // console.log('compressed result', compressed);
            // console.log('asset url', asset.uri);
            adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
            console.log('adding this', adding);
          } else {
            setSnackBar({
              isVisible: true,
              barType: 'warning',
              message: `OOPS. Video length is limited to ${space.videoLength} in this space.`,
              duration: 5000,
            });
          }
        } else if (asset.type === 'image') {
          // const compressed = await ImageCompressor.compress(asset.uri, { quality: 0.3 });
          adding.push({ uri: asset.uri, type: 'photo', duration: asset.duration ? asset.duration : null });
        }
      }
      // result assets それぞれのassetに対して、dataを作る様にすると。
      setCreateNewPostFormData((previous) => {
        // const adding = [];
        // for (const asset of result.assets) {
        //   if (asset.type === 'video') {
        //     // 基本は, videoの時はdurationがspaceのvideo length以下の時だけ入れる様にする。
        //     if (asset.duration / 1000 <= space.videoLength) {
        //       const compressed = await VideoCompressor.compress(asset.uri);
        //       console.log('compressed result', compressed);
        //       console.log('asset url', asset.uri);
        //       adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
        //       console.log('adding this', adding);
        //     } else {
        //       // addingのarrayに入れないで、snacbarを出してあげる。無理ですって。
        //       setSnackBar({
        //         isVisible: true,
        //         barType: 'warning',
        //         message: `OOPS. Video length is limited to ${space.videoLength} in this space.`,
        //         duration: 5000,
        //       });
        //     }
        //   } else if (asset.type === 'image') {
        //     adding.push({ uri: asset.uri, type: 'photo', duration: asset.duration ? asset.duration : null });
        //   }
        // }
        // result.assets.forEach(async (asset) => {
        //   if (asset.type === 'video') {
        //     // 基本は, videoの時はdurationがspaceのvideo length以下の時だけ入れる様にする。
        //     if (asset.duration / 1000 <= space.videoLength) {
        //       const compressed = await VideoCompressor.compress(asset.uri);
        //       console.log('compressed result', compressed);
        //       console.log('asset url', asset.uri);
        //       adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
        //       console.log('adding this', adding);
        //     } else {
        //       // addingのarrayに入れないで、snacbarを出してあげる。無理ですって。
        //       setSnackBar({
        //         isVisible: true,
        //         barType: 'warning',
        //         message: `OOPS. Video length is limited to ${space.videoLength} in this space.`,
        //         duration: 5000,
        //       });
        //     }
        //   } else if (asset.type === 'image') {
        //     adding.push({ uri: asset.uri, type: 'photo', duration: asset.duration ? asset.duration : null });
        //   }
        // });

        // return [...previous, ...adding];
        return {
          ...previous,
          contents: [...previous.contents, ...adding],
        };
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
      keyboardVerticalOffset={120}
      style={{ flex: 1, backgroundColor: 'black' }}
      // keyboardVerticalOffset={Platform.select({
      //   ios: Header.HEIGHT, // iOS
      //   android:Header.HEIGHT + StatusBar.currentHeight, // android
      // })}
    >
      <ScrollView>
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
              value={createNewPostFormData.caption}
              onChangeText={(text) =>
                setCreateNewPostFormData((previous) => {
                  return {
                    ...previous,
                    caption: text,
                  };
                })
              }
            />
            <SnackBar />
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default NormalPost;
