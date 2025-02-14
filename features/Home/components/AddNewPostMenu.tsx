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
      text = `Photo and Video${'\n'}${formatTimeString(currentSpace?.videoLength)} video post`;
    }
    return text;
  };

  const formatTimeString = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    if (minutes > 0) {
      return `${minutes} minutes ${seconds > 0 ? `${seconds} seconds` : ''}`;
    }
    return `${seconds} seconds`;
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
    <View style={{ flexDirection: 'row', paddingHorizontal: screenHorizontalPadding }}>
      <View style={{ width: itemWidth, paddingRight: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 20,
            width: '100%',
            height: 160,
          }}
          activeOpacity={0.8}
          onPress={onAddNewPostPress}
        >
          <View
            style={{
              height: 85,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.3,
              borderBottomColor: 'rgb(100,100,100)',
            }}
          >
            <ExpoImage
              style={{
                width: 55,
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
            {(currentSpace?.contentType === 'video' || currentSpace?.contentType === 'photoAndVideo') && (
              <View style={{ position: 'absolute', bottom: 15, right: 30, backgroundColor: 'white', borderRadius: 20 }}>
                <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold', padding: 3 }}>
                  {formatTimeStringForShort(currentSpace?.videoLength)}
                </Text>
              </View>
            )}
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>New Post</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>{renderContentType()}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ width: itemWidth, paddingLeft: 8 }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgb(50,50,50)',
            borderRadius: 20,
            width: '100%',
            height: 160,
          }}
          activeOpacity={0.8}
          onPress={onAddNewMomentPress}
        >
          <View
            style={{
              height: 85,
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.3,
              borderBottomColor: 'rgb(100,100,100)',
            }}
          >
            <ExpoImage
              style={{
                width: 45,
                aspectRatio: 1,
              }}
              source={require('../../../assets/forApp/ghost.png')}
              contentFit='cover'
              tintColor={'white'}
            />
            <View style={{ position: 'absolute', bottom: 15, right: 5, backgroundColor: 'white', borderRadius: 20 }}>
              <Text style={{ color: 'black', fontSize: 12, fontWeight: 'bold', padding: 3 }}>
                {convertMinutesToHoursAndMinutesForShort(currentSpace?.disappearAfter)}
              </Text>
            </View>
          </View>
          <View style={{ padding: 10 }}>
            <Text style={{ color: 'white', fontSize: 15, marginBottom: 5, fontWeight: 'bold' }}>New Moment</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
              Every post will disappear within {convertMinutesToHoursAndMinutes(currentSpace?.disappearAfter)}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
