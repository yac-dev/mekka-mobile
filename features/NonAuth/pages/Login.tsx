import React, { useCallback, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PageScreen, AppTextInput } from '../../../components';
import { useForm, useLogin } from '../hooks';
import { VectorIcon } from '../../../Icons';
import { AppButton } from '../../../components';
import { Colors } from '../../../themes';
import { SnackBarContext } from '../../../providers';
import { SnackBar, LoadingSpinner } from '../../../components';
import { AuthContext } from '../../../providers';

export const Login = ({ navigation }) => {
  const { setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const { formData, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange, onLoginSuccess } =
    useForm();
  const { apiResult, requestApi } = useLogin();

  // 画面切り替わって、その後もmodalを維持するのがむずいのかも。。。
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => requestApi({ email: formData.email.value, password: formData.password.value })}
          disabled={formData.email.isValidated && formData.password.isValidated ? false : true}
        >
          <Text
            style={{
              color: formData.email.isValidated && formData.password.isValidated ? Colors.white : Colors.white170, // 117, 117
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
    if (apiResult.status === 'success') {
      onLoginSuccess(apiResult.data, navigation);
    }

    if (apiResult.status === 'fail') {
      setSnackBar({
        isVisible: true,
        status: 'error',
        message: 'OOPS. Something went wrong with your email or password.',
        duration: 5000,
      });
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
          labelIcon={<VectorIcon.MCI name='email' color={'white'} size={20} />}
          keyboardType='email-address'
        />
        <AppTextInput.Underline
          placeholder='Password'
          value={formData.password.value}
          onTextChange={onPasswordChange}
          labelIcon={<VectorIcon.MCI name='key' color={'white'} size={20} />}
          keyboardType='default'
          secureTextEntry={isPasswordHidden}
          onTextEntryVisibilityChange={onPasswordHiddenChange}
        />
      </View>
      <View style={{ paddingHorizontal: 20, alignSelf: 'flex-start' }}>
        <AppButton.Text text='Forgot my password' onTextPress={() => onTextPress()} style={{}} />
      </View>
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Processing now...' />
    </PageScreen.WithTitle>
  );
};

const styles = StyleSheet.create({});
