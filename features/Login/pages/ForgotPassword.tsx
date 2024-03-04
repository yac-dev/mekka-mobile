import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PageScreen } from '../../../components';
import { AppTextInput } from '../../../components';
import { useEmailForm } from '../hooks';
import { VectorIcon } from '../../../Icons';
import { TextColor } from '../../../themes';

// ここでemailを入力させて、emailに送る。そんで、indicator出して、pageをenter pin pageへnavigateする。
export const ForgotPassword = ({ navigation }) => {
  const { emailForm, onEmailChange } = useEmailForm();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => console.log('forgot password')}
          disabled={emailForm.isValidated ? false : true}
        >
          <Text
            style={{
              color: emailForm.isValidated ? TextColor.primary : TextColor.secondary, // 117, 117
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

  return (
    <PageScreen.WithTitle
      title='Reset password'
      subTitle={`Please write your account's email and tap "Send".${'\n'}We'll send you a verification code to this email${'\n'}if it matches an existing Mekka account.`}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='Email'
          value={emailForm.value}
          onTextChange={onEmailChange}
          labelIcon={<VectorIcon.MCI name='email' color={'white'} size={25} />}
          keyboardType='email-address'
        />
      </View>
    </PageScreen.WithTitle>
  );
};
