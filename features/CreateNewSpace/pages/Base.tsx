import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import * as ImagePicker from 'expo-image-picker';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';
import { VectorIcon } from '../../../Icons';

const menus = ['Space Visibility', 'Content Type', 'Moment', 'Reaction', 'Comment', 'Description'];

export const Base = () => {
  const createNewSpaceNavigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onNameChange, onIconChange, flashMessageRef } = useContext(CreateNewSpaceContext);

  useEffect(() => {
    createNewSpaceNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => createNewSpaceNavigation.navigate('SelectSpaceVisibility')}
          disabled={!formData.name.isValidated || !formData.icon.isValidated}
        >
          <Text
            style={{
              color: !formData.name.isValidated || !formData.icon.isValidated ? 'rgb(100,100,100)' : 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Create
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
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <ScrollView>
        {/* これviewで囲わないとばぐるんだけど。。。なぜ？？ Viewで囲わないと縦方向にjustifuContent:"space-between"みたいな形になる。。。*/}
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'rgb(50,50,50)',
            justifyContent: 'center',
            alignItems: 'center',
            width: 100,
            height: 100,
            padding: 2,
            borderRadius: 100 / 2,
            marginBottom: 20,
          }}
          onPress={() => onIconChange()}
        >
          {formData.icon.value ? (
            <ExpoImage
              style={{ width: 100, height: 100, borderRadius: 100 / 2, alignSelf: 'center' }}
              source={{ uri: formData.icon.value }}
              contentFit='cover'
            />
          ) : (
            <>
              <MaterialCommunityIcons name='camera-plus' size={30} color='white' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, textAlign: 'center' }}>Space icon</Text>
            </>
          )}
        </TouchableOpacity>
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
            placeholder='Space name'
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
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('SelectSpaceVisibility')}
          icon={<VectorIcon.MI name='public' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Visibility'
          value={formData.isPublic.value !== undefined ? (formData.isPublic.value ? 'Public' : 'Private') : ''}
        />
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('ContentType')}
          icon={<VectorIcon.II name='image' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Content'
          value={
            formData.contentType.value !== undefined
              ? formData.contentType.value === 'photo'
                ? 'Only Photo'
                : formData.contentType.value === 'video'
                ? 'Only Video'
                : 'Photo & Video'
              : ''
          }
        />
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('Moment')}
          icon={
            <ExpoImage
              source={require('../../../assets/forApp/ghost.png')}
              style={{ marginRight: 10, width: 20, height: 20 }}
              tintColor='white'
            />
          }
          title='Moment'
          value={String(formData.disappearAfter.value)}
        />
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('Reaction')}
          icon={<VectorIcon.II name='thumbs-up-sharp' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Reaction'
          value='Image'
        />
        {/* <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('Comment')}
          icon={<VectorIcon.FD name='comments' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Comment'
          value='Image'
        /> */}
        <MenuCell
          onCellPress={() => createNewSpaceNavigation.navigate('Description')}
          icon={<VectorIcon.MI name='public' size={20} color='white' style={{ marginRight: 10 }} />}
          title='Description'
          value={formData.description.value}
        />
      </ScrollView>
    </View>
  );
};

type MenuCellProp = {
  onCellPress: () => void;
  icon: React.ReactNode;
  title: string;
  value: string;
};

const MenuCell: React.FC<MenuCellProp> = ({ onCellPress, icon, title, value }) => {
  return (
    <TouchableOpacity
      style={{
        paddingVertical: 15,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
      }}
      onPress={onCellPress}
      // baseに行きながらも、全てからでの状態でいく感じか。
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {icon}
        <Text style={{ color: 'white', fontSize: 17 }}>{title}</Text>
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 15, color: 'rgb(170,170,170)', marginRight: 5 }}> {value}</Text>
        <VectorIcon.MCI name='chevron-right' size={20} color='white' />
      </View>
    </TouchableOpacity>
  );
};
