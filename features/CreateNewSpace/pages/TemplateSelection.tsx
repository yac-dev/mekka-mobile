import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import * as ImagePicker from 'expo-image-picker';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';
import {
  initialFormData,
  photoLoversFormData,
  noCommentNoReactionFormData,
  busySpaceFormData,
  vanillaFormData,
} from '../contexts/CreateNewSpaceProvider';

export const TemplateSelection = () => {
  const createNewSpaceStackNavigation = useNavigation<CreateNewSpaceStackProps>();
  const { setFormData, formData } = useContext(CreateNewSpaceContext);

  // console.log('reaction', formData.reactions.value);

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <ScrollView>
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
              Create New Space
            </Text>
            <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
              The space is where you and your friends get together and share photos/videos. {'\n'}Design yours and start
              sharing.
            </Text>
          </View>
        </View>
        <View>
          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => {
              setFormData(initialFormData);
              createNewSpaceStackNavigation.navigate('Base');
            }}
            activeOpacity={0.5}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.MCI name='file-edit' size={20} color='white' style={{ marginRight: 20 }} />
              <View style={{ width: 250 }}>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Create from Scratch</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  Design your space based on your preference.
                </Text>
              </View>
            </View>
            <VectorIcon.MCI name='chevron-right' size={20} color='white' />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingVertical: 20 }}>
          <View style={{ height: 0.5, width: 80, backgroundColor: 'rgb(170,170,170)' }}></View>
          <Text style={{ color: 'rgb(170,170,170)', fontSize: 17, paddingHorizontal: 12 }}>
            Or start from a template
          </Text>
          <View style={{ height: 0.5, width: 80, backgroundColor: 'rgb(170,170,170)' }}></View>
        </View>

        <View>
          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => {
              setFormData(vanillaFormData);
              createNewSpaceStackNavigation.navigate('Base');
            }}
            activeOpacity={0.5}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.II name='ice-cream' size={20} color='white' style={{ marginRight: 20 }} />
              <View style={{ width: 250 }}>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Vanilla Space</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  Traditional space with like, comment and 24 hours disappearing posts features.
                </Text>
              </View>
            </View>
            <VectorIcon.MCI name='chevron-right' size={20} color='white' />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => {
              setFormData(photoLoversFormData);
              createNewSpaceStackNavigation.navigate('Base');
            }}
            activeOpacity={0.5}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.II name='camera' size={20} color='white' style={{ marginRight: 20 }} />
              <View style={{ width: 250 }}>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Photo Lovers Space</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>No video posts. Just photos.</Text>
              </View>
            </View>
            <VectorIcon.MCI name='chevron-right' size={20} color='white' />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => {
              setFormData(noCommentNoReactionFormData);
              createNewSpaceStackNavigation.navigate('Base');
            }}
            activeOpacity={0.5}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.II name='heart-dislike' size={20} color='white' style={{ marginRight: 20 }} />
              <View style={{ width: 250 }}>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>No Pressure Space</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  No comments, no likes. No more worrying about reactions from others.
                </Text>
              </View>
            </View>
            <VectorIcon.MCI name='chevron-right' size={20} color='white' />
          </TouchableOpacity>

          <TouchableOpacity
            style={{ padding: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
            onPress={() => {
              setFormData(busySpaceFormData);
              createNewSpaceStackNavigation.navigate('Base');
            }}
            activeOpacity={0.5}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <VectorIcon.MCI name='clock-fast' size={20} color='white' style={{ marginRight: 20 }} />
              <View style={{ width: 250 }}>
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Busy Space</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  5 seconds video, moments will be dissapeared　 after 30 minutes.
                </Text>
              </View>
            </View>
            <VectorIcon.MCI name='chevron-right' size={20} color='white' />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
