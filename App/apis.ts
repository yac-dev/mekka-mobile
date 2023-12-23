import * as SecureStore from 'expo-secure-store';
import { api } from '../Config/api';
import { AuthDataType } from './type';

export const loadMe = async (): Promise<AuthDataType> => {
  const jwt = await SecureStore.getItemAsync('secure_token');
  if (jwt) {
    const result = await api.get('/auth/loadMe', { headers: { authorization: `Bearer ${jwt}` } });
    const { user } = result.data;
    return user;
  } else {
    return;
  }
};
