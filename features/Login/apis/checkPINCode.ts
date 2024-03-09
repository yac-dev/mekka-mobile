import backendAPI from '../../../apis/backend';
import { CheckPINCodeInputType, CheckPINCodeOutputType } from '../types';

export const checkPINCode = async (input: CheckPINCodeInputType): Promise<CheckPINCodeOutputType> => {
  try {
    console.log('pin here', input.PINCode);
    const response = await backendAPI.post('/auth/checkpin', { email: input.email, PINCode: input.PINCode });

    const { data } = response.data;
    return data;
  } catch (error) {
    return error;
  }
};
