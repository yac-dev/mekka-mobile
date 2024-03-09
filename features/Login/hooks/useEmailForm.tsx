import React, { useState } from 'react';
import { View, Text } from 'react-native';

type EmailFormType = {
  value: string;
  isValidated: boolean;
};

type UseEmailFormOutput = {
  emailForm: EmailFormType;
  onEmailChange: (text: string) => void;
};

export const useEmailForm = (): UseEmailFormOutput => {
  const [emailForm, setEmailForm] = useState<EmailFormType>({
    value: '',
    isValidated: false,
  });

  const onEmailChange = (text: string) => {
    setEmailForm((previous) => {
      return {
        ...previous,
        value: text,
        isValidated: text.length ? true : false,
      };
    });
  };

  return {
    emailForm,
    onEmailChange,
  };
};
