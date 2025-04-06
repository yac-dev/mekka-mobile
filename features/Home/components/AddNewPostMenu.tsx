import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { Image as ExpoImage } from 'expo-image';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { Times } from '../../../utils';

type AddNewPostMenuProps = {
  onAddNewPostPress: () => void;
  onAddNewMomentPress: () => void;
};

// create new post stackへのnavigattionと、create new momentへのnavigationだな。ただ、ここも一気にやりたくはないな。。。
// どっかで区切りたい。

const screenHorizontalPadding = 20;

const itemWidth = (Dimensions.get('window').width - screenHorizontalPadding * 2) / 2;

export const AddNewPostMenu: React.FC<AddNewPostMenuProps> = ({ onAddNewPostPress, onAddNewMomentPress }) => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);

  const renderContentType = () => {
    let text: string = '';
    if (currentSpace?.contentType === 'photo') {
      text = 'Photo';
    } else if (currentSpace?.contentType === 'video') {
      text = `Video. Video length is limited to ${formatTimeString(currentSpace?.videoLength)}`;
    } else {
      text = `Photo and ${formatTimeString(currentSpace?.videoLength)}video post`;
    }
    return text;
  };

  const formatTimeString = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes} mins ${seconds > 0 ? `${seconds} sec` : ''}`;
    }
    return `${seconds} sec`;
  };

  const formatTimeStringForShort = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${seconds > 0 ? `${seconds}s` : ''}`;
    }
    return `${seconds}s`;
  };

  const convertMinutesToHoursAndMinutes = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} minutes`;
    }
  };

  const convertMinutesToHoursAndMinutesForShort = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} m`;
    } else if (remainingMinutes === 0) {
      return `${hours}h`;
    } else {
      return `${hours}h ${remainingMinutes}m`;
    }
  };

  return (
    <View style={{ flexDirection: 'column', paddingHorizontal: screenHorizontalPadding, gap: 12 }}>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgb(38,38,38)',
          borderRadius: 16,
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 12,
          alignItems: 'center',
        }}
        activeOpacity={0.8}
        onPress={onAddNewPostPress}
      >
        <View
          style={{
            backgroundColor: Colors.iconColors['red1'],
            width: 46,
            height: 46,
            marginRight: 15,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ExpoImage
            style={{
              width: 30,
              aspectRatio: 1,
            }}
            source={
              currentSpace?.contentType === 'photo'
                ? require('../../../assets/forApp/photo.png')
                : currentSpace?.contentType === 'video'
                ? require('../../../assets/forApp/video.png')
                : require('../../../assets/forApp/photo-video.png')
            }
            contentFit='cover'
            tintColor={'white'}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 5, fontWeight: 'bold' }}>New Post</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 15 }}>{renderContentType()}</Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 26,
              height: 26,
              backgroundColor: 'rgb(65,65,65)',
              borderRadius: 100,
            }}
          >
            <VectorIcon.MCI name='chevron-right' size={20} color={'rgb(170,170,170)'} />
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          backgroundColor: 'rgb(38,38,38)',
          borderRadius: 16,
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 12,
          alignItems: 'center',
        }}
        activeOpacity={0.8}
        onPress={onAddNewMomentPress}
      >
        <View
          style={{
            backgroundColor: Colors.iconColors['blue1'],
            width: 46,
            height: 46,
            marginRight: 15,
            borderRadius: 14,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ExpoImage
            style={{
              width: 30,
              aspectRatio: 1,
            }}
            source={require('../../../assets/forApp/ghost.png')}
            contentFit='cover'
            tintColor={'white'}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ color: 'white', fontSize: 18, marginBottom: 5, fontWeight: 'bold' }}>New Moment</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 15 }}>
              Vanish after {convertMinutesToHoursAndMinutes(currentSpace?.disappearAfter)}
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 26,
              height: 26,
              backgroundColor: 'rgb(65,65,65)',
              borderRadius: 100,
            }}
          >
            <VectorIcon.MCI name='chevron-right' size={20} color={'rgb(170,170,170)'} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
