import React, { useContext, useEffect } from 'react';
import { Text, TouchableWithoutFeedback } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { useDeleteMe, useForm } from '../hooks';
import { AppTextInput, PageScreen } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { DeleteMeInput } from '../types';
import { SnackBarContext } from '../../../providers';
import { LoadingSpinner } from '../../../components';
import { HomeStackNavigatorProps } from '../../Home/navigations';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { mySpacesAtom, currentSpaceAtom, authAtom } from '../../../recoil';

export const DeleteMyAccount = () => {
  const homeStackNavigation = useNavigation<HomeStackNavigatorProps>();
  const [, setAuth] = useRecoilState(authAtom);
  const [, setMySpaces] = useRecoilState(mySpacesAtom);
  const [, setCurrentSpace] = useRecoilState(currentSpaceAtom);
  const { setSnackBar } = useContext(SnackBarContext);
  const { apiResult, requestApi } = useDeleteMe();
  const { formData, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange } = useForm();

  const onDeletePress = () => {
    const input: DeleteMeInput = {
      email: formData.email.value,
      password: formData.password.value,
    };
    requestApi(input);
  };

  useEffect(() => {
    homeStackNavigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() => onDeletePress()}
          disabled={formData.email.isValidated && formData.password.isValidated ? false : true}
        >
          <Text
            style={{
              color: formData.email.isValidated && formData.password.isValidated ? 'white' : 'rgb(117,117, 117)',
              fontSize: 20,
              fontWeight: 'bold',
            }}
          >
            Delete
          </Text>
        </TouchableWithoutFeedback>
      ),
    });
  }, [formData]);

  const onDeleteMeSuccess = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuth(void 0);
    setMySpaces(void 0);
    setCurrentSpace(void 0);
    // setCurrentSpaceAndUserRelationship(null);
    // setCurrentTagObject(null);
    // setCurrentSpace(null);
    setSnackBar({
      isVisible: true,
      status: 'success',
      message: `Successfully deleted your account.${'\n'}Bye bye.`,
      duration: 5000,
    });
    homeStackNavigation.goBack();
  };

  useEffect(() => {
    if (apiResult.status === 'success') {
      onDeleteMeSuccess();
    } else if (apiResult.status === 'fail') {
      setSnackBar({
        isVisible: true,
        status: 'error',
        message: 'fail',
        duration: 5000,
      });
    }
  }, [apiResult]);

  return (
    <PageScreen.WithTitle
      title={'No regrets?'}
      subTitle={`Are you sure you want to delete your account? ${'\n'}To terminate your account, please enter your email and password.`}
    >
      <AppTextInput.Underline
        placeholder='Email'
        value={formData.email.value}
        onTextChange={onEmailChange}
        labelIcon={<VectorIcon.MCI name='email' color={'white'} size={25} />}
        keyboardType='email-address'
      />
      <AppTextInput.Underline
        placeholder='Password'
        value={formData.password.value}
        onTextChange={onPasswordChange}
        labelIcon={<VectorIcon.MCI name='key' color={'white'} size={25} />}
        keyboardType='default'
        secureTextEntry={isPasswordHidden}
        onTextEntryVisibilityChange={onPasswordHiddenChange}
      />
      <LoadingSpinner isVisible={apiResult.status === 'loading'} message={'Processing now'} />
    </PageScreen.WithTitle>
  );
};
