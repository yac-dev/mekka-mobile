import { useCallback } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigatorProps } from '../../App';
import { AppTextInput } from '../../../components/AppTextInput';
import { useForm } from '../../Login/hooks';
import { AppButton } from '../../../components/Button';

export const WelcomePage = () => {
  const navigation = useNavigation<RootStackNavigatorProps>();
  const { formData, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange, onLoginSuccess } =
    useForm();

  const onForgotMyPasswordPress = useCallback(() => {
    navigation.navigate('ForgotPasswordStackNavigator');
  }, []);

  const onRegisterPress = () => {
    navigation.navigate('Signup');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 30, paddingBottom: 20 }}>
        <ExpoImage
          style={{ width: 120, height: 120, alignSelf: 'center' }}
          source={require('../../../assets/appLogos/mekka_logo.png')}
          contentFit='contain'
        />
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Welcome to Mekka
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          To get started, please login or signup at first.
        </Text>
      </View>
      <Text>Welcome to Mekka. Please signup or login to proceed.</Text>
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
        <View style={{ paddingHorizontal: 10 }}>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              backgroundColor: 'rgb(50,50,50)',
              paddingVertical: 15,
              borderRadius: 50,
              marginBottom: 15,
            }}
            disabled={formData.email.isValidated && formData.password.isValidated ? false : true}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <VectorIcon.II
                name='checkmark-circle'
                color={formData.email.isValidated && formData.password.isValidated ? 'white' : 'rgb(90,90,90)'}
                size={15}
                style={{ marginRight: 5 }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  color: formData.email.isValidated && formData.password.isValidated ? 'white' : 'rgb(90,90,90)',
                  fontSize: 15,
                  fontWeight: '700',
                }}
              >
                Sign in
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15, alignSelf: 'center' }}>
          <View style={{ alignSelf: 'center', marginBottom: 15 }}>
            <AppButton.Text text='Forgot my password' onTextPress={() => onForgotMyPasswordPress()} style={{}} />
          </View>
          <View style={{ alignSelf: 'center', marginBottom: 15 }}>
            <AppButton.Text text="Don't have account" onTextPress={() => onRegisterPress()} style={{}} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
