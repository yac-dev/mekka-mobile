import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PageScreen } from '../../../components';
import { AppTextInput } from '../../../components';
import { useEmailForm } from '../hooks';
import { VectorIcon } from '../../../Icons';
import { useForgotPassword } from '../hooks';
import { LoadingSpinner } from '../../../components';

// ここでemailを入力させて、emailに送る。そんで、indicator出して、pageをenter pin pageへnavigateする。
export const ForgotPassword = ({ navigation, route }) => {
  const { emailForm, onEmailChange } = useEmailForm();
  const { apiResult, requestApi } = useForgotPassword();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => requestApi({ email: emailForm.value })}
          disabled={emailForm.isValidated ? false : true}
        >
          <Text
            style={{
              color: emailForm.isValidated ? 'white' : 'rgb(170,170,170)', // 117, 117
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [emailForm]);

  useEffect(() => {
    if (apiResult.status === 'success') {
      navigation.navigate('EnterPIN', { email: emailForm.value });
    }
  }, [apiResult]);

  return (
    <PageScreen.WithTitle
      title='Forgot your password?'
      subTitle={`Please type your account's email and tap "Send".${'\n'}We'll send you a verification code to this email${'\n'}if it matches an existing Var account.`}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='Email'
          value={emailForm.value}
          onTextChange={onEmailChange}
          labelIcon={<VectorIcon.MCI name='email' color={'white'} size={20} />}
          keyboardType='email-address'
        />
      </View>
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Processing now...' textColor='white' />
    </PageScreen.WithTitle>
  );
};
