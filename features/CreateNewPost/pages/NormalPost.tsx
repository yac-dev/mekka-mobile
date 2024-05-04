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
import * as ImagePicker from 'expo-image-picker';
import AddPhoto from '../components/AddPhoto';
import AddCaption from '../components/AddCaption';
import AddLocation from '../components/AddLocation';
import AddTags from '../components/AddTags';
import { NavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import backendAPI from '../../../apis/backend';
import { AntDesign } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { ContentThumbnail } from '../components/ContentThumbnail';
import { Video as VideoCompressor, Image as ImageCompressor } from 'react-native-compressor';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';
import { SnackBarContext } from '../../../providers';
import { SnackBar } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { ContentType, CreateNewPostContext } from '../contexts';
import { CreateNewPostStackProps } from '../../../navigations/CreateNewPostStackNavigator';
import { CurrentSpaceContext } from '../../../providers';

const NormalPost = () => {
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const { formData, onCaptionChange, pickUpContents, onRemoveContentPress, onPostTypeChange } =
    useContext(CreateNewPostContext);
  const { currentSpace } = useContext(CurrentSpaceContext);
  const oneAssetWidth = Dimensions.get('window').width / 3;

  useEffect(() => {
    onPostTypeChange('normal');
  }, []);

  useEffect(() => {
    createNewPostStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => createNewPostStackNavigation.navigate('AddTags')}
          disabled={formData.contents.isValidated && formData.caption.isValidated ? false : true}
        >
          <Text
            style={{
              color: formData.postType.isValidated && formData.caption.isValidated ? 'white' : 'rgb(100,100,100)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.contents, formData.caption]);

  const renderContents = () => {
    const list = formData.contents.value.map((content: ContentType, index) => {
      return <ContentThumbnail key={index} content={content} index={index} onRemovePress={onRemoveContentPress} />;
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
        {formData.contents.value.length ? list : null}
      </View>
    );
  };

  const calcurateMinutes = () => {
    if (currentSpace.disappearAfter >= 60) {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
          {currentSpace.disappearAfter / 60} hours.
        </Text>
      );
    } else {
      return (
        <Text style={{ color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }}>
          {currentSpace.disappearAfter} minutes.
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
    if (currentSpace.contentType === 'photo') {
      return <Text style={{ color: 'rgb(180, 180, 180)' }}>Photos</Text>;
    } else if (currentSpace.contentType === 'video') {
      return (
        <Text style={{ color: 'rgb(180, 180, 180)' }}>
          Videos.{'\n'}Video length is limited to {currentSpace.videoLength} seconds
        </Text>
      );
    } else {
      return (
        <Text style={{ color: 'rgb(180, 180, 180)' }}>
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>Photos or Videos</Text>.{'\n'}Video length
          is limited to&nbsp;
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{currentSpace.videoLength} seconds</Text>
        </Text>
      );
    }
  }, []);

  // const pickContents = async () => {
  //   const pickerOption = {
  //     mediaTypes:
  //     currentSpace.contentType === 'photo'
  //         ? ImagePicker.MediaTypeOptions.Images
  //         : space.contentType === 'video'
  //         ? ImagePicker.MediaTypeOptions.Videos
  //         : ImagePicker.MediaTypeOptions.All,
  //     allowsMultipleSelection: true,
  //     quality: 1,
  //     storageOptions: {
  //       skipBackup: true,
  //     },
  //     // duration: space.videoLength ? space.videoLength : 3000,
  //   };

  //   // 多分、ここのstate changeがおかしいな。。。
  //   let result = await ImagePicker.launchImageLibraryAsync(pickerOption);
  //   if (!result.canceled && result.assets) {
  //     const adding = [];
  //     for (const asset of result.assets) {
  //       if (asset.type === 'video') {
  //         // 基本は, videoの時はdurationがspaceのvideo length以下の時だけ入れる様にする。
  //         if (asset.duration / 1000 <= space.videoLength) {
  //           // const compressed = await VideoCompressor.compress(
  //           //   asset.uri,
  //           //   {
  //           //     compressionMethod: 'manual',
  //           //   },
  //           //   (progress) => {
  //           //     // 本当は、ここでprogress使ってsnakcbarを出したりしたいよね。。。
  //           //   }
  //           // );
  //           // console.log('compressed result', compressed);
  //           // console.log('asset url', asset.uri);
  //           adding.push({ uri: asset.uri, type: 'video', duration: asset.duration ? asset.duration : null });
  //           console.log('adding this', adding);
  //         } else {
  //           setSnackBar({
  //             isVisible: true,
  //             status: 'warning',
  //             message: `OOPS. Video length is limited to ${space.videoLength} in this space.`,
  //             duration: 5000,
  //           });
  //         }
  //       } else if (asset.type === 'image') {
  //         // const compressed = await ImageCompressor.compress(asset.uri, { quality: 0.3 });
  //         adding.push({ uri: asset.uri, type: 'photo', duration: asset.duration ? asset.duration : null });
  //       }
  //     }
  //     // result assets それぞれのassetに対して、dataを作る様にすると。
  //     setCreateNewPostFormData((previous) => {
  //       return {
  //         ...previous,
  //         contents: [...previous.contents, ...adding],
  //       };
  //     });
  //   }
  // };

  return (
    // <KeyboardAvoidingView
    //   // これ動かねーな。
    //   behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    //   keyboardVerticalOffset={120}
    //   style={{ flex: 1, backgroundColor: 'black' }}
    //   // keyboardVerticalOffset={Platform.select({
    //   //   ios: Header.HEIGHT, // iOS
    //   //   android:Header.HEIGHT + StatusBar.currentHeight, // android
    //   // })}
    // >
    <ScrollView style={{ flex: 1, backgroundColor: 'black' }} automaticallyAdjustKeyboardInsets={true}>
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
              {formData.postType.value === 'normal' ? 'Normal Post' : 'Moment Post'}
            </Text>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              Please select at most 6 {renderContentType()}.
            </Text>
            {formData.postType.value === 'moment' ? (
              <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
                Your moment post will disappear within{'\n'}
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                  {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
                </Text>
              </Text>
            ) : null}
          </View>
          {formData.contents.value.length >= 6 ? null : (
            <TouchableOpacity
              style={{
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 15,
              }}
              onPress={() => pickUpContents()}
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
            value={formData.caption.value}
            onChangeText={(text) => onCaptionChange(text)}
          />
        </View>
      </TouchableWithoutFeedback>
      <SnackBar.Primary />
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default NormalPost;
