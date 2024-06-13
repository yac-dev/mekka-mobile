import backendAPI from '../../../apis/backend';
import { ForgotPasswordInput } from '../types';

export const forgotPassword = async (input: ForgotPasswordInput) => {
  try {
    const response = await backendAPI.post('/auth/forgotPassword', { email: input.email });
  } catch (error) {
    throw error;
  }
};
