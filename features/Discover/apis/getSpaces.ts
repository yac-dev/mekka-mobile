import backendAPI from '../../../apis/backend';
import { GetSpacesOutputType } from '../types';

export const getSpaces = async (): Promise<GetSpacesOutputType> => {
  try {
    const result = await backendAPI.get('/spaces');
    const { spaces } = result.data.data;
    return {
      spaces,
    };
  } catch (error) {
    throw error;
  }
};
