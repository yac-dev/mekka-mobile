import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PageScreen, AppTextInput, LoadingIndicator } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { usePasswordForm, useSetNewPassword } from '../hooks';
import { TextColor } from '../../../themes';

export const SetNewPassword = ({ navigation, route }) => {
  const { passwordForm, onPasswordChange, isPasswordHidden, onPasswordVisibilityChange } = usePasswordForm();
  const { apiResult, requestApi } = useSetNewPassword();

  console.log('route params -> ', route.params);
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => requestApi({ email: route.params.email, password: passwordForm.value })}
          disabled={passwordForm.isValidated ? false : true}
        >
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

  useEffect(() => {
    if (apiResult.status === 'success') {
      console.log('statusa after set new password', apiResult);
      navigation.navigate('WelcomPage'); // この後に、snackbarを出す感じにしたい。だから、snackbar自体は、appでglobalにcomponentをもっておく方がいいかも。。
    }
  }, [apiResult.status]);

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
      <LoadingIndicator.Spin
        isVisible={apiResult.status === 'loading'}
        message='Processing now...'
        textColor={TextColor.primary}
      />
    </PageScreen.WithTitle>
  );
};
