import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const NoSpaces = (props) => {
  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 100, marginBottom: 40 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Let's get started!
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>You haven't joined any spaces now.</Text>
      </View>
      <View>
        {/* <TouchableOpacity
          activeOpacity={1}
          style={{ width: '100%', backgroundColor: 'rgb(60,60,60)', borderRadius: 10, marginBottom: 20, padding: 15 }}
        >
          <Text style={{ textAlign: 'center', color: 'white' }}>Enter private key</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => {
            props.navigation.navigate('SecretKeyForm');
          }}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='key' color='white' size={20} style={{ marginRight: 20 }} />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Enter private space</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                If you already have an invitation code, start from here.
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => {
            props.navigation.navigate('CreateNewSpaceStackNavigator');
          }}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='home' color='white' size={20} style={{ marginRight: 20 }} />
            <View style={{ width: 250 }}>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Create new space</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                If you want to oepn a new sharing space, start from here.
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-down' color='white' size={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NoSpaces;
