import React from 'react';
import { View, Text } from 'react-native';
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
export const AddNewPostMenu: React.FC<AddNewPostMenuProps> = ({ onAddNewPostPress, onAddNewMomentPress }) => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);

  return (
    <View style={{ flexDirection: 'column' }}>
      <AppButton.Cell
        title={'New Post'}
        subTitle={currentSpace.videoLength ? `${currentSpace.videoLength}s` : ''}
        onButtonPress={onAddNewPostPress}
        customStyle={{ marginBottom: 10 }}
      >
        <ExpoImage
          style={{
            width: 20,
            aspectRatio: 1,
            marginRight: 20,
          }}
          source={
            currentSpace.contentType === 'photo'
              ? require('../../../assets/forApp/photo.png')
              : currentSpace.contentType === 'video'
              ? require('../../../assets/forApp/video.png')
              : require('../../../assets/forApp/photo-video.png')
          }
          contentFit='cover'
          tintColor={'white'}
        />
      </AppButton.Cell>
      <AppButton.Cell
        title='New Moment'
        subTitle={Times.minutesToHoursAndMinutes(currentSpace.disappearAfter)}
        onButtonPress={onAddNewMomentPress}
        customStyle={{ marginBottom: 10 }}
      >
        <ExpoImage
          style={{
            width: 20,
            aspectRatio: 1,
            marginRight: 20,
          }}
          source={require('../../../assets/forApp/ghost.png')}
          contentFit='cover'
          tintColor={'white'}
        />
      </AppButton.Cell>
    </View>
  );
};
