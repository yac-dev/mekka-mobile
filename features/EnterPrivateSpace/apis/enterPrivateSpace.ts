import backendAPI from '../../../apis/backend';
import { EnterPrivateSpaceInputType, EnterPrivateSpaceOutputType } from '../types';

export const enterPrivateSpace = async (input: EnterPrivateSpaceInputType): Promise<EnterPrivateSpaceOutputType> => {
  try {
    const result = await backendAPI.post('/spaces/private', input);
    const { space } = result.data.data;
    return {
      space,
    };
  } catch (error) {
    throw error;
  }
};
