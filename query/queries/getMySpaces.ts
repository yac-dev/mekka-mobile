import { axiosClient } from '../axiosClient';
import { GetSpacesByUserIdInput, GetSpacesByUserIdOutput } from '../types';

export const getSpacesByUserId = async (input: GetSpacesByUserIdInput): Promise<GetSpacesByUserIdOutput> => {
  try {
    const result = await axiosClient.get(`/users/${input.userId}/spaces`);
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
