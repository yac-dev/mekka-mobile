import { useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import backendAPI from '../../../apis/backend';
import { LoadMeOutputType } from '../types';

export const loadMe = async (): Promise<LoadMeOutputType> => {
  const jwt = await SecureStore.getItemAsync('secure_token');
  if (jwt) {
    try {
      const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
      const { user } = result.data;
      return {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
          avatar: user.avatar,
          pushToken: user.pushToken,
        },
      };
    } catch (error) {
      throw error;
    }
  } else {
    return void 0;
  }
};
