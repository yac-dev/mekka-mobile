import { useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import backendAPI from '../../../apis/backend';
import { DeleteMeInput } from '../types';

// axiosのdelete methodて
export const deleteMe = async (input: DeleteMeInput): Promise<void> => {
  const result = await backendAPI.delete('/auth', { data: { email: input.email, password: input.password } });
};
