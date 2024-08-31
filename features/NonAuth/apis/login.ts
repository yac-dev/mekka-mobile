import backendAPI from '../../../apis/backend';
import { LoginInput, LoginOutput } from '../types';

export const login = async (input: LoginInput): Promise<LoginOutput> => {
  try {
    const result = await backendAPI.post('/auth/login', { email: input.email, password: input.password });
    const response = result.data.data;
    return {
      user: response.user,
      jwt: response.jwt,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred during login');
    }
  }
};
