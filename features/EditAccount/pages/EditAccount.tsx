import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { GlobalContext } from '../../../contexts/GlobalContext';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { AppTextInput } from '../../../components';
import { useEditAccount, useUpdateUser } from '../hooks';
import { UpdateUserInputType } from '../types';
import { TextColor } from '../../../themes';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../../../navigations';

export const EditAccount = () => {
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const {
    formData,
    isFormValidated,
    isPasswordVisible,
    onAvatarPress,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onPasswordVisibilityChange,
    validateForm,
  } = useEditAccount();
  const { apiResult, requestApi } = useUpdateUser();

  const onDonePress = () => {
    const input: UpdateUserInputType = {
      name: formData.name.value,
      email: formData.email.value,
      password: formData.password.value,
      avatar: formData.avatar.value,
    };
    requestApi(input);
  };

  useEffect(() => {
    homeStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => onDonePress()} disabled={isFormValidated ? false : true}>
          <Text
            style={{
              color: isFormValidated ? TextColor.primary : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Done
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [isFormValidated]);

  useEffect(() => {
    validateForm();
  }, [formData]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <ScrollView>
        <TouchableOpacity onPress={() => onAvatarPress()} style={styles.avatarContainer}>
          <ExpoImage style={styles.avatar} source={{ uri: formData.avatar.value }} contentFit='cover' />
        </TouchableOpacity>
        <View>
          <AppTextInput.Underline
            value={formData.name.value}
            placeholder='Name here...'
            labelIcon={<VectorIcon.MCI name='account' color='white' size={20} />}
            onTextChange={onNameChange}
            keyboardType={'default'}
          />
          <AppTextInput.Underline
            value={formData.email.value}
            placeholder='Email here...'
            labelIcon={<VectorIcon.MCI name='email' color='white' size={20} />}
            onTextChange={onEmailChange}
            keyboardType={'default'}
          />
          <AppTextInput.Underline
            value={formData.password.value}
            placeholder='Password here...'
            labelIcon={<VectorIcon.II name='eye' color='white' size={20} />}
            onTextChange={onPasswordChange}
            keyboardType={'default'}
            secureTextEntry
            onTextEntryVisibilityChange={onPasswordVisibilityChange}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    width: 70,
    height: 70,
    alignSelf: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
});
