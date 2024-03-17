import backendAPI from '../../../apis/backend';
import { LoginInput, LoginOutput } from '../types';

export const login = async (input: LoginInput): Promise<LoginOutput> => {
  try {
    // console.log(payload);
    console.log('input??', input);
    const result = await backendAPI.post('/auth/login', { email: input.email, password: input.password });
    const response = result.data.data;
    console.log('response', response);
    // response きてへんな。。。。なんでだ？？
    return response.user;
  } catch (error) {
    throw error;
  }
  // ここで、secureeをさらにsetする感じか。
};
