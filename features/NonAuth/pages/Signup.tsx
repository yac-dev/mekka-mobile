import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { VectorIcon } from '../../../Icons';
import { ScrollView } from 'react-native-gesture-handler';
import { useSignupForm, useSignupState } from '../hooks';
import { SignupStackNavigatorProp } from '../navigations/SignupStackNavigator';
import { useNavigation } from '@react-navigation/native';
import { AppTextInput } from '../../../components';
import { LoadingSpinner } from '../../../components';
import { showMessage } from 'react-native-flash-message';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { SignupStackNavigatorParams } from '../navigations/SignupStackNavigator';
import { Image as ExpoImage } from 'expo-image';
import { SpaceType } from '../../../types';

type ISignup = NativeStackScreenProps<SignupStackNavigatorParams, 'Signup'>;

export const Signup: React.FC<ISignup> = ({ route }) => {
  const navigation = useNavigation<SignupStackNavigatorProp>();
  const { formData, onNameChange, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange } =
    useSignupForm();
  const [requestedSpace, setRequestedSpace] = useState<SpaceType | undefined>(null);

  const { apiResult: signupResult, requestApi } = useSignupState();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            console.log('input', {
              name: formData.name.value,
              email: formData.email.value,
              password: formData.password.value,
              spaceId: requestedSpace?._id,
            });
            requestApi({
              name: formData.name.value,
              email: formData.email.value,
              password: formData.password.value,
              spaceId: requestedSpace?._id,
            });
          }}
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
  }, [formData, requestedSpace]);

  useEffect(() => {
    if (route.params?.space) {
      setRequestedSpace(route.params.space);
      showMessage({ message: 'Space was added.', type: 'success', duration: 5000 });
    }
  }, [route.params?.space]);

  useEffect(() => {
    if (signupResult.status === 'success') {
      showMessage({ message: 'Welcome to Lampole', type: 'success', duration: 5000 });
    }
  }, [signupResult]);

  useEffect(() => {
    if (signupResult.status === 'error') {
      showMessage({ message: signupResult.message, type: 'danger', duration: 5000 });
    }
  }, [signupResult]);

  return (
    <View style={{ flex: 1, backgroundColor: 'black', padding: 10 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ paddingLeft: 20, paddingRight: 20, paddingTop: 20, paddingBottom: 20, marginBottom: 20 }}>
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
            Welcome to Lampole. To get started, {'\n'}please provide your name, email and password.
          </Text>
        </View>
        <View style={{ flexDirection: 'column' }}>
          <AppTextInput.Underline
            placeholder='Name'
            value={formData.name.value}
            onTextChange={onNameChange}
            labelIcon={<VectorIcon.MCI name='account' color={'white'} size={20} />}
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
            placeholder='Password at least 10 characters'
            value={formData.password.value}
            onTextChange={onPasswordChange}
            labelIcon={<VectorIcon.MCI name='key' color={'white'} size={20} />}
            keyboardType='default'
            secureTextEntry={isPasswordHidden}
            onTextEntryVisibilityChange={onPasswordHiddenChange}
          />
        </View>

        {requestedSpace ? (
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Invited space</Text>
            <View
              style={{
                backgroundColor: 'rgb(50,50,50)',
                paddingVertical: 10,
                borderRadius: 15,
                paddingHorizontal: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <ExpoImage
                  source={{ uri: requestedSpace?.icon }}
                  style={{ width: 50, height: 50, marginRight: 15, borderRadius: 100 }}
                />
                <View>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15, marginBottom: 5 }}>
                    {requestedSpace?.name}
                  </Text>
                  <Text style={{ color: 'rgb(150,150,150)', fontSize: 12 }}>
                    created by {requestedSpace?.createdBy.name}
                  </Text>
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: 'black',
                  width: 28,
                  height: 28,
                  borderRadius: 30,
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  top: -8,
                  right: -8,
                }}
                activeOpacity={0.7}
                onPress={() => setRequestedSpace(void 0)}
              >
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'white',
                    // position: 'absolute',
                    // top: -5,
                    // right: -5,
                  }}
                >
                  <VectorIcon.II name='close' size={15} color={'black'} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            onPress={() => navigation.navigate('EnterInvitationKey')}
            style={{
              paddingVertical: 20,
              borderRadius: 100,
              backgroundColor: 'rgb(70,70,70)',
            }}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{ color: 'white', fontWeight: 'bold', marginRight: 10 }}>
                Already have an invitation key?
              </Text>
              <VectorIcon.MCI name='chevron-down' color={'white'} size={20} />
            </View>
          </TouchableOpacity>
        )}

        <LoadingSpinner isVisible={signupResult.status === 'loading'} message='Processing now...' />
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 20, alignSelf: 'center' }}>
        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ color: 'rgb(150,150,150)' }}>By signing up, you accept and read Lampole's&nbsp;</Text>
          <TouchableOpacity
            style={{ borderBottomWidth: 0.5, borderBottomColor: 'rgb(150, 150,150)' }}
            onPress={() => navigation.navigate('EULA')}
          >
            <Text style={{ color: 'rgb(150,150,150)' }}>EULA.</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
