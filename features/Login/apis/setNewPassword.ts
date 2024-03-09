import backendAPI from '../../../apis/backend';
import { SetNewPasswordInputType } from '../types';

export const setNewPassword = async (input: SetNewPasswordInputType) => {
  try {
    const response = await backendAPI.post('/auth/newpassword', { email: input.email, password: input.password });
    return void 0;
  } catch (error) {
    console.log(error);
  }
};
