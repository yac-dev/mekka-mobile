import backendAPI from '../../../apis/backend';
import { CheckPINCodeInputType } from '../types';

export const checkPINCode = async (input: CheckPINCodeInputType) => {
  try {
    const response = await backendAPI.post('/auth/checkpin', { PINCode: input.PINCode });
  } catch (error) {
    console.log(error);
  }
};
