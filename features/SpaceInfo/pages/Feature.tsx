import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { ReactionType, SpaceType } from '../../../types';
import { CurrentSpaceContext } from '../../../providers';

type FeatureProps = {};

const Feature: React.FC<FeatureProps> = () => {
  const { currentSpace } = useContext(CurrentSpaceContext);
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
    <View style={{ flex: 1, backgroundColor: 'rgb(30, 30, 30)', paddingTop: 10 }}>
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
                {textShown ? 'Read less...' : 'Read more...'}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name='images' size={25} color='white' style={{ marginRight: 20 }} />
              <View>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Media type</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  {currentSpace.contentType === 'photo'
                    ? 'Photos'
                    : currentSpace.contentType === 'video'
                    ? 'Videos'
                    : 'Photos and Videos'}
                </Text>
              </View>
            </View>
          </View>
          {currentSpace.videoLength ? (
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='play-circle-sharp' size={25} color='white' style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Video length</Text>
                  <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>{currentSpace.videoLength} seconds</Text>
                </View>
              </View>
            </View>
          ) : null}

          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialCommunityIcons name='thumb-up' size={25} color='white' style={{ marginRight: 20 }} />
              <View>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Reactions</Text>
                {/* <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                    {spaceAndUserRelationship.space.videoLength} seconds
                  </Text> */}
                {renderReactions(currentSpace)}
              </View>
            </View>
          </View>

          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Foundation name='comments' size={25} color='white' style={{ marginRight: 20 }} />
              <View>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Comment</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  {currentSpace.isCommentAvailable ? 'Available' : 'Turned off'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              paddingVertical: 10,
              paddingHorizontal: 15,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <ExpoImage
                style={{ width: 25, height: 25, marginRight: 15 }}
                source={require('../../../assets/forApp/ghost.png')}
                contentFit='contain'
                tintColor={'white'}
              />
              <View>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Moment</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Feature;
