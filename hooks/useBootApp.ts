import { useState, useEffect, useContext } from 'react';
import * as SecureStore from 'expo-secure-store';
import backendAPI from '../apis/backend';
import { useRecoilState } from 'recoil';
import { authAtom } from '../recoil';

export const useBootApp = () => {
  const [, setAuth] = useRecoilState(authAtom);

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
