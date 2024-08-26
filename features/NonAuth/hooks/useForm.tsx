import React, { useCallback, useState, useContext } from 'react';
import { SnackBarContext } from '../../../providers';
import { AuthType } from '../../../types';
import * as SecureStore from 'expo-secure-store';
import { LoginOutput } from '../types';
import { showMessage } from 'react-native-flash-message';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../../recoil';

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
  const [, setAuth] = useRecoilState(authAtom);
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
          isValidated: text.length >= 10 ? true : false,
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
    showMessage({ message: 'Logged in successfully.', type: 'success' });
    // navigation.navigate('HomeStackNavigator');
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
