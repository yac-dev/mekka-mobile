import { useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { VectorIcon } from '../../../Icons';
import backendAPI from '../../../apis/backend';
import * as SecureStore from 'expo-secure-store';
import { ScrollView } from 'react-native-gesture-handler';
import { SnackBarContext } from '../../../providers';
import { useSignupForm } from '../hooks';
import { SignupStackNavigatorProp } from '../../../navigations/SignupStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { AppTextInput } from '../../../components';

export const Signup = () => {
  const navigation = useNavigation<SignupStackNavigatorProp>();
  const { setSnackBar } = useContext(SnackBarContext);
  const { formData, onNameChange, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange } =
    useSignupForm();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => console.log('hello')}
          disabled={
            formData.name.isValidated && formData.email.isValidated && formData.password.isValidated ? false : true
          }
        >
          <Text
            style={{
              color:
                formData.name.isValidated && formData.email.isValidated && formData.password.isValidated
                  ? 'white'
                  : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [formData]);

  // const onSubmitPress = async () => {
  //   const payload = {
  //     name,
  //     email,
  //     password,
  //   };
  //   showLoadingSpinner();
  //   try {
  //     const result = await backendAPI.post('/auth/signup', payload);
  //     const response = result.data.data;
  //     setAuthData(response.user);
  //     setIsAuthenticated(true);
  //     hideLoadingSpinner();
  //     setSnackBar({ isVisible: true, message: 'Welcome to Mekka', status: 'success', duration: 5000 });
  //     await SecureStore.setItemAsync('secure_token', response.jwt);
  //     props.navigation?.navigate('SpacesDrawerNavigator');
  //   } catch (error) {
  //     hideLoadingSpinner();
  //     setSnackBar({
  //       isVisible: true,
  //       status: 'warning',
  //       message: 'OOPS. Something went wrong. Please try again.',
  //       duration: 5000,
  //     });
  //   }
  // };

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, marginBottom: 20 }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              marginBottom: 10,
            }}
          >
            Signup
          </Text>
          <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
            Don't hava an account yet?{'\n'}To get started, please provide your name, email and password.
          </Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <View style={{ paddingHorizontal: 10, marginBottom: 0 }}>
            <AppTextInput.Underline
              placeholder='Name'
              value={formData.name.value}
              onTextChange={onNameChange}
              labelIcon={<VectorIcon.MCI name='email' color={'white'} size={20} />}
              keyboardType='default'
            />
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
        </View>
        {/* <LoadingSpinner isVisible={isVisibleLoadingSpinner} message='Processing now' /> */}
      </ScrollView>
      {/* <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ color: 'rgb(150,150,150)' }}>By signing up, you accept and read Mekka's&nbsp;</Text>
          <TouchableOpacity
            style={{ borderBottomWidth: 0.5, borderBottomColor: 'rgb(150, 150,150)' }}
            onPress={() => props.navigation.navigate('EULA')}
          >
            <Text style={{ color: 'rgb(150,150,150)' }}>EULA.</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </View>
  );
};
