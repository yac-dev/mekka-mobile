import { useCallback, useEffect } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { useNavigation } from '@react-navigation/native';
import { AppTextInput } from '../../../components/AppTextInput';
import { useForm } from '../hooks';
import { AppButton } from '../../../components/Button';
import { useLogin } from '../hooks';
import { LoadingSpinner } from '../../../components';
import { NonAuthStackNavigatorProps } from '../navigations/NonAuthNavigator';
import { showMessage } from 'react-native-flash-message';
import { urls } from '../../../settings';

export const WelcomePage = () => {
  const nonAuthStackNavigation = useNavigation<NonAuthStackNavigatorProps>();
  const { formData, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange, onLoginSuccess } =
    useForm();
  const { apiResult, requestApi } = useLogin();

  useEffect(() => {
    nonAuthStackNavigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => onLoginPress()}
          disabled={formData.email.isValidated && formData.password.isValidated ? false : true}
        >
          <Text
            style={{
              color: formData.email.isValidated && formData.password.isValidated ? 'white' : 'rgb(117, 117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity onPress={() => onRegisterPress()}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Signup
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  useEffect(() => {
    if (apiResult.status === 'success') {
      onLoginSuccess(apiResult.data, nonAuthStackNavigation);
    }

    // if (apiResult.status === 'fail') {
    //   setSnackBar({
    //     isVisible: true,
    //     status: 'error',
    //     message: 'OOPS. Something went wrong with your email or password.',
    //     duration: 5000,
    //   });
    // }
  }, [apiResult]);

  useEffect(() => {
    if (apiResult.status === 'error') {
      showMessage({ message: apiResult.message, type: 'danger', duration: 5000 });
    }
  }, [apiResult]);

  const onLoginPress = () => {
    requestApi({ email: formData.email.value, password: formData.password.value });
  };

  const onForgotMyPasswordPress = useCallback(() => {
    nonAuthStackNavigation.navigate('ForgotPasswordStackNavigator');
  }, []);

  const onRegisterPress = () => {
    nonAuthStackNavigation.navigate('SignupStackNavigator');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 50, paddingBottom: 20 }}>
        {/* <ExpoImage
          style={{ width: 50, height: 50, alignSelf: 'center' }}
          source={require('../../../assets/appLogos/mekka_logo.png')}
          contentFit='contain'
        /> */}
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Login
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Welcome back.{'\n'}Please fill in your email and password to login.
        </Text>
      </View>
      <Text>Welcome to Var. Please signup or login to proceed.</Text>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ paddingHorizontal: 10, marginBottom: 0 }}>
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
        <View style={{ paddingHorizontal: 10 }}></View>
        <View
          style={{ flexDirection: 'column', alignItems: 'center', gap: 15, alignSelf: 'flex-end', marginRight: 20 }}
        >
          <View style={{ alignSelf: 'center', marginBottom: 15 }}>
            <AppButton.Text text='Forgot my password' onTextPress={() => onForgotMyPasswordPress()} style={{}} />
          </View>
        </View>
      </View>
      <Text
        style={{
          color: 'rgb(170,170,170)',
          fontSize: 16,
          position: 'absolute',
          bottom: 20,
          alignSelf: 'center',
          marginBottom: 10,
          textDecorationLine: 'underline',
        }}
        onPress={() => nonAuthStackNavigation.navigate('AboutApp', { url: urls.briefIntroduction })}
      >
        What is Var??
      </Text>
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Processing now...' textColor='white' />
    </SafeAreaView>
  );
};
