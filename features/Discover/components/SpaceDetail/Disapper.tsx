import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SpaceDetailContext } from '../../contexts/SpaceDetailContext';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Disapper = () => {
  const { space } = useContext(SpaceDetailContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  const renderDescription = (space) => {
    if (space.disappearAfter) {
      return (
        <View style={{ marginTop: 20 }}>
          <Text style={{ color: 'white' }}>Each post will be removed after 24 hours of post.</Text>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={{ color: 'white' }}>
            Each post will remain permananetly unless each user delete their own post.
          </Text>
        </View>
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
              backgroundColor: 'rgba(0, 108, 255, 0.3)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
              borderRadius: 10,
            }}
          >
            <MaterialCommunityIcons name='ghost' color='rgba(0, 108, 255, 0.85)' size={25} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Disapper</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'rgb(170,170,170)', marginRight: 10 }}>
            {space.disappearAfter ? `${space.disappearAfter} hours` : 'permanent'}
          </Text>
          <MaterialCommunityIcons name='chevron-down' color='white' size={25} />
        </View>
      </TouchableOpacity>
      {isAccordionOpen ? renderDescription(space) : null}
    </View>
  );
};

export default Disapper;
