import backendAPI from '../../../apis/backend';
import { SetNewPasswordInputType } from '../types';

export const setNewPassword = async (input: SetNewPasswordInputType) => {
  try {
    const response = await backendAPI.post('/auth/newpassword', { password: input.password });
    // ここ、特に返す必要ないね。。。
  } catch (error) {
    console.log(error);
  }
};
