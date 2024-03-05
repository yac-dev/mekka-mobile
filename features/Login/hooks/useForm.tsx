import React, { useState } from 'react';

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
};

export const useForm = (): useFormOutput => {
  const [formData, setFormData] = useState<FormDataType>(INITIAL_FORM_DATA);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const onEmailChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        email: {
          value: text,
          isValidated: text.length ? true : false,
        },
      };
    });
  };

  const onPasswordChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        password: {
          value: text,
          isValidated: text.length ? true : false,
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