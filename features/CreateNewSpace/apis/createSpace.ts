import backendAPI from '../../../apis/backend';
import { CreateSpaceInputType, CreateSpaceOutputType } from '../types';

export const createSpace = async (input: CreateSpaceInputType): Promise<CreateSpaceOutputType> => {
  try {
    const result = await backendAPI.post('/spaces', input, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
    const { space } = result.data.data;
    return {
      space,
    };
  } catch (error) {
    throw error;
  }
};
