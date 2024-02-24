import React, { useState } from 'react';
import { FormDataType, INITIAL_FORM_DATA } from '../types';

export const useForm = (): {
  formData: FormDataType;
  onEmailChange: (email: string) => void;
  onPasswordChange: (password: string) => void;
  isPasswordHidden: boolean;
  onPasswordHiddenChange: () => void;
} => {
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const onEmailChange = (email: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        email: {
          value: email,
          isValidated: email.length ? true : false,
        },
      };
    });
  };

  const onPasswordChange = (password: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        password: {
          value: password,
          isValidated: password.length ? true : false,
        },
      };
    });
  };

  const onPasswordHiddenChange = () => {
    setIsPasswordHidden((previous) => !previous);
  };

  return {
    formData,
    onEmailChange,
    onPasswordChange,
    isPasswordHidden,
    onPasswordHiddenChange,
  };
};
