import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { SpaceInfoContext } from '../contexts/SpaceInfoContext';

const Feature = () => {
  const { currentSpace } = useContext(GlobalContext);
  const { spaceAndUserRelationship } = useContext(SpaceInfoContext);
  const [textShown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const renderDate = (date) => {
    const d = new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
    return <Text style={{ fontWeight: 'bold', fontSize: 12, color: 'rgb(170, 170, 170)' }}>{d}</Text>;
  };

  const toggleNumberOfLines = () => {
    setTextShown(!textShown);
  };

  const onTextLayout = useCallback((e) => {
    setLengthMore(e.nativeEvent.lines.length >= 3);
    // console.log(e.nativeEvent);
  }, []);

  const renderReactions = (space) => {
    const list = spaceAndUserRelationship.space.reactions.map((reaction, index) => {
      if (reaction) {
        if (reaction.type === 'emoji') {
          return (
            <Text key={index} style={{ fontSize: 20 }}>
              {reaction.emoji}
            </Text>
          );
        } else if (reaction.type === 'sticker') {
          return <FastImage key={index} source={{ uri: reaction.sticker.url }} style={{ width: 20, height: 20 }} />;
        }
      } else {
        return null;
      }
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: 'white' }}>You'll use </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>{list}</View>
        <Text style={{ color: 'white' }}>to react each post.</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30, 30, 30)', padding: 10 }}>
      <ScrollView>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <MaterialIcons name='photo-library' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>{`You can post ${
              spaceAndUserRelationship.space.contentType === 'photo'
                ? 'only Photos'
                : spaceAndUserRelationship.space.contentType === 'video'
                ? 'Videos'
                : 'Photos and Videos'
            }.`}</Text>
          </View>
          {spaceAndUserRelationship.space.videoLength ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Ionicons name='play-circle-sharp' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
              <Text
                style={{ color: 'white' }}
              >{`You can post at most ${spaceAndUserRelationship.space.videoLength} seconds length videos.`}</Text>
            </View>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Fontisto name='smiley' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            {renderReactions(spaceAndUserRelationship.space)}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Foundation name='comments' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>
              {spaceAndUserRelationship.space.isCommentAvailable
                ? 'Comments are available.'
                : 'Comments are not available.'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <FastImage
              source={require('../../../assets/forApp/ghost.png')}
              style={{ width: 25, height: 25, marginRight: 15 }}
              tintColor={'rgb(130,130,130)'}
            />
            <Text style={{ color: 'white' }}>
              {spaceAndUserRelationship.space.disappearAfter
                ? `Momento will be disappeared after ${spaceAndUserRelationship.space.disappearAfter} minutes`
                : 'Comments are not available.'}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Feature;
