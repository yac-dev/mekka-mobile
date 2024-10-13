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
import { VectorIcon } from '../../../Icons';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { Image as ExpoImage } from 'expo-image';

const oneAssetWidth = Dimensions.get('window').width / 3;

export const NormalPost = () => {
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
              color:
                formData.contents.isValidated && formData.caption.isValidated && formData.addedTagsTable.isValidated
                  ? 'white'
                  : 'rgb(100,100,100)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData.contents, formData.caption, formData.addedTagsTable.isValidated]);

  console.log('tags ->', formData.addedTagsTable);

  // sumbitのvalidationを書かないといかんな。

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

  const renderTagTexts = () => {
    const list = Object.values(formData.addedTagsTable.value).map((tag, index) => {
      return (
        <Text key={index} style={{ color: 'white' }}>
          {tag.name}
        </Text>
      );
    });

    return <View style={{ flexDirection: 'row', marginRight: 5, width: 100 }}>{list}</View>;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black', padding: 10 }} automaticallyAdjustKeyboardInsets={true}>
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
            {/* <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              Please select {renderContentType()}.
            </Text>
            {formData.postType.value === 'moment' ? (
              <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
                Your moment post will disappear within{'\n'}
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
                  {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
                </Text>
              </Text>
            ) : null} */}
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
      <MenuCell
        onCellPress={() => createNewPostStackNavigation.navigate('AddTags')}
        icon={<VectorIcon.OI name='hash' size={20} color='white' style={{ marginRight: 10 }} />}
        title='Tags'
        value={renderTagTexts()}
      />
      <MenuCell
        onCellPress={() => createNewPostStackNavigation.navigate('AddLocation')}
        icon={<VectorIcon.II name='location-sharp' size={20} color='white' style={{ marginRight: 10 }} />}
        title='Location (optional)'
        value={''}
      />
    </ScrollView>
    // </KeyboardAvoidingView>
  );
};

type MenuCellProp = {
  onCellPress: () => void;
  icon: React.ReactNode;
  title: string;
  value: React.ReactNode;
  requirementText?: string;
};

export const MenuCell: React.FC<MenuCellProp> = ({ onCellPress, icon, title, value, requirementText }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 5,
      }}
      onPress={onCellPress}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon}
        <View>
          <Text style={{ color: 'white', fontSize: 17, marginBottom: requirementText !== undefined ? 0 : 4 }}>
            {title}
          </Text>
          {requirementText !== undefined && (
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 12 }}>{requirementText}</Text>
          )}
        </View>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text numberOfLines={1} style={{ fontSize: 15, color: 'rgb(170,170,170)', textAlign: 'right' }}>
          {value}
        </Text>
        <VectorIcon.MCI name='chevron-right' size={20} color='rgb(170,170,170)' />
      </View>
    </TouchableOpacity>
  );
};
