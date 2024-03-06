import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { PageScreen, AppTextInput, LoadingIndicator } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { usePasswordForm } from '../hooks';
import { TextColor } from '../../../themes';

export const SetNewPassword = ({ navigation }) => {
  const { passwordForm, onPasswordChange, isPasswordHidden, onPasswordVisibilityChange } = usePasswordForm();

  return (
    <PageScreen.WithTitle title='Set new password' subTitle={`Please set a new password.`}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='Password'
          value={passwordForm.value}
          onTextChange={onPasswordChange}
          labelIcon={<VectorIcon.MCI name='key' color={'white'} size={25} />}
          keyboardType='default'
          secureTextEntry={isPasswordHidden}
          onTextEntryVisibilityChange={onPasswordVisibilityChange}
        />
      </View>
      {/* <LoadingIndicator.Spin
        isVisible={apiResult.status === 'loading'}
        message='Processing now...'
        textColor={TextColor.primary}
      /> */}
    </PageScreen.WithTitle>
  );
};
