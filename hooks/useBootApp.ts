import { useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from '../providers';
import backendAPI from '../apis/backend';

export const useBootApp = () => {
  const { auth, setAuth } = useContext(AuthContext);

  // ここでapiに関するもんをつくっておいたほうがいいよな。。
  const loadMe = async () => {
    const jwt = await SecureStore.getItemAsync('secure_token');
    if (jwt) {
      const result = await backendAPI.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
      const { user } = result.data;
      setAuth(user);
      // setIsAuthDataFetched(true);
      // setIsAuthenticated(true);
    } else {
      // setIsAuthDataFetched(true);
      // setIsAuthenticated(false);
    }
  };

  return {
    loadMe,
  };
};
