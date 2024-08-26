import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Image as ExpoImage } from 'expo-image';
import { ReactionType, SpaceType } from '../../../types';
import { CurrentSpaceContext } from '../../../providers';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';

type FeatureProps = {};

export const Feature: React.FC<FeatureProps> = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);
  const [textShown, setTextShown] = useState<boolean>(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 2);
    // console.log(e.nativeEvent);
  }, []);
  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  const renderReactions = (space: SpaceType) => {
    if (space.isReactionAvailable) {
      const list = space.reactions.map((reaction: ReactionType, index: number) => {
        if (reaction) {
          if (reaction.type === 'emoji') {
            return (
              <Text key={index} style={{ fontSize: 25, marginRight: 5 }}>
                {reaction.emoji}
              </Text>
            );
          } else if (reaction.type === 'sticker') {
            return (
              <ExpoImage
                key={index}
                style={{ width: 25, height: 25, marginRight: 5 }}
                source={{ uri: reaction.sticker.url }}
                contentFit='contain'
              />
            );
          }
        } else {
          return null;
        }
      });

      return (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>{list}</View>
        </View>
      );
    } else {
      return <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Turned off</Text>;
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
              {currentSpace.description}
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
            subTitle={currentSpace.isPublic ? 'Public' : 'Private'}
            onButtonPress={() => console.log('hey')}
            customStyle={{ marginBottom: 10 }}
          >
            <VectorIcon.MI name='public' size={20} color='white' style={{ marginRight: 20 }} />
          </AppButton.Cell>
          <AppButton.Cell
            title='Media Type'
            subTitle={
              currentSpace.contentType === 'photo'
                ? 'Photos'
                : currentSpace.contentType === 'video'
                ? 'Videos'
                : 'Photos and Videos'
            }
            onButtonPress={() => console.log('hey')}
            customStyle={{ marginBottom: 10 }}
          >
            <VectorIcon.II name='images' size={20} color='white' style={{ marginRight: 20 }} />
          </AppButton.Cell>
          {currentSpace.videoLength ? (
            <AppButton.Cell
              title='Video Length'
              subTitle={`${currentSpace.videoLength} seconds`}
              onButtonPress={() => console.log('hey')}
              customStyle={{ marginBottom: 10 }}
            >
              <VectorIcon.II name='play-circle-sharp' size={20} color='white' style={{ marginRight: 20 }} />
            </AppButton.Cell>
          ) : null}
          <AppButton.Cell
            title='Moments'
            subTitle={convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
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
            subTitle={currentSpace.isCommentAvailable ? 'Available' : 'Turned off'}
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

// <View
//             style={{
//               paddingVertical: 10,
//               paddingHorizontal: 15,
//               flexDirection: 'row',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//             }}
//           >
//             <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//               <MaterialCommunityIcons name='thumb-up' size={25} color='white' style={{ marginRight: 20 }} />
//               <View>
//                 <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Reactions</Text>
//                 {renderReactions(currentSpace)}
//               </View>
//             </View>
//           </View>

export default Feature;
