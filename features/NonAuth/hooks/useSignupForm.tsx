import { useState, useCallback } from 'react';

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

type FormDataType = {
  name: FormType<string>;
  email: FormType<string>;
  password: FormType<string>;
};

export const INITIAL__SIGNUP_FORM_DATA = {
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

type UseSignupFormOutputType = {
  formData: FormDataType;
  onNameChange: (text: string) => void;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  isPasswordHidden: boolean;
  onPasswordHiddenChange: () => void;
};

export const useSignupForm = (): UseSignupFormOutputType => {
  const [formData, setFormData] = useState<FormDataType>(INITIAL__SIGNUP_FORM_DATA);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const onNameChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        name: {
          value: text,
          isValidated: text.length >= 2 ? true : false,
        },
      };
    });
  };

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

  // いや、formDataはform入力に関するものをもっておく。
  // isPasswordHiddenはformとはまた別で、state分けておこう。
  const onPasswordHiddenChange = useCallback(() => {
    setIsPasswordHidden((previous) => !previous);
  }, []);

  return {
    formData,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    isPasswordHidden,
    onPasswordHiddenChange,
  };
};
