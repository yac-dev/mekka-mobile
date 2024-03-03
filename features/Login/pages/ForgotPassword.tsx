import React from 'react';
import { View, Text } from 'react-native';
import { PageScreen } from '../../../components';

// ここでemailを入力させて、emailに送る。そんで、indicator出して、pageをenter pin pageへnavigateする。
export const ForgotPassword = () => {
  return (
    <PageScreen.WithTitle title='Reset password' subTitle='forgot??'>
      <View>
        <Text>Forgot my password</Text>
      </View>
    </PageScreen.WithTitle>
  );
};
