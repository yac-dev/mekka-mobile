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
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
        {/* {createNewPostFormData.contents.length >= 6 ? null : (
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
        )} */}

        {/* {contents.length && list} この記法、react native ではダメらしい。reactではいいんだけど。。。 */}
        {/* Error: Text strings must be rendered within a <Text> component.って言われる。 */}
        {createNewPostFormData.contents.length ? list : null}
      </View>
    );
  };

  const calcurateMinutes = () => {
    if (space.disappearAfter >= 60) {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
          {space.disappearAfter / 60} hours.
        </Text>
      );
    } else {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
          {space.disappearAfter} minutes.
        </Text>
      );
    }
  };

  function convertMinutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  }

  const renderContentType = useCallback(() => {
    if (space.contentType === 'photo') {
      return <Text style={{ color: 'rgb(180, 180, 180)' }}>Photos</Text>;
    } else if (space.contentType === 'video') {
      return (
        <Text style={{ color: 'rgb(180, 180, 180)' }}>
          Videos.{'\n'}Video length is limited to {space.videoLength} seconds
        </Text>
      );
    } else {
      return (
        <Text style={{ color: 'rgb(180, 180, 180)' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Photos or Videos</Text>.{'\n'}Video length
          is limited to&nbsp;
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{space.videoLength} seconds</Text>
        </Text>
      );
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
        return {
          ...previous,
          contents: [...previous.contents, ...adding],
        };
      });
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
                {createNewPostFormData.postType === 'normal' ? 'Normal Post' : 'Moment Post'}
              </Text>
              <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
                Please select at most 6 {renderContentType()}.
              </Text>
              {createNewPostFormData.postType === 'moment' ? (
                <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
                  Your moment post will disappear within{'\n'}
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                    {convertMinutesToHoursAndMinutes(space.disappearAfter)}
                  </Text>
                </Text>
              ) : null}
            </View>
            {createNewPostFormData.contents.length >= 6 ? null : (
              <TouchableOpacity
                style={{
                  padding: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 15,
                }}
                onPress={() => pickContents()}
                activeOpacity={1}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Ionicons name='add-circle-sharp' size={25} color='white' style={{ marginRight: 20 }} />
                  <View>
                    <Text style={{ color: 'white', fontSize: 17 }}>Add</Text>
                  </View>
                </View>
                <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
              </TouchableOpacity>
            )}
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
