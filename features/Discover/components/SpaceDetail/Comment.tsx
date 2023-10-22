import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SpaceDetailContext } from '../../contexts/SpaceDetailContext';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Comment = () => {
  const { space } = useContext(SpaceDetailContext);
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
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
              backgroundColor: 'rgba(45, 209, 40, 0.3)',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 15,
              borderRadius: 10,
            }}
          >
            <MaterialIcons name='description' color='rgba(45, 209, 40, 0.85)' size={25} />
          </View>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>Description</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {/* <View style={{ width: 200 }}>
            <Text>{space.description}</Text>
          </View> */}
          <MaterialCommunityIcons name='chevron-down' color='white' size={25} />
        </View>
      </TouchableOpacity>
      {isAccordionOpen ? <Text style={{ color: 'white', marginTop: 20 }}>{space.description}</Text> : null}
    </View>
  );
};

export default Comment;
