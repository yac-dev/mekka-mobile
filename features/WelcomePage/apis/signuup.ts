import backendAPI from '../../../apis/backend';
import { SignupInputType, SignupOutputType } from '../type';

export const signup = async (input: SignupInputType): Promise<SignupOutputType> => {
  try {
    const result = await backendAPI.post('/auth/signup', input);
    const response = result.data.data;
    // ここの後でtranslatorかけたほうがいよな。

    return {
      user: response.user,
      jwt: response.jwt,
    };
  } catch (error) {
    throw error;
  }
};
