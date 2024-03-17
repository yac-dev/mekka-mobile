import React, { useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PageScreen, AppTextInput } from '../../../components';
import { useForm, useLogin } from '../hooks';
import { VectorIcon } from '../../../Icons';
import { AppButton } from '../../../components';
import { TextColor } from '../../../themes';

export const Login = ({ navigation }) => {
  const { formData, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange } = useForm();
  const { apiResult, requestApi } = useLogin();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => requestApi({ email: formData.email.value, password: formData.password.value })}
          disabled={formData.email.isValidated && formData.password.isValidated ? false : true}
        >
          <Text
            style={{
              color:
                formData.email.isValidated && formData.password.isValidated ? TextColor.primary : TextColor.secondary, // 117, 117
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  useEffect(() => {
    if (apiResult.status === 'fail') {
      // ここでsnackbarを出すようにする。
      console.log('Failed');
      // snackbarもな。。　どうしよ。アプリ全体で持っておくか。。。
    }
  }, [apiResult]);

  const onTextPress = useCallback(() => {
    navigation.navigate('ForgotPassword');
  }, []);

  return (
    <PageScreen.WithTitle
      title={'Login'}
      subTitle={`Already signed up? Please fill out your email, password and then tap Continue.`}
    >
      <View style={{ paddingHorizontal: 10, marginBottom: 40 }}>
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
      <View style={{ paddingHorizontal: 20, alignSelf: 'flex-start' }}>
        <AppButton.Text text='Forgot my password' onTextPress={() => onTextPress()} style={{}} />
      </View>
    </PageScreen.WithTitle>
  );
};

const styles = StyleSheet.create({});
