import React, { useCallback, useState, useContext } from 'react';
import { AuthContext, SnackBarContext } from '../../../providers';
import { AuthType } from '../../../types';
import * as SecureStore from 'expo-secure-store';
import { LoginOutput } from '../types';

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

type FormDataType = {
  email: FormType<string>;
  password: FormType<string>;
};

export const INITIAL_FORM_DATA = {
  email: {
    value: '',
    isValidated: false,
  },
  password: {
    value: '',
    isValidated: false,
  },
};

type useFormOutput = {
  formData: FormDataType;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  isPasswordHidden: boolean;
  onPasswordHiddenChange: () => void;
  onLoginSuccess: (loginOutput: LoginOutput, navigation: any) => void;
};

export const useForm = (): useFormOutput => {
  const { setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  // dependencyに入れたものが変わらないかぎり、このfunctionは新しいものにはならない。
  const onEmailChange = useCallback((text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        email: {
          value: text,
          isValidated: text.length ? true : false,
        },
      };
    });
  }, []);

  const onPasswordChange = useCallback((text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        password: {
          value: text,
          isValidated: text.length ? true : false,
        },
      };
    });
  }, []);

  const onPasswordHiddenChange = useCallback(() => {
    setIsPasswordHidden((previous) => !previous);
  }, []);

  const onLoginSuccess = async (loginOutput: LoginOutput, navigation: any) => {
    await SecureStore.setItemAsync('secure_token', loginOutput.jwt);
    setAuth(loginOutput.user);
    navigation.navigate('HomeStackNavigator');
    setSnackBar({
      isVisible: true,
      status: 'success',
      message: 'Logged in successfully.',
      duration: 5000,
    });
  };

  return {
    formData,
    onEmailChange,
    onPasswordChange,
    isPasswordHidden,
    onPasswordHiddenChange,
    onLoginSuccess,
  };
};
