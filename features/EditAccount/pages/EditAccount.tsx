import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { AppTextInput } from '../../../components';
import { useEditAccount, useUpdateUser } from '../hooks';
import { UpdateUserInputType } from '../types';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { Colors } from '../../../themes';

const avatarWidth = 42;

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
              color: isFormValidated ? 'white' : 'rgb(117,117, 117)',
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
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 20,
      }}
    >
      <ScrollView>
        <View>
          <Text
            style={{ color: Colors.white, textAlign: 'center', fontWeight: 'bold', fontSize: 20, marginBottom: 10 }}
          >
            Edit My Account
          </Text>
          <Text style={{ color: Colors.white170, textAlign: 'center', fontSize: 12, marginBottom: 20 }}>
            Customize your account information such as {'\n'}name, email, and avatar.
          </Text>
          <TouchableOpacity activeOpacity={0.7} onPress={() => onAvatarPress()} style={styles.avatarContainer}>
            <View
              style={{
                backgroundColor: 'rgb(70,70,70)',
                justifyContent: 'center',
                alignItems: 'center',
                width: 80,
                height: 80,
                borderRadius: 80 / 2,
                marginBottom: 10,
              }}
            >
              {formData.avatar.value ? (
                <View style={{ width: '100%', height: '100%', borderRadius: 80 / 2 }}>
                  <ExpoImage style={styles.avatar} source={{ uri: formData.avatar.value }} contentFit='cover' />
                </View>
              ) : (
                <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
                  {formData.name.value.slice(0, 2).toUpperCase()}
                </Text>
              )}
              <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
                <View
                  style={{
                    backgroundColor: 'black',
                    width: 26,
                    height: 26,
                    borderRadius: 26 / 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      width: 18,
                      height: 18,
                      borderRadius: 18 / 2,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <VectorIcon.MCI name='upload' color='black' size={15} />
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View>
            <AppTextInput.Underline
              value={formData.name.value}
              placeholder='Name'
              labelIcon={<VectorIcon.MCI name='account' color='white' size={20} />}
              onTextChange={onNameChange}
              keyboardType={'default'}
            />
            <AppTextInput.Underline
              value={formData.email.value}
              placeholder='Email'
              labelIcon={<VectorIcon.MCI name='email' color='white' size={20} />}
              onTextChange={onEmailChange}
              keyboardType={'default'}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 10,
          alignSelf: 'center',
        }}
        onPress={() => homeStackNavigation.navigate('DeleteMyAccount')}
        activeOpacity={0.7}
      >
        <VectorIcon.MCI name='delete' color='red' size={20} style={{ marginRight: 5 }} />
        <Text style={{ color: 'red', fontSize: 15, fontWeight: 'bold', textAlign: 'center' }}>Delete My Account</Text>
      </TouchableOpacity>
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
    borderRadius: 80 / 2,
  },
});
