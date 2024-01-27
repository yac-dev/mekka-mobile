import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { AppTextInput } from '../../../components';
import { useEditAccount, useUpdateUser } from '../hooks';

const EditAccount = () => {
  const {
    formData,
    isPasswordVisible,
    onAvatarPress,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onPasswordVisibilityChange,
  } = useEditAccount();
  const { apiResult, requestApi } = useUpdateUser();

  // useEffect(() => {
  //   if (editingName.length && editingEmail.length && editingPassword.length) {
  //     if (editingPassword.length >= 10) {
  //       setIsValidated(true);
  //     } else {
  //       setIsValidated(false);
  //     }
  //   } else {
  //     setIsValidated(false);
  //   }
  // }, [editingName, editingEmail, editingPassword]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <ScrollView>
        <TouchableOpacity
          onPress={() => onAvatarPress()}
          style={{ width: 70, height: 70, alignSelf: 'center', marginBottom: 30 }}
        >
          <ExpoImage style={{ width: '100%', height: '100%' }} source={{ uri: formData.avatar }} contentFit='cover' />
        </TouchableOpacity>
        <View>
          <AppTextInput.BorderStyle
            value={formData.name}
            placeholder='Name here...'
            labelIcon={<VectorIcon.MCI name='account' color='white' size={20} />}
            onTextChange={onNameChange}
            keyboardType={'default'}
          />
          <AppTextInput.BorderStyle
            value={formData.email}
            placeholder='Email here...'
            labelIcon={<VectorIcon.MCI name='email' color='white' size={20} />}
            onTextChange={onEmailChange}
            keyboardType={'default'}
          />
          <AppTextInput.BorderStyle
            value={formData.password}
            placeholder='Password here...'
            labelIcon={<VectorIcon.II name='eye' color='white' size={20} />}
            onTextChange={onPasswordChange}
            keyboardType={'default'}
            secureTextEntry
            isTextEntryVisible={isPasswordVisible}
            onTextEntryVisibilityChange={onPasswordVisibilityChange}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default EditAccount;
