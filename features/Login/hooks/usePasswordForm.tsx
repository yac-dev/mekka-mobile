import React, { useState } from 'react';
import { PasswordFormType, UsePasswordFormOutputType } from '../types';

export const usePasswordForm = (): UsePasswordFormOutputType => {
  const [passwordForm, setPasswordForm] = useState<PasswordFormType>({
    value: '',
    isValidated: false,
  });
  const [isPasswordHidden, setIsPasswordHidden] = useState<boolean>(true);

  const onPasswordChange = (text: string) => {
    setPasswordForm((previous) => {
      return {
        ...previous,
        value: text,
        isValidated: text.length ? true : false,
      };
    });
  };

  const onPasswordVisibilityChange = () => {
    setIsPasswordHidden((previous) => !previous);
  };

  return {
    passwordForm,
    onPasswordChange,
    isPasswordHidden,
    onPasswordVisibilityChange,
  };
};
