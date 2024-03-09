import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PageScreen, AppTextInput, LoadingIndicator } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { usePasswordForm } from '../hooks';
import { TextColor } from '../../../themes';

// ここ、emailもないといかんわ。。。
export const SetNewPassword = ({ navigation }) => {
  const { passwordForm, onPasswordChange, isPasswordHidden, onPasswordVisibilityChange } = usePasswordForm();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log('hello')} disabled={passwordForm.isValidated ? false : true}>
          <Text
            style={{
              color: passwordForm.isValidated ? TextColor.primary : TextColor.secondary, // 117, 117
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Submit
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [passwordForm]);

  return (
    <PageScreen.WithTitle title='Set new password' subTitle={`Please set a new password.`}>
      <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='At least 10 characters long'
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
