import React, { useCallback, useState, useContext } from 'react';
import { AuthContext, SnackBarContext } from '../../../providers';
import { AuthType } from '../../../types';
import * as SecureStore from 'expo-secure-store';
import { SignupInputType, SignupOutputType } from '../types.';

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

type FormDataType = {
  name: FormType<string>;
  email: FormType<string>;
  password: FormType<string>;
};

export const INITIAL_FORM_DATA = {
  name: {
    value: '',
    isValidated: false,
  },
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
  onNameChange: (text: string) => void;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  isPasswordHidden: boolean;
  onPasswordHiddenChange: () => void;
  onSignupSuccess: (signupOutput: SignupOutputType) => void;
};

export const useForm = (): useFormOutput => {
  const { setAuth } = useContext(AuthContext);
  const { setSnackBar } = useContext(SnackBarContext);
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  // dependencyに入れたものが変わらないかぎり、このfunctionは新しいものにはならない。
  const onNameChange = useCallback((text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        name: {
          value: text,
          isValidated: text.length ? true : false,
        },
      };
    });
  }, []);

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

  const onSignupSuccess = async (signupOutput: SignupOutputType) => {
    await SecureStore.setItemAsync('secure_token', signupOutput.jwt);
    setAuth(signupOutput.user);
    setSnackBar({
      isVisible: true,
      status: 'success',
      message: 'Logged in successfully.',
      duration: 5000,
    });
  };

  return {
    formData,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    isPasswordHidden,
    onPasswordHiddenChange,
    onSignupSuccess,
  };
};
