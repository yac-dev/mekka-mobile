import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { SpaceInfoContext } from '../contexts/SpaceInfoContext';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

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
        <Text style={{ color: 'white' }}>Reaction options: </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>{list}</View>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30, 30, 30)', paddingTop: 10, paddingLeft: 20, paddingRight: 20 }}>
      <ScrollView>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <MaterialIcons name='photo-library' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>{`Media type:  ${
              spaceAndUserRelationship.space.contentType === 'photo'
                ? 'Photos'
                : spaceAndUserRelationship.space.contentType === 'video'
                ? 'Videos'
                : 'Photos and Videos'
            }`}</Text>
          </View>
          {spaceAndUserRelationship.space.videoLength ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Ionicons name='play-circle-sharp' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
              <Text
                style={{ color: 'white' }}
              >{`Video length limit: ${spaceAndUserRelationship.space.videoLength} seconds`}</Text>
            </View>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Fontisto name='smiley' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            {renderReactions(spaceAndUserRelationship.space)}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Foundation name='comments' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>
              {spaceAndUserRelationship.space.isCommentAvailable ? 'Comments: Available' : 'Comments: Turned off'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <ExpoImage
              style={{ width: 25, height: 25, marginRight: 15 }}
              source={require('../../../assets/forApp/ghost.png')}
              contentFit='contain'
              tintColor={'rgb(130,130,130)'}
            />
            <Text style={{ color: 'white' }}>
              {spaceAndUserRelationship.space.disappearAfter
                ? `Moments time: ${spaceAndUserRelationship.space.disappearAfter} minutes`
                : null}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Feature;
