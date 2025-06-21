import { axiosClient } from '../axiosClient';
import { GetSpacesOutputType } from '../types';

export const getSpaces = async (): Promise<GetSpacesOutputType> => {
  try {
    const result = await axiosClient.get('/spaces');
    const { spaces } = result.data.data;
    return {
      spaces,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your spaces...');
    }
  }
};
