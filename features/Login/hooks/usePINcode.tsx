import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { PINCodeFormType, UsePINCodeOutput } from '../types';

export const usePINcode = (): UsePINCodeOutput => {
  const [PINCodeForm, setPINCodeForm] = useState<PINCodeFormType>({
    value: '',
    isValidated: false,
  });

  const onPINCodeChange = (text: string) => {
    setPINCodeForm((previous) => {
      return {
        ...previous,
        value: text,
        isValidated: text.length && text.length === 6 ? true : false,
      };
    });
  };

  return {
    PINCodeForm,
    onPINCodeChange,
  };
};
