import backendAPI from '../../../apis/backend';
import { LoginInput, LoginOutput } from '../types';

export const login = async (input: LoginInput): Promise<LoginOutput> => {
  try {
    const result = await backendAPI.post('/auth/login', { email: input.email, password: input.password });
    const response = result.data.data;
    console.log('response', response);
    // response きてへんな。。。。なんでだ？？
    // やっぱoutputはこういうobject形式にした方がいいや。こうしよう、こうした方が拡張性がある。
    return {
      user: response.user,
      jwt: response.jwt,
    };
  } catch (error) {
    throw error.response.data;
  }
  // ここで、secureeをさらにsetする感じか。
};
