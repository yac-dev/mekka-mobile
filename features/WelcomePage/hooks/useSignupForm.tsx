import { useState, useCallback } from 'react';

type FormType<T> = {
  value: T;
  isValidated: boolean;
};

type FormDataType = {
  email: FormType<string>;
  password: FormType<string>;
};

export const INITIAL__SIGNUP_FORM_DATA = {
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
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  isPasswordHidden: boolean;
  onPasswordHiddenChange: () => void;
};

export const useForm = (): UseSignupFormOutputType => {
  const [formData, setFormData] = useState<FormDataType>(INITIAL__SIGNUP_FORM_DATA);
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

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

  // いや、formDataはform入力に関するものをもっておく。
  // isPasswordHiddenはformとはまた別で、state分けておこう。
  const onPasswordHiddenChange = useCallback(() => {
    setIsPasswordHidden((previous) => !previous);
  }, []);

  return {
    formData,
    onEmailChange,
    onPasswordChange,
    isPasswordHidden,
    onPasswordHiddenChange,
  };
};
