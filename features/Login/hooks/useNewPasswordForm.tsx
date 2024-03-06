import React, { useState } from 'react';
import { PasswordFormType, UseNewPasswordFormOutputType } from '../types';

export const useNewPasswordForm = (): UseNewPasswordFormOutputType => {
  const [passwordForm, setPasswordForm] = useState<PasswordFormType>({
    value: '',
    isValidated: false,
  });

  const onPasswordChange = (text: string) => {
    setPasswordForm((previous) => {
      return {
        ...previous,
        value: text,
        isValidated: text.length ? true : false,
      };
    });
  };

  return {
    passwordForm,
    onPasswordChange,
  };
};
