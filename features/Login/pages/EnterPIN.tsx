import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PageScreen } from '../../../components';
import { AppTextInput } from '../../../components';
import { LoadingSpinner } from '../../../components';
import { usePINcode } from '../hooks/usePINcode';
import { VectorIcon } from '../../../Icons';
import { useCheckPINCode } from '../hooks/useCheckPINCode';

export const EnterPIN = ({ navigation, route }) => {
  const { PINCodeForm, onPINCodeChange } = usePINcode();
  const { apiResult, requestApi } = useCheckPINCode();
  // console.log(route.params.email);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => requestApi({ email: route.params.email, PINCode: Number(PINCodeForm.value) })}
          disabled={PINCodeForm.isValidated ? false : true}
        >
          <Text
            style={{
              color: PINCodeForm.isValidated ? 'white' : 'rgb(170,170,170)', // 117, 117
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Send
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [PINCodeForm]);

  useEffect(() => {
    if (apiResult.status === 'success') {
      navigation.navigate('SetNewPassword', { email: apiResult.data.email });
    }
  }, [apiResult]);

  return (
    <PageScreen.WithTitle
      title='Enter PIN code'
      subTitle={`Please checkout your email inbox for a verification code. If you don't see a code, check your spam folder.`}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='6-digit code'
          value={PINCodeForm.value}
          onTextChange={onPINCodeChange}
          labelIcon={<VectorIcon.OI name='number' color={'white'} size={25} />}
          keyboardType='number-pad'
        />
      </View>
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message='Processing now...' textColor='white' />
    </PageScreen.WithTitle>
  );
};
