import React from 'react';
import { View, Text } from 'react-native';
import { PageScreen } from '../../../components';
import { AppTextInput } from '../../../components';
import { useEmailForm } from '../hooks';
import { VectorIcon } from '../../../Icons';

// ここでemailを入力させて、emailに送る。そんで、indicator出して、pageをenter pin pageへnavigateする。
export const ForgotPassword = () => {
  const { emailForm, onEmailChange } = useEmailForm();
  return (
    <PageScreen.WithTitle
      title='Reset password'
      subTitle={`We'll send you a verification code to this email${'\n'}if it matches an existing Mekka account.`}
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
