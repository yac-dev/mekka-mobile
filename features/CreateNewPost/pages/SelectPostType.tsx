import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { CreateNewPostContext } from '../contexts';
import { CurrentSpaceContext } from '../../../providers';
import { useNavigation } from '@react-navigation/native';
import { CreateNewPostStackProps } from '../navigations/CreateNewPostStackNavigator';

const SelectPostType = () => {
  const createNewPostStackNavigation = useNavigation<CreateNewPostStackProps>();
  const { onPostTypeChange, formData } = useContext(CreateNewPostContext);
  const { currentSpace } = useContext(CurrentSpaceContext);

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
          Post {currentSpace.name}
        </Text>
      </View>
      <View style={{}}>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          onPress={() => {
            onPostTypeChange('normal');
            createNewPostStackNavigation.navigate('NormalPost');
          }}
          activeOpacity={1}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons name='images' color='white' size={20} style={{ marginRight: 20 }} />
            <View>
              <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Regular</Text>
              <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Share your photos/videos with your peers.</Text>
            </View>
          </View>
          <MaterialCommunityIcons name='chevron-right' color='white' size={20} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          activeOpacity={1}
          onPress={() => {
            onPostTypeChange('moment');
            createNewPostStackNavigation.navigate('NormalPost');
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
    </View>
  );
};

export default SelectPostType;
