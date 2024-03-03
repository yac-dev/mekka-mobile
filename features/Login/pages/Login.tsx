import React from 'react';
import { View, Text } from 'react-native';
import { PageScreen, AppTextInput } from '../../../components';
import { useForm } from '../hooks';
import { VectorIcon } from '../../../Icons';

export const Login = () => {
  const { formData, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange } = useForm();
  return (
    <PageScreen.WithTitle
      title={'Login'}
      subTitle={`Already signed up? Please fill out your email, password and then tap Continue.`}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='Email'
          value={formData.email.value}
          onTextChange={onEmailChange}
          labelIcon={<VectorIcon.MCI name='email' color={'white'} size={25} />}
          keyboardType='email-address'
        />
        <AppTextInput.Underline
          placeholder='Password'
          value={formData.password.value}
          onTextChange={onPasswordChange}
          labelIcon={<VectorIcon.MCI name='key' color={'white'} size={25} />}
          keyboardType='default'
          secureTextEntry={isPasswordHidden}
          onTextEntryVisibilityChange={onPasswordHiddenChange}
        />
      </View>
    </PageScreen.WithTitle>
  );
};
