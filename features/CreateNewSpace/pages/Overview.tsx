import React, { useCallback, useContext, useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import * as ImagePicker from 'expo-image-picker';
import { Image as ExpoImage } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import { CreateNewSpaceStackProps } from '../../../navigations/CreateNewSpaceStackNavigator';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';

const Overview = () => {
  const navigation = useNavigation<CreateNewSpaceStackProps>();
  const { formData, onNameChange, onIconChange, flashMessageRef } = useContext(CreateNewSpaceContext);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('SelectSpaceVisibility')}
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
  }, [formData.name, formData.icon]);

  const renderText = () => {
    return (
      <Text style={{ color: formData.name.value.length <= 40 ? 'rgb(170,170,170)' : 'red' }}>
        {formData.name.value.length}
      </Text>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={150}
      style={{ flex: 1, backgroundColor: 'black', padding: 10 }}
    >
      <ScrollView>
        {/* これviewで囲わないとばぐるんだけど。。。なぜ？？ Viewで囲わないと縦方向にjustifuContent:"space-between"みたいな形になる。。。*/}
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 30 }}>
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
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            backgroundColor: 'rgb(50,50,50)',
            justifyContent: 'center',
            alignItems: 'center',
            width: 120,
            height: 120,
            padding: 2,
            borderRadius: 120 / 2,
            marginBottom: 20,
            marginTop: 30,
          }}
          onPress={() => onIconChange()}
        >
          {formData.icon.value ? (
            <ExpoImage
              style={{ width: 120, height: 120, borderRadius: 120 / 2, alignSelf: 'center' }}
              source={{ uri: formData.icon.value }}
              contentFit='cover'
            />
          ) : (
            <>
              <MaterialCommunityIcons name='camera-plus' size={30} color='white' style={{ marginBottom: 10 }} />
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>Space icon</Text>
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
      </ScrollView>
      <TouchableOpacity
        style={{ backgroundColor: 'red', width: '100%', height: 100 }}
        onPress={() => flashMessageRef.current.showMessage({ message: 'nice', type: 'success' })}
      ></TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default Overview;
