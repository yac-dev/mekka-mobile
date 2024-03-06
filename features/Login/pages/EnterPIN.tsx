import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { PageScreen } from '../../../components';
import { AppTextInput } from '../../../components';
import { LoadingIndicator } from '../../../components';
import { usePINcode } from '../hooks/usePINcode';
import { VectorIcon } from '../../../Icons';
import { TextColor } from '../../../themes';
import { checkPINCode } from '../apis';

export const EnterPIN = ({ navigation }) => {
  const { PINCodeForm, onPINCodeChange } = usePINcode();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => console.log('Hello')} disabled={PINCodeForm.isValidated ? false : true}>
          <Text
            style={{
              color: PINCodeForm.isValidated ? TextColor.primary : TextColor.secondary, // 117, 117
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

  return (
    <PageScreen.WithTitle
      title='Enter PIN code'
      subTitle={`Please checkout your email inbox for a verification code. If you don't see a code, check your spam folder.`}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <AppTextInput.Underline
          placeholder='Email'
          value={PINCodeForm.value}
          onTextChange={onPINCodeChange}
          labelIcon={<VectorIcon.OI name='number' color={'white'} size={25} />}
          keyboardType='number-pad'
        />
      </View>
      {/* <LoadingIndicator.Spin
        isVisible={apiResult.status === 'loading'}
        message='Processing⏱️⏱️⏱️'
        textColor={TextColor.primary}
      /> */}
    </PageScreen.WithTitle>
  );
};
