import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Ionicons } from '@expo/vector-icons';

const SelectPostType = (props) => {
  const { navigation, setPostType } = useContext(CreateNewPostContext);

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerRight: () => null,
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={() => navigation.goBack()}>
  //         <Ionicons name='close-circle-sharp' size={30} color={'white'} />
  //       </TouchableOpacity>
  //     ),
  //   });
  // });

  return (
    <View style={{ backgroundColor: 'black', flex: 1 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Create new Post
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Post your photo/video and share your moments with your peers.
        </Text>
      </View>
      <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 40 }}>
        <TouchableOpacity
          style={{
            padding: 20,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 60,
            marginRight: 20,
            width: 120,
            height: 120,
          }}
          onPress={() => {
            setPostType('normalPost');
            navigation?.navigate('NormalPost');
          }}
        >
          <Ionicons name='images' color='black' size={25} style={{ marginBottom: 5 }} />
          <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
            Normal{'\n'}post
          </Text>
        </TouchableOpacity>
        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 23, marginRight: 20 }}>Or</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'white',
            borderRadius: 60,
            width: 120,
            height: 120,
          }}
          onPress={() => {
            setPostType('moment');
            navigation?.navigate('MomentPost');
          }}
        >
          {/* <View style={{ flexDirection: 'row', alignItems: 'center' }}></View>
          <MaterialCommunityIcons name='chevron-right' color='black' size={25} /> */}
          <FastImage
            source={require('../../../assets/forApp/ghost.png')}
            tintColor={'black'}
            style={{ width: 25, height: 25, marginBottom: 5 }}
          />
          <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
            Moment{'\n'}post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectPostType;
