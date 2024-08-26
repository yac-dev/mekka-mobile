import React, { useState, useContext, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ContentThumbnail } from '../components/ContentThumbnail';
import { SnackBar } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { BufferContentType, ContentType, CreateNewPostContext } from '../contexts';
import { CreateNewPostStackProps } from '../navigations/CreateNewPostStackNavigator';
import { CurrentSpaceContext } from '../../../providers';
import { VectorIcon } from '../../../Icons';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';

const oneAssetWidth = Dimensions.get('window').width / 3;

const NormalPost = () => {
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const {
    formData,
    onCaptionChange,
    pickUpContents,
    onRemoveContentPress,
    onPostTypeChange,
    createNewPostFlashMessageRef,
  } = useContext(CreateNewPostContext);
  const [currentSpace] = useRecoilState(currentSpaceAtom);

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
              color: formData.contents.isValidated && formData.caption.isValidated ? 'white' : 'rgb(100,100,100)',
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
    if (formData.bufferContents.value.length) {
      const list = formData.bufferContents.value.map((content: BufferContentType, index) => {
        return (
          <ContentThumbnail key={index} bufferContent={content} index={index} onBufferContentPress={pickUpContents} />
        );
      });

      return (
        <View style={{ marginBottom: 30, alignItems: 'center' }}>{formData.contents.value.length ? list : null}</View>
      );
    } else {
      return null;
    }
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
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>photos or videos</Text>.{'\n'}Video length
          is limited to&nbsp;
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>{currentSpace.videoLength} seconds</Text>
        </Text>
      );
    }
  }, []);

  return (
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
              {formData.postType.value === 'normal' ? 'New Post' : 'Moment Post'}
            </Text>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              Please select {renderContentType()}.
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
          {formData.contents.value.length === 0 && (
            <TouchableOpacity
              activeOpacity={0.7}
              style={{
                alignSelf: 'center',
                backgroundColor: 'rgb(50,50,50)',
                justifyContent: 'center',
                alignItems: 'center',
                width: 110,
                height: 110,
                padding: 2,
                borderRadius: 110 / 2,
                marginBottom: 10,
              }}
              onPress={() => pickUpContents()}
            >
              <VectorIcon.II name='add' size={35} color='white' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'white', fontSize: 17 }}>Add</Text>
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
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default NormalPost;
