import backendAPI from '../../../apis/backend';
import { CheckPINCodeInputType, CheckPINCodeOutputType } from '../types';

export const checkPINCode = async (input: CheckPINCodeInputType): Promise<CheckPINCodeOutputType> => {
  try {
    const response = await backendAPI.post('/auth/checkpin', { PINCode: input.PINCode });
    const { data } = response.data.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
