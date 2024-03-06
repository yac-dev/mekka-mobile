import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { PageScreen, AppTextInput, LoadingIndicator } from '../../../components';
import { VectorIcon } from '../../../Icons';

export const SetNewPassword = () => {
  return (
    <PageScreen.WithTitle title='Set new password' subTitle={`Please set a new password.`}>
      <View>
        <Text>Hello world</Text>
      </View>
      {/* <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='password'
          value={PINCodeForm.value}
          onTextChange={onPINCodeChange}
          labelIcon={<VectorIcon.OI name='number' color={'white'} size={25} />}
          keyboardType='default'
        />
      </View> */}
      {/* <LoadingIndicator.Spin
        isVisible={apiResult.status === 'loading'}
        message='Processing now...'
        textColor={TextColor.primary}
      /> */}
    </PageScreen.WithTitle>
  );
};
