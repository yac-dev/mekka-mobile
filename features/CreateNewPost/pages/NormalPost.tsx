import React, { useState, useContext, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { ContentThumbnail } from '../components/ContentThumbnail';
import { SnackBar } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import { BufferContentType, ContentType, CreateNewPostContext } from '../contexts';
import { CreateNewPostStackProps } from '../../../navigations/CreateNewPostStackNavigator';
import { CurrentSpaceContext } from '../../../providers';

const NormalPost = () => {
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const { formData, onCaptionChange, pickUpContents, onRemoveContentPress, onPostTypeChange } =
    useContext(CreateNewPostContext);
  const { currentSpace } = useContext(CurrentSpaceContext);

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
    const list = formData.bufferContents.value.map((content: BufferContentType, index) => {
      return (
        <ContentThumbnail key={index} bufferContent={content} index={index} onRemovePress={onRemoveContentPress} />
      );
    });

    return (
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 30 }}>
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
          <Text style={{ fontWeight: 'bold', color: 'white', fontSize: 16 }}>photo or video</Text>.{'\n'}Video length is
          limited to&nbsp;
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
              {formData.postType.value === 'normal' ? 'Normal Post' : 'Moment Post'}
            </Text>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              Please select a {renderContentType()}.
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
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

export default NormalPost;
