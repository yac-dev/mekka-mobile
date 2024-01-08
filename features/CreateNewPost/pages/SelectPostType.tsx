import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewPostContext } from '../contexts/CreateNewPostContext';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { SpaceRootContext } from '../../Space/contexts/SpaceRootContext';

const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

const SelectPostType = (props) => {
  const { navigation, setPostType, space } = useContext(CreateNewPostContext);
  const { setCreateNewPostFormData } = useContext(SpaceRootContext);

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
          Post {space.name}
        </Text>
        {/* <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Share your photos/videos with your peers from here.
        </Text> */}
      </View>
      <View style={{}}>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => {
            setCreateNewPostFormData((previous) => {
              return {
                ...previous,
                postType: 'normal',
              };
            });
            navigation?.navigate('NormalPost');
          }}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='images' color='white' size={20} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Normal</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Share your photos/videos with your peers.</Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          activeOpacity={1}
          onPress={() => {
            // setPostType('moment');
            // navigation?.navigate('MomentPost');
            setCreateNewPostFormData((previous) => {
              return {
                ...previous,
                postType: 'moment',
              };
            });
            navigation?.navigate('NormalPost');
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', width: 250 }}>
            <ExpoImage
              style={{ width: 20, height: 20, marginRight: 20 }}
              source={require('../../../assets/forApp/ghost.png')}
              contentFit='cover'
              tintColor={'white'}
            />
            <View>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Moment</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                Similar to IG Stories, where your photos/videos will disappear after a certain time instead of the
                24-hour limit.
              </Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>
      {/* <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center', alignSelf: 'center', marginTop: 40 }}>
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
            setCreateNewPostFormData((previous) => {
              return {
                ...previous,
                postType: 'normal',
              };
            });
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
            // setPostType('moment');
            // navigation?.navigate('MomentPost');
            setCreateNewPostFormData((previous) => {
              return {
                ...previous,
                postType: 'moment',
              };
            });
            navigation?.navigate('NormalPost');
          }}
        >
          <ExpoImage
            style={{ width: 25, height: 25, marginBottom: 5 }}
            source={require('../../../assets/forApp/ghost.png')}
            contentFit='cover'
            tintColor={'black'}
          />
          <Text style={{ color: 'black', fontSize: 17, fontWeight: 'bold', textAlign: 'center' }}>
            Moment{'\n'}post
          </Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default SelectPostType;
