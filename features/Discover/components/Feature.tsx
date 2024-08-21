import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { ReactionType, SpaceType } from '../../../types';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { useGetSpaceByIdState } from '../hooks/useGetSpaceByIdState';

export const Feature: React.FC = () => {
  const { apiResult } = useGetSpaceByIdState();
  const [textShown, setTextShown] = useState<boolean>(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
    // console.log(e.nativeEvent);
  }, []);

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

  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: 10 }}>
      <ScrollView>
        <View>
          <View style={{ paddingBottom: 10, paddingHorizontal: 10 }}>
            <Text
              onTextLayout={onTextLayout}
              numberOfLines={textShown ? undefined : 2}
              style={{ lineHeight: 21, color: 'white' }}
            >
              {apiResult.data?.space.description}
            </Text>
            {lengthMore ? (
              <Text
                onPress={toggleNumberOfLines}
                style={{ lineHeight: 21, marginTop: 10, color: 'rgb(170,170,170)', alignSelf: 'flex-end' }}
              >
                {textShown ? 'Read less' : 'Read more...'}
              </Text>
            ) : null}
          </View>
          <AppButton.Cell
            title='Space Visibility'
            subTitle={apiResult.data?.space.isPublic ? 'Public' : 'Private'}
            onButtonPress={() => console.log('hey')}
            customStyle={{ marginBottom: 10 }}
          >
            <VectorIcon.MI name='public' size={20} color='white' style={{ marginRight: 20 }} />
          </AppButton.Cell>
          <AppButton.Cell
            title='Media Type'
            subTitle={
              apiResult.data?.space.contentType === 'photo'
                ? 'Photos'
                : apiResult.data?.space.contentType === 'video'
                ? 'Videos'
                : 'Photos and Videos'
            }
            onButtonPress={() => console.log('hey')}
            customStyle={{ marginBottom: 10 }}
          >
            <VectorIcon.II name='images' size={20} color='white' style={{ marginRight: 20 }} />
          </AppButton.Cell>
          {apiResult.data?.space.videoLength ? (
            <AppButton.Cell
              title='Video Length'
              subTitle={`${apiResult.data?.space.videoLength} seconds`}
              onButtonPress={() => console.log('hey')}
              customStyle={{ marginBottom: 10 }}
            >
              <VectorIcon.II name='play-circle-sharp' size={20} color='white' style={{ marginRight: 20 }} />
            </AppButton.Cell>
          ) : null}
          <AppButton.Cell
            title='Moments'
            subTitle={convertMinutesToHoursAndMinutes(apiResult.data?.space.disappearAfter)}
            onButtonPress={() => console.log('hey')}
            customStyle={{ marginBottom: 10 }}
          >
            <ExpoImage
              style={{ width: 20, height: 20, marginRight: 20 }}
              source={require('../../../assets/forApp/ghost.png')}
              contentFit='contain'
              tintColor={'white'}
            />
          </AppButton.Cell>
          <AppButton.Cell
            title='Comments'
            subTitle={apiResult.data?.space.isCommentAvailable ? 'Available' : 'Turned off'}
            onButtonPress={() => console.log('hey')}
            customStyle={{ marginBottom: 10 }}
          >
            <VectorIcon.MCI name='comment' size={20} color='white' style={{ marginRight: 20 }} />
          </AppButton.Cell>
          <AppButton.Cell
            title='Banner'
            subTitle={'Turned off'}
            onButtonPress={() => console.log('hey')}
            customStyle={{ marginBottom: 10 }}
          >
            <VectorIcon.MCI name='advertisements' size={20} color='white' style={{ marginRight: 20 }} />
          </AppButton.Cell>
        </View>
      </ScrollView>
    </View>
  );
};
