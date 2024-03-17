import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import * as SecureStore from 'expo-secure-store';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useDeleteMe, useForm } from '../hooks';
import {
  Underline as AppTextInputUnderline,
  WithTitle as PageScreenWithTitle,
  Spinning as LoadingSpinning,
  Primary as PrimarySnackBar,
} from '../../../components';
import { VectorIcon } from '../../../Icons';
import { DeleteMeInput } from '../types';
import { AuthContext, SnackBarContext } from '../../../providers';
import { INITIAL_AUTH } from '../../../types';
import { SnackBar } from '../../../components';

// routingのprops用意な。。。

export const DeleteMyAccount = (props) => {
  const { auth, setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const {
    setLoading,
    setIsAuthenticated,
    setSpaceAndUserRelationships,
    setCurrentSpaceAndUserRelationship,
    setCurrentSpace,
    setCurrentTagObject,
  } = useContext(GlobalContext);
  const { apiResult, requestApi, exec } = useDeleteMe();
  const { formData, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange } = useForm();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() => exec()}
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

  const onDeletePressNew = () => {
    const input: DeleteMeInput = {
      email: formData.email.value,
      password: formData.password.value,
    };
    requestApi(input);
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

  const onDeleteMeSuccess = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuth(INITIAL_AUTH);
    setIsAuthenticated(false);
    setSpaceAndUserRelationships([]);
    setCurrentSpaceAndUserRelationship(null);
    setCurrentTagObject(null);
    setCurrentSpace(null);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      status: 'success',
      message: `Successfully deleted your account.${'\n'}Bye bye.`,
      duration: 5000,
    });
    props.navigation.goBack();
  };

  return (
    <PageScreenWithTitle
      title={'Delete my account'}
      subTitle={`Are you sure you want to delete your account? ${'\n'}To terminate your account, please enter your email and password.`}
    >
      <AppTextInputUnderline
        placeholder='Email'
        value={formData.email.value}
        onTextChange={onEmailChange}
        labelIcon={<VectorIcon.MCI name='email' color={'white'} size={25} />}
        keyboardType='email-address'
      />
      <AppTextInputUnderline
        placeholder='Password'
        value={formData.password.value}
        onTextChange={onPasswordChange}
        labelIcon={<VectorIcon.MCI name='key' color={'white'} size={25} />}
        keyboardType='default'
        secureTextEntry={isPasswordHidden}
        onTextEntryVisibilityChange={onPasswordHiddenChange}
      />
      {apiResult.status === 'loading' ? <LoadingSpinner /> : null}
      <SnackBar.Primary />
    </PageScreenWithTitle>
  );
};
