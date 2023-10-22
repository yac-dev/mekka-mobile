import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SpaceDetailContext } from '../../contexts/SpaceDetailContext';

const Stats = () => {
  const { space, navigation } = useContext(SpaceDetailContext);

  return (
    <View style={{ paddingLeft: 10, paddingRight: 10, flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <TouchableOpacity style={{ width: '33%', paddingRight: 3 }} onPress={() => console.log('to tags')}>
        <View
          style={{
            padding: 10,
            alignItems: 'center',
            borderRadius: 8,
            width: '100%',
            backgroundColor: 'rgb(70,70,70)',
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>Posts</Text>
          <Text style={{ color: 'rgb(170, 170, 170)', fontSize: 17 }}>{space.totalPosts}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ width: '33%', paddingRight: 3, paddingLeft: 3 }}
        onPress={() => navigation.navigate('Members')}
      >
        <View
          style={{
            padding: 10,
            alignItems: 'center',
            backgroundColor: 'rgb(70,70,70)',
            width: '100%',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>Members</Text>
          <Text style={{ color: 'rgb(170, 170, 170)', fontSize: 17 }}>{space.totalMembers}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={{ width: '33%', paddingLeft: 3 }} onPress={() => console.log('to tags')}>
        <View
          style={{
            padding: 10,
            alignItems: 'center',
            backgroundColor: 'rgb(70,70,70)',
            width: '100%',
            borderRadius: 8,
          }}
        >
          <Text style={{ color: 'white', fontSize: 20, marginBottom: 10 }}>Used tags</Text>
          <Text style={{ color: 'rgb(170, 170, 170)', fontSize: 17 }}>{space.rate}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Stats;
