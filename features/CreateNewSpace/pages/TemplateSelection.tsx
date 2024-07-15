import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import * as ImagePicker from 'expo-image-picker';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';

export const TemplateSelection = () => {
  const createNewSpaceStackNavigation = useNavigation<CreateNewSpaceStackProps>();

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View
        style={{
          paddingLeft: 30,
          paddingRight: 30,
          paddingTop: 20,
          paddingBottom: 30,
        }}
      >
        <View style={{ marginBottom: 40 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Create new Space
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            The space is where you and your friends get together and share photos/videos. {'\n'}Design yours and start
            sharing.
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        onPress={() => createNewSpaceStackNavigation.navigate('Base')}
        // baseに行きながらも、全てからでの状態でいく感じか。
        activeOpacity={0.5}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <VectorIcon.MCI name='file-edit' size={20} color='white' style={{ marginRight: 20 }} />
          <View style={{ width: 250 }}>
            <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Create from Scratch</Text>
            <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>Design your space based on your preference.</Text>
          </View>
        </View>
        <VectorIcon.MCI name='chevron-right' size={20} color='white' />
      </TouchableOpacity>
    </View>
  );
};
