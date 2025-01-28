import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import * as ImagePicker from 'expo-image-picker';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../navigations/CreateNewSpaceStackNavigator';
import {
  initialFormData,
  photoLoversFormData,
  noCommentNoReactionFormData,
  busySpaceFormData,
  vanillaFormData,
} from '../contexts/CreateNewSpaceProvider';

export const TemplateSelection = () => {
  const createNewSpaceStackNavigation = useNavigation<CreateNewSpaceStackProps>();
  const { setFormData, formData, onIconChange, onNameChange } = useContext(CreateNewSpaceContext);
  const createNewSpaceNavigation = useNavigation<CreateNewSpaceStackProps>();

  // console.log('reaction', formData.reactions.value);

  useEffect(() => {
    createNewSpaceNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => createNewSpaceStackNavigation.navigate('SpaceVisibilitySelection')}
          disabled={!formData.name.isValidated || !formData.icon.isValidated}
        >
          <Text
            style={{
              color: !formData.name.isValidated || !formData.icon.isValidated ? 'rgb(100,100,100)' : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Next
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  const renderText = () => {
    return (
      <Text style={{ color: formData.name.value.length <= 40 ? 'rgb(170,170,170)' : 'red' }}>
        {formData.name.value.length}
      </Text>
    );
  };

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
          <View>
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
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)', marginBottom: 30 }}>
            First of all, please set the space icon and name.
          </Text>
        </View>
        {/* <View>
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
        </View> */}
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            alignSelf: 'center',
            backgroundColor: 'rgb(50,50,50)',
            justifyContent: 'center',
            alignItems: 'center',
            width: 110,
            height: 110,
            padding: 2,
            borderRadius: 110 / 2,
            marginBottom: 20,
          }}
          onPress={() => onIconChange()}
        >
          {formData.icon.value ? (
            <ExpoImage
              style={{ width: 110, height: 110, borderRadius: 110 / 2, alignSelf: 'center' }}
              source={{ uri: formData.icon.value }}
              contentFit='cover'
            />
          ) : (
            <View>
              <VectorIcon.II name='image' size={35} color='white' style={{ marginBottom: 5 }} />
              <Text style={{ color: 'white', fontSize: 17, textAlign: 'center' }}>Icon</Text>
            </View>
          )}
          <View
            style={{
              backgroundColor: 'black',
              width: 38,
              height: 38,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}
          >
            <View
              style={{
                backgroundColor: 'white',
                justifyContent: 'center',
                alignItems: 'center',
                width: 28,
                height: 28,
                borderRadius: 20,
              }}
            >
              <VectorIcon.II name='add' size={20} color={'black'} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ paddingHorizontal: 15 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 30,
              borderBottomWidth: 0.3,
              borderBottomColor: 'rgb(88, 88, 88)',
            }}
          >
            <TextInput
              style={{
                fontSize: 18,
                color: 'white',
                flex: 1,
                padding: 10,
              }}
              placeholder='Name'
              placeholderTextColor={'rgb(170,170,170)'}
              autoCapitalize='none'
              value={formData.name.value}
              onChangeText={(text) => onNameChange(text)}
            />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {renderText()}
              <Text style={{ marginRight: 10, color: 'rgb(170,170,170)' }}>/40</Text>
            </View>
          </View>
        </View>

        {/* <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center', paddingVertical: 20 }}>
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
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Vanilla</Text>
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
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Photo Lovers</Text>
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
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>No Pressure</Text>
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
                <Text style={{ color: 'white', fontSize: 17, marginBottom: 5 }}>Busy</Text>
                <Text style={{ color: 'rgb(170,170,170)', fontSize: 13 }}>
                  5 seconds video, moments will be dissapeared after 30 minutes.
                </Text>
              </View>
            </View>
            <VectorIcon.MCI name='chevron-right' size={20} color='white' />
          </TouchableOpacity>
        </View> */}
      </ScrollView>
    </View>
  );
};
