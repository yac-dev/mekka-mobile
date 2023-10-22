import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SpaceDetailContext } from '../../contexts/SpaceDetailContext';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import FastImage from 'react-native-fast-image';

const Reactions = () => {
  const { space } = useContext(SpaceDetailContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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
          <FastImage
            key={index}
            source={{ uri: reaction.sticker.url }}
            style={{ width: 30, height: 30, marginRight: 5 }}
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
            <Text key={index} style={{ fontSize: 30 }}>
              {reaction.emoji}
            </Text>
          );
        } else if (reaction.type === 'sticker') {
          return <FastImage key={index} source={{ uri: reaction.sticker.url }} style={{ width: 30, height: 30 }} />;
        }
      } else {
        return null;
      }
    });

    return (
      <View>
        <Text style={{ color: 'white' }}>You have these options to upvote each post. </Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>{list}</View>
        </ScrollView>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: 'rgb(70,70,70)',
        borderRadius: 7,
        flexDirection: 'column',
        padding: 10,
        marginBottom: 5,
      }}
    >
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
        onPress={() => setIsAccordionOpen((previous) => !previous)}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 40,
              height: 40,
              backgroundColor: 'rgba(240, 103, 165, 0.3)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
              borderRadius: 10,
            }}
          >
            <MaterialCommunityIcons name='cards-heart' color='rgba(240, 103, 165, 0.85)' size={25} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Reactions</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {renderReactionIcons()}
          <MaterialCommunityIcons name='chevron-down' color='white' size={25} />
        </View>
      </TouchableOpacity>
      {isAccordionOpen ? renderReactions(space) : null}
    </View>
  );
};

export default Reactions;
