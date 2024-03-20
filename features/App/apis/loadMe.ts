import { useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import backendAPI from '../../../apis/backend';
import { LoadMeInput, LoadMeOutputType } from '../types';

export const loadMe = async (input: LoadMeInput): Promise<LoadMeOutputType> => {
  try {
    const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${input.jwt}` } });
    const { user } = result.data.data;
    return user;
  } catch (error) {
    throw error;
  }
};
