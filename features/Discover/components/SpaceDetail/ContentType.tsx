import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SpaceDetailContext } from '../../contexts/SpaceDetailContext';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ContentType = () => {
  const { space } = useContext(SpaceDetailContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const renderContentTypeDescription = (space) => {
    if (space.contentType === 'photo') {
      return <Text style={{ color: 'white', marginTop: 20 }}>You can only share photos in this space.</Text>;
    } else if (space.contentType === 'video') {
      return (
        <Text style={{ color: 'white', marginTop: 20 }}>You can only share (videoLength) videos in this space.</Text>
      );
    } else {
      return (
        <Text style={{ color: 'white', marginTop: 20 }}>
          You can share photos and (videoLength) videos in this space.
        </Text>
      );
    }
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
              backgroundColor: 'rgba(229, 188, 0, 0.3)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
              borderRadius: 10,
            }}
          >
            <MaterialIcons name='video-library' color='rgba(216, 179, 8, 0.85)' size={25} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Content</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'rgb(170, 170, 170)', marginRight: 10 }}>{space.contentType}</Text>
          <MaterialCommunityIcons name='chevron-down' color='white' size={25} />
        </View>
      </TouchableOpacity>
      {isAccordionOpen ? renderContentTypeDescription(space) : null}
    </View>
  );
};

export default ContentType;
