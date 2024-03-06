import React from 'react';
import { View, Text } from 'react-native';
import { PageScreen } from '../../../components';
import { AppTextInput } from '../../../components';
import { LoadingIndicator } from '../../../components';

export const EnterPIN = () => {
  return (
    <PageScreen.WithTitle
      title='Enter PIN code'
      subTitle={`Please checkout your email inbox for a verification code. If you don't see a code, check your spam folder.`}
    >
      <View>
        <Text>Hello</Text>
      </View>
      {/* <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='Email'
          value={emailForm.value}
          onTextChange={onEmailChange}
          labelIcon={<VectorIcon.MCI name='email' color={'white'} size={25} />}
          keyboardType='email-address'
        />
      </View>
      <LoadingIndicator.Spin
        isVisible={apiResult.status === 'loading'}
        message='Processing⏱️⏱️⏱️'
        textColor={TextColor.primary}
      /> */}
    </PageScreen.WithTitle>
  );
};
