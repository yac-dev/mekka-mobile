import { axiosClient }   from '../axiosClient';
import { LoadMeInput, LoadMeOutputType } from '../types';

export const loadMe = async (input: LoadMeInput): Promise<LoadMeOutputType> => {
  try {
    const result = await axiosClient.get('/auth/loadMe', { headers: { authorization: `Bearer ${input.jwt}` } });
    const { user } = result.data.data;
    return user;
  } catch (error) {
    throw error;
  }
};
