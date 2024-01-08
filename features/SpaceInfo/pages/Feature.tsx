import React, { useContext, useState, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
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
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>{list}</View>
      </View>
    );
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

  // <TouchableOpacity
  //               style={{
  //                 padding: 15,
  //                 flexDirection: 'row',
  //                 alignItems: 'center',
  //                 justifyContent: 'space-between',
  //                 marginBottom: 15,
  //               }}
  //               onPress={() => pickContents()}
  //               activeOpacity={1}
  //             >
  //               <View style={{ flexDirection: 'row', alignItems: 'center' }}>
  //                 <Ionicons name='add-circle-sharp' size={25} color='white' style={{ marginRight: 20 }} />
  //                 <View>
  //                   <Text style={{ color: 'white', fontSize: 17 }}>Add</Text>
  //                 </View>
  //               </View>
  //               <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
  //             </TouchableOpacity>

  return (
    <View style={{ flex: 1, backgroundColor: 'rgb(30, 30, 30)', paddingTop: 10 }}>
      <ScrollView>
        <View>
          {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <MaterialIcons name='photo-library' size={25} color='rgb(130,130,130)' style={{ marginRight: 15 }} />
            <Text style={{ color: 'white' }}>{`Media type:  ${
              spaceAndUserRelationship.space.contentType === 'photo'
                ? 'Photos'
                : spaceAndUserRelationship.space.contentType === 'video'
                ? 'Videos'
                : 'Photos and Videos'
            }`}</Text>
          </View> */}

          <View
            style={{
              padding: 15,
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
                  {spaceAndUserRelationship.space.contentType === 'photo'
                    ? 'Photos'
                    : spaceAndUserRelationship.space.contentType === 'video'
                    ? 'Videos'
                    : 'Photos and Videos'}
                </Text>
              </View>
            </View>
          </View>
          {spaceAndUserRelationship.space.videoLength ? (
            <View
              style={{
                padding: 15,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Ionicons name='play-circle-sharp' size={25} color='white' style={{ marginRight: 20 }} />
                <View>
                  <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Video length</Text>
                  <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                    {spaceAndUserRelationship.space.videoLength} seconds
                  </Text>
                </View>
              </View>
            </View>
          ) : null}

          <View
            style={{
              padding: 15,
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
                {renderReactions(spaceAndUserRelationship.space)}
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 15,
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
                  {spaceAndUserRelationship.space.isCommentAvailable ? 'Available' : 'Turned off'}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              padding: 15,
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
                  {convertMinutesToHoursAndMinutes(spaceAndUserRelationship.space.disappearAfter)}
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
