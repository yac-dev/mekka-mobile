import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SpaceDetailContext } from '../contexts/SpaceDetailContext';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const About = () => {
  const { space } = useContext(SpaceDetailContext);
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
    setLengthMore(e.nativeEvent.lines.length >= 3); //to check the text is more than 4 lines or not
    // console.log(e.nativeEvent);
  }, []);

  const renderReactionIcons = () => {
    const list = space.reactions.slice(0, 2).map((reaction, index) => {
      if (reaction.type === 'emoji') {
        return (
          <Text key={index} style={{ fontSize: 30, marginRight: 5 }}>
            {reaction.emoji}
          </Text>
        );
      } else if (reaction.type === 'sticker') {
        return (
          <ExpoImage
            key={index}
            style={{ width: 30, height: 30, marginRight: 5 }}
            source={{ uri: reaction.sticker.url }}
            placeholder={blurhash}
            contentFit='cover'
            transition={1000}
          />
        );
      }
    });

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {list}
        {space.reactions.length > 2 ? <Text style={{ color: 'rgb(170, 170, 170)' }}>...</Text> : null}
      </View>
    );
  };

  const renderReactions = (space) => {
    const list = space.reactions.map((reaction, index) => {
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
              contentFit='cover'
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
    <View style={{ flex: 1, backgroundColor: 'rgb(40, 40, 40)', padding: 10 }}>
      <ScrollView>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ExpoImage
              style={{ width: 30, height: 30, borderRadius: 20, marginRight: 10 }}
              source={{ uri: space.createdBy.avatar }}
              contentFit='cover'
            />
            <Text style={{ color: 'white', fontWeight: 'bold' }}>{space.createdBy.name}</Text>
          </View>
          {renderDate(space.createdAt)}
        </View>
        <Text
          onTextLayout={onTextLayout}
          numberOfLines={textShown ? undefined : 3}
          style={{ color: 'white', lineHeight: 22, padding: 5, marginBottom: 15 }}
        >
          {space.description}
        </Text>
        {lengthMore ? (
          <Text
            onPress={toggleNumberOfLines}
            style={{ marginTop: 10, color: 'rgb(170,170,170)', alignSelf: 'flex-end' }}
          >
            {textShown ? 'Read less' : 'Read more'}
          </Text>
        ) : null}
        <View>
          <Text style={{ fontSize: 25, fontWeight: 'bold', marginBottom: 20, color: 'white' }}>Space feature</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <MaterialIcons name='photo-library' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>{`Media type: ${
              space.contentType === 'photo' ? 'Photos' : space.contentType === 'video' ? 'Videos' : 'Photos and Videos'
            }`}</Text>
          </View>
          {space.videoLength ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
              <Ionicons name='play-circle-sharp' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
              <Text style={{ color: 'white' }}>{`Video length limit: ${space.videoLength} seconds`}</Text>
            </View>
          ) : null}

          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Fontisto name='smiley' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            {renderReactions(space)}
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <Foundation name='comments' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>
              {space.isCommentAvailable ? 'Comments: Available' : 'Comments: Turned off'}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <ExpoImage
              style={{ width: 25, height: 25, marginRight: 15 }}
              source={require('../../../assets/forApp/ghost.png')}
              contentFit='cover'
              tintColor={'rgb(130,130,130)'}
            />
            <Text style={{ color: 'white' }}>
              {space.disappearAfter ? `Moments time: ${space.disappearAfter} minutes` : null}
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default About;
