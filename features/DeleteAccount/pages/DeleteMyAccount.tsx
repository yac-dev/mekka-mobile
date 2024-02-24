import React, { useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import backendAPI from '../../../apis/backend';
import { GlobalContext } from '../../../contexts/GlobalContext';
import * as SecureStore from 'expo-secure-store';
import LoadingSpinner from '../../../components/LoadingSpinner';
import { useDeleteMe, useForm } from '../hooks';
import { Underline as AppTextInputUnderline } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { DeleteMeInput } from '../types';

// routingのprops用意な。。。

export const DeleteMyAccount = (props) => {
  const {
    authData,
    setLoading,
    setSnackBar,
    setAuthData,
    setIsAuthenticated,
    setSpaceAndUserRelationships,
    setCurrentSpaceAndUserRelationship,
    setCurrentSpace,
    setCurrentTagObject,
  } = useContext(GlobalContext);
  const { apiResult, requestApi } = useDeleteMe();
  const { formData, onEmailChange, onPasswordChange, isPasswordHidden, onPasswordHiddenChange } = useForm();

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () => (
        <TouchableWithoutFeedback
          onPress={() => onDeletePressNew()}
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
    }
  }, [apiResult]);

  const onDeleteMeSuccess = async () => {
    await SecureStore.deleteItemAsync('secure_token');
    setAuthData({ _id: '', name: '', email: '', avatar: '' });
    setIsAuthenticated(false);
    setSpaceAndUserRelationships([]);
    setCurrentSpaceAndUserRelationship(null);
    setCurrentTagObject(null);
    setCurrentSpace(null);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Successfully deleted your account. Bye bye.',
      duration: 5000,
    });
    props.navigation.goBack();
  };

  const onDeletePress = async () => {
    setLoading(true);
    await SecureStore.deleteItemAsync('secure_token');
    const result = await backendAPI.delete(`/auth/${authData._id}`);
    setAuthData({ _id: '', name: '', email: '', avatar: '' });
    setIsAuthenticated(false);
    setSpaceAndUserRelationships([]);
    setCurrentSpaceAndUserRelationship(null);
    setCurrentTagObject(null);
    setCurrentSpace(null);
    setLoading(false);
    setSnackBar({
      isVisible: true,
      barType: 'success',
      message: 'Successfully deleted your account. Bye bye.',
      duration: 5000,
    });
    props.navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'black' }}>
      <View style={{ paddingLeft: 30, paddingRight: 30, paddingTop: 20, paddingBottom: 20, marginBottom: 40 }}>
        <Text
          style={{
            color: 'white',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            marginBottom: 10,
          }}
        >
          Delete my account
        </Text>
        <Text style={{ textAlign: 'center', color: 'rgb(180, 180, 180)' }}>
          Are you sure you want to delete your account? {'\n'}To terminate your account, please enter your email and
          password.
        </Text>
      </View>
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
      <LoadingSpinner />
    </View>
  );
};
